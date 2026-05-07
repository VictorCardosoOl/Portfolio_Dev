import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { PROFILE_DATA as DATA } from '../config/profile';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="bg-cream text-charcoal py-16 md:py-24 flex flex-col justify-center"
    >
      <div className="container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Título */}
          <div className="lg:col-span-5 flex flex-col contact-reveal">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/40 mb-4 block">
              06 / Contato
            </span>
            <h2 className="text-fluid-h2 font-serif font-light leading-none tracking-tighter uppercase text-charcoal mb-6">
              Vamos<br />
              <span className="italic text-charcoal/30">conversar</span>
            </h2>
            <p className="text-sm md:text-base font-light text-charcoal/60 leading-relaxed max-w-xs">
              {DATA.bio.split('.')[0]}.
            </p>
          </div>

          {/* Informações de contato */}
          <div className="lg:col-span-7 flex flex-col gap-10">

            {/* Links diretos */}
            <div className="contact-reveal flex flex-col gap-4">
              <a
                href={`mailto:${DATA.contact.email}`}
                className="group flex items-center gap-4 py-5 border-b border-charcoal/10 hover:border-charcoal/40 transition-colors duration-300"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-charcoal/20 group-hover:bg-charcoal group-hover:text-cream group-hover:border-charcoal transition-all duration-300 shrink-0">
                  <Mail size={14} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-0.5">E-mail</span>
                  <span className="text-sm md:text-base text-charcoal group-hover:opacity-70 transition-opacity">
                    {DATA.contact.email}
                  </span>
                </div>
                <span className="ml-auto text-charcoal/30 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>

              <a
                href={`tel:${DATA.contact.phone.replace(/\s+/g, '')}`}
                className="group flex items-center gap-4 py-5 border-b border-charcoal/10 hover:border-charcoal/40 transition-colors duration-300"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-charcoal/20 group-hover:bg-charcoal group-hover:text-cream group-hover:border-charcoal transition-all duration-300 shrink-0">
                  <Phone size={14} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-0.5">Telefone</span>
                  <span className="text-sm md:text-base text-charcoal group-hover:opacity-70 transition-opacity">
                    {DATA.contact.phone}
                  </span>
                </div>
                <span className="ml-auto text-charcoal/30 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>

              <div className="flex items-center gap-4 py-5 border-b border-charcoal/10">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-charcoal/20 shrink-0">
                  <MapPin size={14} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-charcoal/40 mb-0.5">Localização</span>
                  <span className="text-sm md:text-base text-charcoal">{DATA.location}</span>
                </div>
              </div>
            </div>

            {/* Redes sociais */}
            <div className="contact-reveal flex items-center gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-cream hover:border-charcoal transition-all duration-300"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-cream hover:border-charcoal transition-all duration-300"
              >
                <Github size={16} />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
