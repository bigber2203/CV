import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadDir = 'C:\\Users\\Rishi Dudheria\\.gemini\\antigravity-ide\\brain\\444d9e6c-5280-47f8-9e0b-80b81247bc24\\.user_uploaded';
const outputDir = 'c:\\Users\\Rishi Dudheria\\OneDrive\\Desktop\\PORTFOLIO\\public\\backgrounds';

const himalayasSrc = path.join(uploadDir, 'media_1787643234087.jpg');
const elephantSrc = path.join(uploadDir, 'media_1787643254714.jpg');

async function processImage(src, name) {
  const jpgDest = path.join(outputDir, `${name}.jpg`);
  const webpDest = path.join(outputDir, `${name}.webp`);
  const mobileWebpDest = path.join(outputDir, `${name}-mobile.webp`);

  // 1. Copy raw JPG
  fs.copyFileSync(src, jpgDest);
  console.log(`Copied raw JPG to ${jpgDest}`);

  // 2. Convert to WebP (full resolution)
  await sharp(src)
    .webp({ quality: 85 })
    .toFile(webpDest);
  console.log(`Converted to WebP: ${webpDest}`);

  // 3. Convert to Mobile WebP (reduced size: width 768px, optimized compression)
  await sharp(src)
    .resize({ width: 768 })
    .webp({ quality: 75 })
    .toFile(mobileWebpDest);
  console.log(`Converted to Mobile WebP: ${mobileWebpDest}`);
}

async function run() {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    await processImage(himalayasSrc, 'section-himalayas');
    await processImage(elephantSrc, 'section-elephant-procession');
    console.log('Successfully processed all background images!');
  } catch (err) {
    console.error('Error during image processing:', err);
  }
}

run();
