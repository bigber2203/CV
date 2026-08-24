import React, { useState } from 'react';
import { Mail, Github, Linkedin, Instagram, MessageSquare, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    need: 'Web Development',
    budget: '₹25K – ₹50K',
    description: '',
    website_source: '' // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const needsList = [
    'Web Development',
    'Digital QR Menu',
    'AI Chatbots & Automation',
    'UI/UX & Brand Design',
    'Video & Content Editing'
  ];

  const budgetList = [
    'Under ₹25K',
    '₹25K – ₹50K',
    '₹50K – ₹100K',
    'Above ₹100K'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNeedSelect = (need) => {
    setFormData((prev) => ({ ...prev, need }));
  };

  const handleBudgetSelect = (budget) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Form validation
    if (!formData.name || formData.name.trim() === '') {
      setValidationError('Please enter your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!formData.company || formData.company.trim() === '') {
      setValidationError('Please enter your company or business name.');
      return;
    }

    if (!formData.need || formData.need.trim() === '') {
      setValidationError('Please select what service you need.');
      return;
    }

    if (!formData.budget || formData.budget.trim() === '') {
      setValidationError('Please select an approximate budget.');
      return;
    }

    if (!formData.description || formData.description.trim() === '') {
      setValidationError('Tell me a little about your project.');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting project request:", formData);
      const response = await fetch('/api/project-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log("Response status:", response.status);
      const contentType = response.headers.get("content-type") || "";
      console.log("Response content type:", contentType);

      let data = null;

      if (contentType.includes("application/json")) {
        const text = await response.text();
        data = text ? JSON.parse(text) : null;
      } else {
        const text = await response.text();
        data = text ? { message: text } : null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
          data?.error ||
          `Request failed with status ${response.status}`
        );
      }

      setIsSuccess(true);
    } catch (err) {
      console.error("Submission error details:", err);
      setValidationError(err.message || 'System transmission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      need: 'Web Development',
      budget: '₹25K – ₹50K',
      description: '',
      website_source: ''
    });
    setValidationError('');
    setIsSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      
      {/* Radial lights */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-cyan/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ================= CTA SECTION ================= */}
        <div className="glass-panel p-8 md:p-16 rounded-3xl border border-white/5 text-center mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none"></div>
          
          <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase block mb-4">
            // PROJECT INITIATION CORE
          </span>
          
          <h2 className="font-display font-black text-3xl md:text-6xl text-white mb-6 leading-tight max-w-4xl mx-auto">
            HAVE AN IDEA? LET'S TURN IT INTO SOMETHING PEOPLE REMEMBER.
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-body leading-relaxed mb-8">
            Whether you need a high-converting website, interactive digital menu, AI automation, creative design, or a completely new digital product — let's build it together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                const el = document.getElementById('contact-form-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00c5dd] text-[#08090D] font-extrabold px-8 py-4 rounded-full text-base tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.45)] cursor-pointer"
              data-cursor="pointer"
              data-cursor-text="LET'S GO"
            >
              START A PROJECT ↗
            </button>
            <a
              href="mailto:placeholder@bigyatdeb.dev"
              className="flex items-center justify-center gap-2 bg-[#12151F] hover:bg-[#181C2A] text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-full text-base font-bold transition-all duration-300"
              data-cursor="pointer"
            >
              BOOK A DISCUSSION
            </a>
          </div>
        </div>

        <div id="contact-form-anchor" className="pt-8"></div>

        {/* ================= CONTACT FORM SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left info column */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase block mb-3">
              // SECURE COMMUNICATION
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6 leading-none">
              LET'S BUILD SOMETHING GREAT.
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-body leading-relaxed mb-8">
              Have a business that needs a better digital presence? Need a website, digital menu, automation, or creative solution? Tell me about your idea.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-[#12151F]/40 border border-white/5 rounded-xl flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
                <div className="flex-1">
                  <p className="text-[10px] font-mono text-gray-500">WHATSAPP</p>
                  <p className="text-xs font-bold text-white font-mono">+91 7002200651</p>
                  <a 
                    href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#25D366] hover:underline mt-1"
                  >
                    CHAT ON WHATSAPP →
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#12151F]/40 border border-white/5 rounded-xl flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-cyan" />
                <div className="flex-1">
                  <p className="text-[10px] font-mono text-gray-500">EMAIL</p>
                  <a href="mailto:debbigyat@gmail.com" className="text-xs font-bold text-white hover:text-accent-cyan transition-colors">
                    debbigyat@gmail.com
                  </a>
                  <br />
                  <a 
                    href="mailto:debbigyat@gmail.com"
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-accent-cyan hover:underline mt-1"
                  >
                    SEND AN EMAIL →
                  </a>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex gap-3">
                {[
                  { icon: <Linkedin className="w-4 h-4" />, link: '#', name: 'LinkedIn' },
                  { icon: <Github className="w-4 h-4" />, link: '#', name: 'GitHub' },
                  { icon: <Instagram className="w-4 h-4" />, link: '#', name: 'Instagram' }
                ].map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.link}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center text-white hover:text-accent-cyan transition-all"
                    data-cursor="pointer"
                    data-cursor-text={soc.name}
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form card column */}
          <div className="lg:col-span-7">
            <div className="clay-card p-6 md:p-10 rounded-3xl border border-white/10 text-left relative min-h-[500px] flex flex-col justify-center">
              
              {isSuccess ? (
                /* Success view */
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-accent-lime/10 border border-accent-lime flex items-center justify-center mx-auto text-accent-lime animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white">PROJECT REQUEST RECEIVED! 🚀</h3>
                  <p className="text-accent-lime font-mono text-[10px] tracking-widest uppercase">// REQUEST SENT SUCCESSFULLY ✓</p>
                  <div className="text-gray-400 text-sm max-w-md mx-auto font-body leading-relaxed space-y-2">
                    <p>Thanks for reaching out. I've received your details and will get back to you soon.</p>
                  </div>
                  
                  <div className="p-4 bg-[#12151F] border border-accent-lime/15 rounded-xl text-left max-w-md mx-auto font-mono text-[10px] text-gray-500 space-y-1">
                    <p className="text-accent-lime font-bold mb-1.5">// INTAKE SUMMARY RECORDED</p>
                    <p>NAME: {formData.name}</p>
                    <p>EMAIL: <a href={`mailto:${formData.email}`} className="text-accent-cyan hover:underline">{formData.email}</a></p>
                    {formData.phone && <p>PHONE: {formData.phone}</p>}
                    <p>SERVICE: {formData.need}</p>
                    <p>BUDGET: {formData.budget}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <a
                      href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#08090D] font-mono font-bold px-6 py-3.5 rounded-full text-xs tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.3)] cursor-pointer"
                      data-cursor="pointer"
                      data-cursor-text="WHATSAPP"
                    >
                      Chat on WhatsApp →
                    </a>
                    <button 
                      onClick={handleReset}
                      className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      Back to Home →
                    </button>
                  </div>
                </div>
              ) : isSubmitting ? (
                /* Submitting loading view */
                <div className="text-center py-16 space-y-4">
                  <div className="w-12 h-12 rounded-full border border-dashed border-accent-cyan animate-spin flex items-center justify-center mx-auto">
                    <div className="w-8 h-8 rounded-full border border-dashed border-accent-purple animate-ping"></div>
                  </div>
                  <p className="font-mono text-xs text-accent-cyan animate-pulse">SENDING YOUR REQUEST...</p>
                </div>
              ) : (
                /* Main intake form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name, email and phone */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">NAME *</label>
                      <input 
                        type="text" 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#08090D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors"
                        placeholder="Bigyat Deb"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">EMAIL *</label>
                      <input 
                        type="email" 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#08090D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors"
                        placeholder="debbigyat@gmail.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">PHONE (OPTIONAL)</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className="w-full bg-[#08090D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors"
                        placeholder="+91 7002200651"
                      />
                    </div>
                  </div>

                  {/* Company / Business */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">COMPANY / BUSINESS NAME *</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-[#08090D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors"
                      placeholder="Brahmaputra Brews Cafe"
                    />
                  </div>

                  {/* Project Needs grid */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">WHAT DO YOU NEED?</label>
                    <div className="flex flex-wrap gap-2">
                      {needsList.map((need) => (
                        <button
                          type="button"
                          key={need}
                          onClick={() => handleNeedSelect(need)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold font-mono border transition-all duration-200 cursor-pointer ${
                            formData.need === need
                              ? 'bg-accent-cyan/15 border-accent-cyan text-accent-cyan'
                              : 'bg-[#08090D] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {need}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">APPROXIMATE BUDGET</label>
                    <div className="flex flex-wrap gap-2">
                      {budgetList.map((budget) => (
                        <button
                          type="button"
                          key={budget}
                          onClick={() => handleBudgetSelect(budget)}
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono border transition-all duration-200 cursor-pointer ${
                            formData.budget === budget
                              ? 'bg-accent-purple/15 border-accent-purple text-accent-purple'
                              : 'bg-[#08090D] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project description */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">TELL ME ABOUT YOUR IDEA</label>
                    <textarea 
                      rows="4"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full bg-[#08090D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                      placeholder="Describe what you want to achieve, timelines, and details..."
                    />
                  </div>

                  {/* Validation Error Alert */}
                  {validationError && (
                    <div className="p-4 bg-[#EF4444]/5 border border-[#EF4444]/20 text-[#EF4444] rounded-2xl space-y-3 text-left">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider">// SYSTEM ALERT</p>
                      
                      <p className="text-xs text-gray-300 leading-relaxed font-body">
                        {validationError.toLowerCase().includes('please enter') || validationError.toLowerCase().includes('tell me') || validationError.toLowerCase().includes('select')
                          ? validationError
                          : "Something went wrong while sending your request. Please try again or contact me directly on WhatsApp."}
                      </p>

                      {/* If it's a server/connection error, show the WhatsApp button */}
                      {!(validationError.toLowerCase().includes('please enter') || validationError.toLowerCase().includes('tell me') || validationError.toLowerCase().includes('select')) && (
                        <div className="pt-1">
                          <a
                            href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20was%20trying%20to%20submit%20a%20project%20request%20through%20your%20website%20and%20would%20like%20to%20discuss%20my%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-[#08090D] font-mono font-bold text-[9px] tracking-wider px-4 py-2 rounded-full transition-all cursor-pointer"
                            data-cursor="pointer"
                          >
                            CHAT ON WHATSAPP →
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Honeypot field (Spam Protection) */}
                  <div className="hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      name="website_source" 
                      value={formData.website_source || ''}
                      onChange={handleChange} 
                      tabIndex="-1" 
                      autoComplete="off" 
                      placeholder="Leave this empty" 
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00c5dd] text-[#08090D] font-extrabold py-4 rounded-xl text-sm tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.3)] cursor-pointer"
                    data-cursor="pointer"
                    data-cursor-text="TRANSMIT"
                  >
                    SEND PROJECT REQUEST <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Privacy Disclaimer */}
                  <p className="text-[9px] font-mono text-gray-500 text-center mt-2">
                    Your information is used only to respond to your project inquiry and is not shared with third parties.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
