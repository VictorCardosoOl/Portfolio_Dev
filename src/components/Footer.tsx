import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream text-charcoal w-full relative font-sans overflow-hidden border-t border-charcoal/10">
      
      {/* 
        ====================================================
        DESKTOP LAYOUT
        ====================================================
      */}
      <div className="hidden lg:block w-full h-[38vw] relative">
        
        {/* Top Content Row */}
        <div className="absolute top-[15%] left-[5%] right-[5%] flex justify-between z-10">
          
          {/* Left: Newsletter */}
          <div className="w-[40%]">
            <h2 className="font-serif text-[2.5vw] leading-none mb-[1.5vw] text-charcoal tracking-normal">Sunshine In Your Inbox</h2>
            <p className="text-[0.9vw] font-medium text-charcoal mb-[3vw]">Get 25% off your Starter Kit when you sign up</p>
            
            <form className="relative w-[70%] border-b border-charcoal pb-[0.5vw] mb-[1.5vw] flex items-center">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent outline-none text-[0.9vw] text-charcoal placeholder:text-charcoal font-medium"
                required
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.8vw] h-[1.8vw] rounded-full border border-charcoal flex items-center justify-center transition-colors hover:bg-charcoal hover:text-cream"
                aria-label="Subscribe"
              >
                 <ArrowRight className="w-[1vw] h-[1vw]" strokeWidth={1.5} />
              </button>
            </form>
            
            <p className="text-[0.7vw] text-charcoal leading-[1.4] max-w-[70%]">
              You can unsubscribe by using the unsubscribe link.<br/>
              Victor's <a href="#" className="underline hover:opacity-70">Privacy Policy</a> applies and sets out your rights.
            </p>
          </div>

          {/* Right: 2 Columns */}
          <div className="w-[30%] flex justify-end gap-[6vw]">
            <div className="flex flex-col gap-[0.8vw]">
              <h4 className="text-[0.9vw] font-semibold text-charcoal mb-[0.5vw]">Navegação</h4>
              <a href="#" className="text-[0.8vw] text-charcoal hover:opacity-70">Home</a>
              <a href="#portfolio" className="text-[0.8vw] text-charcoal hover:opacity-70">Projetos</a>
              <a href="#mission" className="text-[0.8vw] text-charcoal hover:opacity-70">Sobre</a>
              <a href="#services" className="text-[0.8vw] text-charcoal hover:opacity-70">Serviços</a>
            </div>
            <div className="flex flex-col gap-[0.8vw]">
              <h4 className="text-[0.9vw] font-semibold text-charcoal mb-[0.5vw]">Contato</h4>
              <a href="#" className="text-[0.8vw] text-charcoal hover:opacity-70">LinkedIn</a>
              <a href="#" className="text-[0.8vw] text-charcoal hover:opacity-70">GitHub</a>
              <a href="#" className="text-[0.8vw] text-charcoal hover:opacity-70">Instagram</a>
              <a href="mailto:hello@victorcardoso.com" className="text-[0.8vw] text-charcoal hover:opacity-70">Email</a>
            </div>
          </div>
        </div>

        {/* Huge Logo Text - Adjusted so it doesn't get cut off */}
        <div className="absolute right-[5%] bottom-[8%] z-0 pointer-events-none select-none flex justify-end">
          <h1 className="font-serif text-[24vw] text-charcoal m-0 p-0 leading-[0.8] tracking-tight lowercase">
            <span className="blur-[12px] opacity-60">c</span>
            <span className="blur-[4px] opacity-80">r</span>
            <span>a</span>
            <span className="blur-[8px] opacity-70">f</span>
            <span className="blur-[2px] opacity-90">t</span>
          </h1>
        </div>

        {/* Bottom Copyright Row */}
        <div className="absolute bottom-[6%] left-[5%] flex gap-[2.5vw] text-[0.7vw] text-charcoal z-10 w-[40%]">
          <span>&copy; 2026 Victor Cardoso</span>
          <a href="#" className="hover:opacity-70">Privacy Policy</a>
          <span className="ml-auto">Design & Engenharia</span>
        </div>
      </div>

      {/* 
        ====================================================
        MOBILE LAYOUT
        ====================================================
      */}
      <div className="block lg:hidden w-full px-6 pt-16 pb-8">
        <div className="flex flex-col gap-16 relative z-10">
          
          <div className="w-full">
            <h2 className="font-serif text-3xl leading-none mb-4 text-charcoal">Sunshine In Your Inbox</h2>
            <p className="text-sm font-medium text-charcoal mb-8">Get 25% off your Starter Kit when you sign up</p>
            
            <form className="relative w-full border-b border-charcoal pb-2 mb-4 flex items-center">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent outline-none text-sm text-charcoal placeholder:text-charcoal font-medium"
                required
              />
              <button 
                type="submit"
                className="absolute right-0 w-8 h-8 rounded-full border border-charcoal flex items-center justify-center transition-colors hover:bg-charcoal hover:text-cream"
              >
                 <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </form>
            
            <p className="text-[10px] text-charcoal leading-relaxed max-w-xs">
              You can unsubscribe by using the unsubscribe link.<br/>
              Victor's <a href="#" className="underline">Privacy Policy</a> applies and sets out your rights.
            </p>
          </div>

          <div className="w-full grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-charcoal mb-2">Navegação</h4>
              <a href="#" className="text-sm text-charcoal">Home</a>
              <a href="#portfolio" className="text-sm text-charcoal">Projetos</a>
              <a href="#mission" className="text-sm text-charcoal">Sobre</a>
              <a href="#services" className="text-sm text-charcoal">Serviços</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-charcoal mb-2">Contato</h4>
              <a href="#" className="text-sm text-charcoal">LinkedIn</a>
              <a href="#" className="text-sm text-charcoal">GitHub</a>
              <a href="#" className="text-sm text-charcoal">Instagram</a>
              <a href="mailto:hello@victorcardoso.com" className="text-sm text-charcoal">Email</a>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end mt-20 mb-8 relative z-0 pointer-events-none select-none">
          <h1 className="font-serif text-[45vw] text-charcoal m-0 p-0 leading-[0.8] tracking-tight lowercase">
            <span className="blur-[12px] opacity-60">c</span>
            <span className="blur-[4px] opacity-80">r</span>
            <span>a</span>
            <span className="blur-[8px] opacity-70">f</span>
            <span className="blur-[2px] opacity-90">t</span>
          </h1>
        </div>

        <div className="w-full flex flex-col gap-3 text-xs text-charcoal relative z-10">
          <span>&copy; 2026 Victor Cardoso</span>
          <a href="#">Privacy Policy</a>
          <span>Design & Engenharia</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
