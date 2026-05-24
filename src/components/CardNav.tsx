import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './CardNav.css';

interface NavLink {
  label: string;
  ariaLabel: string;
  href?: string;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logoText?: string;
  items: NavItem[];
  className?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ctaText?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logoText = 'Victor Cardoso',
  items,
  className = '',
  baseColor = '#fff',
  menuColor = '#000',
  buttonBgColor = '#111',
  buttonTextColor = '#fff',
  ctaText = 'Iniciar Projeto'
}) => {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const isHidden = scrollDirection === 'down' && !isAtTop && !isExpanded;

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { height: 60, overflow: 'hidden' });
      gsap.set(cardsRef.current, { y: 30, opacity: 0 });

      timelineRef.current = gsap.timeline({ paused: true })
        .to(navRef.current, {
          height: "auto",
          duration: 0.5,
          ease: "power3.inOut"
        })
        .to(cardsRef.current, { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          ease: "power3.out", 
          stagger: 0.05 
        }, "-=0.2");
    }, navRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = useCallback(() => {
    if (!timelineRef.current) return;
    
    if (isExpanded) {
      setIsExpanded(false);
      timelineRef.current.reverse();
    } else {
      setIsExpanded(true);
      timelineRef.current.play();
    }
  }, [isExpanded]);

  const handleCtaClick = useCallback(() => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
    if (isExpanded) toggleMenu();
  }, [isExpanded, toggleMenu]);

  const handleLinkClick = useCallback((href?: string) => {
    if (href?.startsWith('#')) {
      toggleMenu();
    }
  }, [toggleMenu]);

  // Handle ESC key to close menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        toggleMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, toggleMenu]);

  return (
    <div className={`card-nav-container ${className} ${isHidden ? 'hidden' : ''}`}>
      <nav 
        ref={navRef} 
        className={`card-nav overflow-hidden ${isExpanded ? 'open' : ''}`} 
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top">
          <button
            type="button"
            className={`hamburger-menu ${isExpanded ? 'open' : ''} focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 focus-visible:ring-offset-cream outline-none rounded-sm`}
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isExpanded}
            style={{ color: menuColor }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </button>

          <div className="logo-container">
            <span className="logo-text" style={{ color: menuColor }}>{logoText}</span>
          </div>

          <button
            type="button"
            className="card-nav-cta-button focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 focus-visible:ring-offset-cream outline-none"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            onClick={handleCtaClick}
          >
            {ctaText}
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={(el) => { cardsRef.current[idx] = el; }}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links.map((link, i) => (
                  <a 
                    key={`${link.label}-${i}`} 
                    className="nav-card-link focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal outline-none rounded-sm" 
                    href={link.href || '#'} 
                    aria-label={link.ariaLabel}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
