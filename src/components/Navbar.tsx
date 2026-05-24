import React, { useState, useEffect } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { MagneticButton } from './ui/MagneticButton';
import { Linkedin, MessageCircle, Folder, User, Mail, Home } from 'lucide-react';

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
  const isHiddenDesktop = !isPastHero || scrollDirection === 'down';
  
  // Floating pill background for mobile (liquid glass), transparent for desktop
  const backgroundClass = 'bg-white/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40 md:bg-transparent md:backdrop-blur-none md:shadow-none md:border-transparent';

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ease-in-out ${backgroundClass}
        bottom-6 left-4 right-4 rounded-full md:bottom-auto md:top-0 md:left-0 md:right-0 md:rounded-none md:w-full
        pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] md:pb-0 md:pt-0
        ${isHiddenDesktop ? 'md:-translate-y-full md:opacity-0 md:outline-none' : 'md:translate-y-0 md:opacity-100'}
        translate-y-0 opacity-100
      `}
    >
      <div className="max-w-[1920px] mx-auto px-6 py-2 md:py-1 lg:px-12 3xl:px-24 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-75">
          <a href="/" className="flex items-center">
            <span className="font-serif font-light text-2xl tracking-tighter text-charcoal">
              <span className="md:hidden">V.</span>
              <span className="hidden md:inline">{logoText}</span>
            </span>
          </a>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <div key={item.label} className="group relative">
              <a href={item.links[0]?.href ?? '#'} className="text-fluid-label font-bold uppercase tracking-widest text-[#1a1a1a] hover:text-black transition-colors py-2">
                {item.label}
              </a>
            </div>
          ))}
        </nav>

        {/* MOBILE ICONS / DESKTOP RIGHT ACTIONS */}
        <div className="flex items-center gap-6 md:gap-4">
          
          {/* Ícones de Navegação Mobile */}
          <div className="flex md:hidden items-center gap-6 text-charcoal/70">
            <a href="#portfolio" aria-label="Portfólio" className="hover:text-charcoal transition-colors p-1" onClick={() => { if ("vibrate" in navigator) navigator.vibrate(20); }}>
              <Folder size={22} strokeWidth={1.5} />
            </a>
            <a href="#aboutme" aria-label="Sobre Mim" className="hover:text-charcoal transition-colors p-1" onClick={() => { if ("vibrate" in navigator) navigator.vibrate(20); }}>
              <User size={22} strokeWidth={1.5} />
            </a>
            <a href="#contact" aria-label="Contato" className="hover:text-charcoal transition-colors p-1" onClick={() => { if ("vibrate" in navigator) navigator.vibrate(20); }}>
              <Mail size={22} strokeWidth={1.5} />
            </a>
          </div>

          {/* Ícones Sociais Desktop */}
          <div className="hidden md:flex items-center gap-3 mr-2">
             <a href="#" aria-label="LinkedIn" className="text-charcoal/70 hover:text-charcoal transition-colors p-1">
                <Linkedin size={20} strokeWidth={1.5} />
             </a>
             <a href="#" aria-label="WhatsApp" className="text-charcoal/70 hover:text-charcoal transition-colors p-1">
                <MessageCircle size={20} strokeWidth={1.5} />
             </a>
          </div>

          <MagneticButton className="hidden md:inline-block">
            <a href="#contact" className="inline-flex items-center justify-center text-xs md:text-sm font-semibold bg-charcoal text-cream px-5 py-2 md:py-2.5 rounded-full hover:bg-black transition-colors">
              Fale Conosco
            </a>
          </MagneticButton>
          
        </div>
      </div>
    </header>
  );
}
