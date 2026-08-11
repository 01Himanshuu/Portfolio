'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CONTACT_METHODS = [
  {
    id: 'email',
    label: 'EMAIL',
    value: 'jangrahimanshu0101@gmail.com', // Updating to the likely real email based on github
    href: 'mailto:jangrahimanshu0101@gmail.com',
    copyable: true
  },
  {
    id: 'github',
    label: 'GITHUB',
    value: 'github.com/01himanshuu',
    href: 'https://github.com/01himanshuu',
    copyable: true
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    value: 'linkedin.com/in/01himanshu', // Assuming standard handle
    href: 'https://linkedin.com/in/01himanshu',
    copyable: true
  },
  {
    id: 'instagram',
    label: 'INSTAGRAM',
    value: 'instagram.com/01himanshu',
    href: 'https://instagram.com/01himanshu',
    copyable: false
  }
];

export default function ContactSection() {
  const containerRef = useRef(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (e, method) => {
    if (!method.copyable) return;
    e.preventDefault(); // prevent navigation on copy click if it's the copy button specifically
    
    navigator.clipboard.writeText(method.value).then(() => {
      setCopiedId(method.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section id="contact" ref={containerRef} className="w-full relative z-10 py-32 md:py-64 max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 bg-[#030406] flex flex-col items-center justify-center min-h-screen text-center">
      
      <div className="contact-reveal font-mono text-xs tracking-[0.4em] uppercase text-neutral-500 mb-12">
        THE FINALE
      </div>

      <h2 className="contact-reveal text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.9] text-white mb-8">
        LET'S BUILD<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">SOMETHING</span><br/>
        <span className="text-[#00F0FF]">WORTH SHIPPING.</span>
      </h2>

      <div className="contact-reveal mt-16 mb-24 flex flex-wrap justify-center gap-4 md:gap-8">
        {CONTACT_METHODS.map((method) => (
          <div key={method.id} className="relative group flex flex-col items-center">
            <a 
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 hover:text-white uppercase transition-colors px-4 py-2 border border-transparent hover:border-white/10 rounded"
            >
              {method.label}
            </a>
            
            {method.copyable && (
              <button 
                onClick={(e) => handleCopy(e, method)}
                className="absolute -bottom-8 opacity-0 group-hover:opacity-100 font-mono text-[10px] tracking-widest text-neutral-500 hover:text-[#00F0FF] transition-all transform translate-y-2 group-hover:translate-y-0"
              >
                {copiedId === method.id ? 'COPIED ✓' : '[ COPY ]'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="contact-reveal">
        <a 
          href="mailto:jangrahimanshu0101@gmail.com"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm tracking-[0.2em] text-[#030406] uppercase bg-white hover:bg-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
        >
          <span>START A CONVERSATION</span>
          <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
        </a>
      </div>

    </section>
  );
}
