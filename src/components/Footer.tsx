import React from 'react';
import { ArrowRight, Instagram, Linkedin, Github } from 'lucide-react';
import { PROFILE_DATA as DATA } from '../config/profile';

const Footer = () => {
  return (
    <footer id="contact" className="relative w-full bg-stone-950 text-stone-300 overflow-hidden font-sans border-t border-stone-800">
      
      {/* 1. Fundo e Textura (Noise SVG) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 3. Layout (Grid) */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-12 pt-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-stone-800">
          
          {/* Col 1: Identidade */}
          <div className="flex flex-col lg:pr-12">
            <h2 className="font-serif text-4xl lg:text-5xl text-stone-100 mb-2">{DATA.name}</h2>
            <p className="font-serif italic text-stone-500 text-lg">Design & Engenharia</p>
          </div>

          {/* Col 2: Local/CTA */}
          <div className="flex flex-col lg:px-12">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 font-bold mb-6">Iniciar Projeto</span>
            <p className="text-sm md:text-base font-light text-stone-400 mb-8 leading-relaxed max-w-sm">
              Atualmente disponível para novos projetos de design e engenharia criativa. Diga olá.
            </p>
            <a 
              href={`mailto:${DATA.contact.email}`} 
              className="group inline-flex items-center gap-3 text-stone-100 font-medium w-fit border-b border-stone-700 pb-2 hover:border-stone-300 transition-colors"
            >
              Vamos conversar
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Col 3: Social */}
          <div className="flex flex-col lg:px-12">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 font-bold mb-6">Social</span>
            <div className="flex flex-col gap-4">
              <a href={DATA.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light">LinkedIn</span>
              </a>
              <a href={DATA.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                <Github size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light">GitHub</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-light">Instagram</span>
              </a>
            </div>
          </div>

          {/* Col 4: Menu/Créditos */}
          <div className="flex flex-col lg:pl-12">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 font-bold mb-6">Navegação</span>
            <nav className="flex flex-col gap-4 mb-auto">
              <a href="#" className="text-sm font-light text-stone-400 hover:text-white hover:translate-x-2 transition-all w-fit">Home</a>
              <a href="#portfolio" className="text-sm font-light text-stone-400 hover:text-white hover:translate-x-2 transition-all w-fit">Projetos</a>
              <a href="#mission" className="text-sm font-light text-stone-400 hover:text-white hover:translate-x-2 transition-all w-fit">Sobre</a>
              <a href="#services" className="text-sm font-light text-stone-400 hover:text-white hover:translate-x-2 transition-all w-fit">Serviços</a>
            </nav>

            <div className="mt-12 text-xs text-stone-600 font-light flex flex-col gap-1">
              <span>&copy; {new Date().getFullYear()} {DATA.name}.</span>
              <span>Todos os direitos reservados.</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Tipografia de Fundo */}
      <div className="absolute bottom-[-6%] left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
        <h1 className="font-serif text-[18vw] text-stone-900 opacity-80 m-0 p-0 leading-none tracking-tighter uppercase whitespace-nowrap">
          {DATA.name.split(' ')[0]}
        </h1>
      </div>

    </footer>
  );
};

export default Footer;
