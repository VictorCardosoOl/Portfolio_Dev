import React, { useState, useEffect } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { MagneticButton } from './ui/MagneticButton';
import { Linkedin, MessageCircle } from 'lucide-react';

interface NavLink {
  label: string;
  ariaLabel: string;
  href: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface NavbarProps {
  items: readonly NavItem[];
  logoText: string;
}

export default function Navbar({ items, logoText }: NavbarProps) {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPastHero = scrollY > (windowHeight * 0.95);
  const isHidden = !isPastHero || scrollDirection === 'down';
  // Reduzido o padding vertical de py-4 para py-2
  const backgroundClass = 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-2';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${backgroundClass} ${
        isHidden ? '-translate-y-full opacity-0 outline-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 3xl:px-24 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-75">
          <a href="/" className="flex items-center">
            <span className="font-serif font-light text-2xl tracking-tighter text-charcoal">
              {logoText}
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <div key={item.label} className="group relative">
              <a href={item.links[0]?.href ?? '#'} className="text-fluid-label font-bold uppercase tracking-widest text-charcoal/70 hover:text-charcoal transition-colors py-2">
                {item.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Ícones Sociais */}
          <div className="hidden sm:flex items-center gap-3 mr-2">
             <a href="#" aria-label="LinkedIn" className="text-charcoal/70 hover:text-charcoal transition-colors p-1">
                <Linkedin size={20} strokeWidth={1.5} />
             </a>
             <a href="#" aria-label="WhatsApp" className="text-charcoal/70 hover:text-charcoal transition-colors p-1">
                <MessageCircle size={20} strokeWidth={1.5} />
             </a>
          </div>

          <MagneticButton className="hidden sm:inline-block">
            <a href="#contact" className="inline-flex items-center justify-center text-xs md:text-sm font-semibold bg-charcoal text-cream px-5 py-2 md:py-2.5 rounded-full hover:bg-black transition-colors">
              Fale Conosco
            </a>
          </MagneticButton>
          
          <button 
            type="button" 
            aria-label="Toggle menu" 
            className="md:hidden p-2 text-charcoal focus:outline-none transition-colors hover:text-black"
          >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
             </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
