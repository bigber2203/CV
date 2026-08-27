/**
 * ScrollVideoBackground — Stage 2 (revised for safe integration)
 *
 * Key safety fixes vs original:
 *  - Canvas background is transparent (not black) so it never causes a blank screen
 *  - Canvas fades in from opacity 0 only AFTER frame 1 successfully loads
 *  - DPR fix: drawCover uses CSS pixel dimensions, not physical pixel canvas.width
 *  - z-index: 1 so it sits just above BackgroundGrid (-z-50) but below main (z-10)
 *  - Lenis scroll subscription with native fallback
 *  - All listeners and rAFs cleaned up on unmount
 */

import React, { useEffect, useRef, useCallback } from 'react';

// ─── Config ─────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 105;
const FRAME_PATH = (n) =>
  `/scroll-video/frame_${String(n).padStart(3, '0')}.webp`;

// ─── Helper: draw one frame with CSS-pixel dimensions (object-fit: cover) ───
// IMPORTANT: ctx is scaled by DPR so all drawing coords must be CSS pixels.
// We pass cssW/cssH explicitly rather than reading canvas.width (physical).
function drawCover(ctx, img, cssW, cssH) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const scale = Math.max(cssW / iw, cssH / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cssW - sw) / 2;
  const sy = (cssH - sh) / 2;

  ctx.clearRect(0, 0, cssW, cssH);
  ctx.drawImage(img, sx, sy, sw, sh);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ScrollVideoBackground() {
  const canvasRef      = useRef(null);
  const framesRef      = useRef(new Array(TOTAL_FRAMES).fill(null));
  const loadedCountRef = useRef(0);

  // CSS pixel dimensions stored in refs — needed for drawCover
  const cssDimsRef = useRef({ w: window.innerWidth, h: window.innerHeight });

  // Scroll / rAF state — kept in refs, never triggers React renders
  const drawnIndexRef  = useRef(-1);
  const targetIndexRef = useRef(0);
  const rafIdRef       = useRef(null);

  // ── Size the canvas correctly for the current DPR ─────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr  = window.devicePixelRatio || 1;
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;

    cssDimsRef.current = { w: cssW, h: cssH };

    // Setting .width/.height resets the context transform — must re-scale after
    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr); // now all drawing coords are CSS pixels

    // Redraw current frame with new dimensions
    drawnIndexRef.current = -1;
    const img = findBestFrame(targetIndexRef.current);
    if (img) {
      drawCover(ctx, img, cssW, cssH);
      drawnIndexRef.current = targetIndexRef.current;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Nearest-loaded frame search ────────────────────────────────────────────
  // Defined before resizeCanvas uses it indirectly via closure — hoisted fine
  function findBestFrame(index) {
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    if (framesRef.current[clamped]) return framesRef.current[clamped];
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      const lo = clamped - d;
      const hi = clamped + d;
      if (lo >= 0 && framesRef.current[lo]) return framesRef.current[lo];
      if (hi < TOTAL_FRAMES && framesRef.current[hi]) return framesRef.current[hi];
    }
    return null;
  }

  // ── rAF paint tick ────────────────────────────────────────────────────────
  const renderTick = useCallback(() => {
    rafIdRef.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const desired = targetIndexRef.current;
    if (desired === drawnIndexRef.current) return; // nothing changed

    const img = findBestFrame(desired);
    if (!img) return;

    const { w, h } = cssDimsRef.current;
    const ctx = canvas.getContext('2d');
    drawCover(ctx, img, w, h);
    drawnIndexRef.current = desired;
  }, []);

  // ── Schedule exactly one rAF (idempotent) ─────────────────────────────────
  const scheduleRender = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(renderTick);
  }, [renderTick]);

  // ── Map Lenis scroll value → frame index ──────────────────────────────────
  const updateFrameFromScroll = useCallback((scrollY) => {
    const docH    = document.documentElement.scrollHeight;
    const winH    = window.innerHeight;
    const maxScroll = Math.max(1, docH - winH);
    const progress  = Math.min(1, Math.max(0, scrollY / maxScroll));
    const index     = Math.round(progress * (TOTAL_FRAMES - 1));

    if (index !== targetIndexRef.current) {
      targetIndexRef.current = index;
      scheduleRender();
    }
  }, [scheduleRender]);

  // ── Progressive frame loading ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size the canvas on first mount
    const dpr  = window.devicePixelRatio || 1;
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;
    cssDimsRef.current = { w: cssW, h: cssH };
    canvas.width  = cssW * dpr;
    canvas.height = cssH * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    let isMounted = true;

    const loadFrame = (frameNum) =>
      new Promise((resolve) => {
        const img = new Image();
        const src = FRAME_PATH(frameNum);

        img.onload = () => {
          if (!isMounted) return;
          const idx = frameNum - 1;
          framesRef.current[idx] = img;
          loadedCountRef.current += 1;

          // Reveal canvas + paint as soon as first frame arrives
          if (loadedCountRef.current === 1) {
            canvas.style.opacity = '1';
            drawnIndexRef.current = -1;
            scheduleRender();
          }

          // Repaint if this is the frame we currently need
          if (idx === targetIndexRef.current) {
            drawnIndexRef.current = -1;
            scheduleRender();
          }

          resolve(img);
        };

        img.onerror = () => {
          console.warn(`[ScrollVideoBackground] frame failed: ${src}`);
          resolve(null);
        };

        img.src = src;
      });

    const loadAll = async () => {
      const BATCH = 10;
      for (let start = 1; start <= TOTAL_FRAMES; start += BATCH) {
        if (!isMounted) break;
        const batch = [];
        for (let n = start; n <= Math.min(start + BATCH - 1, TOTAL_FRAMES); n++) {
          batch.push(loadFrame(n));
        }
        await Promise.all(batch);
      }
      if (isMounted) {
        console.info(`[ScrollVideoBackground] ${loadedCountRef.current}/${TOTAL_FRAMES} frames ready.`);
      }
    };

    loadAll();
    return () => { isMounted = false; };
  }, [scheduleRender]);

  // ── Lenis + native scroll listener ────────────────────────────────────────
  useEffect(() => {
    const onLenisScroll = ({ scroll }) => updateFrameFromScroll(scroll);
    const onNativeScroll = () => {
      if (window.lenis) return; // Lenis is handling it
      updateFrameFromScroll(window.scrollY);
    };

    let pollTimer = null;
    const attachLenis = () => {
      if (window.lenis) {
        window.lenis.on('scroll', onLenisScroll);
        updateFrameFromScroll(window.lenis.scroll ?? 0);
        return true;
      }
      return false;
    };

    if (!attachLenis()) {
      let attempts = 0;
      pollTimer = setInterval(() => {
        attempts++;
        if (attachLenis() || attempts >= 20) {
          clearInterval(pollTimer);
          pollTimer = null;
        }
      }, 100);
    }

    window.addEventListener('scroll', onNativeScroll, { passive: true });

    return () => {
      if (window.lenis) {
        try { window.lenis.off('scroll', onLenisScroll); } catch (e) { void e; }
      }
      clearInterval(pollTimer);
      window.removeEventListener('scroll', onNativeScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [updateFrameFromScroll]);

  // ── Resize listener ────────────────────────────────────────────────────────
  useEffect(() => {
    let timer = null;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(resizeCanvas, 80);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [resizeCanvas]);

  // ── Canvas element ─────────────────────────────────────────────────────────
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        // Start invisible — fades in only after frame 1 loads (set in JS above)
        // This prevents the canvas from ever showing as a solid black rectangle
        opacity: 0,
        transition: 'opacity 0.6s ease',
        zIndex: 1,             // above BackgroundGrid (-z-50) but below main (z-10)
        pointerEvents: 'none', // never blocks clicks, forms, nav, anything
        display: 'block',
        backgroundColor: 'transparent',
      }}
    />
  );
}
