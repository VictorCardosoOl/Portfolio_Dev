import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import SmoothScroll from '../components/SmoothScroll';
import { ErrorBoundary } from '../components/ErrorBoundary';
import TransitionLayout from '../components/TransitionLayout';
import Footer from '../components/sections/Footer';
import { Preloader } from '../components/ui/Preloader';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (!showPreloader) {
      ScrollTrigger.refresh();
    }
  }, [showPreloader]);

  return (
    <TransitionLayout>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <main className="w-full min-h-screen bg-[#FFFFFF] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#FFFFFF] overflow-x-hidden">
        <SmoothScroll isLocked={showPreloader} />

        <div className="w-full">
          <ErrorBoundary>
            {/* HERO SERVICES */}
            <section className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-24 pt-32 pb-20">
              <div className="max-w-5xl">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#1a1a1a]/40 block mb-6">
                  Soluções B2B
                </span>
                <h1 className="text-5xl md:text-8xl font-serif font-light tracking-tighter leading-[1.1] mb-8">
                  Sites de alta performance não são custos. São <span className="italic font-serif">ativos de conversão.</span>
                </h1>
                <p className="text-base md:text-xl font-light text-[#1a1a1a]/60 max-w-2xl leading-relaxed mb-12">
                  No mercado digital atual, a lentidão e interfaces genéricas custam clientes todos os dias. Desenvolvemos ecossistemas web rápidos, acessíveis (WCAG) e otimizados para SEO que posicionam sua empresa à frente da concorrência.
                </p>
                <MagneticButton>
                  <a href="#contato" className="inline-flex items-center gap-4 bg-[#1a1a1a] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                    Inicie seu projeto
                  </a>
                </MagneticButton>
              </div>
            </section>

            {/* VALUE PROPOSITION */}
            <section className="py-24 bg-[#1a1a1a]/5 px-6 md:px-24">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                <div>
                  <h3 className="text-2xl font-serif mb-4">SEO Técnico</h3>
                  <p className="text-sm font-light text-[#1a1a1a]/60 leading-relaxed">
                    Mais de 60% do tráfego web vem de buscas orgânicas. Nossos sistemas são construídos com marcação semântica e SSR (Server Side Rendering) para máxima indexação pelo Google.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-4">UX Baseada em Dados</h3>
                  <p className="text-sm font-light text-[#1a1a1a]/60 leading-relaxed">
                    Remoção de fricções na jornada do usuário. Estruturamos layouts pensados em conversão, retenção e clareza de informação, aumentando as taxas de lead generation.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-4">Performance Extrema</h3>
                  <p className="text-sm font-light text-[#1a1a1a]/60 leading-relaxed">
                    Tempos de carregamento abaixo de 2 segundos. Otimizamos assets, utilizamos CDNs e modern web APIs para garantir que seu cliente não vá para o concorrente por impaciência.
                  </p>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <div id="contato">
              <Footer />
            </div>
            
            {/* BACK TO HOME */}
            <div className="fixed bottom-8 right-8 z-50">
               <Link to="/" className="w-12 h-12 bg-white rounded-full border border-black/10 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M19 12H5M12 19l-7-7 7-7" />
                 </svg>
               </Link>
            </div>
          </ErrorBoundary>
        </div>
      </main>
    </TransitionLayout>
  );
}
