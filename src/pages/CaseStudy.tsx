import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/portfolio';
import TransitionLayout from '../components/TransitionLayout';
import { MagneticButton } from '../components/ui/MagneticButton';
import SmoothScroll from '../components/SmoothScroll';
import Footer from '../components/Footer';

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <TransitionLayout>
      <SmoothScroll />
      <main className="w-full min-h-screen bg-[#F4EFE8] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#F4EFE8]">
        
        {/* Navbar Simplificada para o Case */}
        <nav className="fixed top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between mix-blend-difference text-[#F4EFE8]">
          <Link to="/" className="text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
            Victor Cardoso
          </Link>
          <MagneticButton>
            <Link to="/" className="text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F4EFE8] inline-block" /> Voltar
            </Link>
          </MagneticButton>
        </nav>

        {/* Hero do Case */}
        <header className="w-full h-screen relative flex items-end pb-24 px-6 md:px-24">
          <div className="absolute inset-0 w-full h-full">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-[#F4EFE8] max-w-4xl">
            <span className="text-xs font-bold tracking-[0.25em] uppercase opacity-70 mb-4 block">
              {project.category} — {project.year}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-medium tracking-tighter uppercase leading-[0.9]">
              {project.title}
            </h1>
          </div>
        </header>

        {/* Detalhamento Técnico (White Space Massivo) */}
        <article className="w-full max-w-5xl mx-auto px-6 py-32 md:py-48 flex flex-col gap-32">
          
          <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
             <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a1a]/50">O Desafio</h2>
             <p className="text-2xl md:text-4xl font-serif leading-snug">
               {project.problem}
             </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
             <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a1a]/50">Arquitetura & Engenharia</h2>
             <div className="flex flex-col gap-8">
               <p className="text-lg md:text-xl font-sans leading-relaxed text-[#1a1a1a]/80">
                 {project.architecture}
               </p>
               <div className="flex flex-wrap gap-3 mt-4">
                 {project.techStack.map(tech => (
                   <span key={tech} className="px-4 py-2 border border-[#1a1a1a]/20 rounded-full text-xs font-bold uppercase tracking-widest">
                     {tech}
                   </span>
                 ))}
               </div>
             </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
             <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a1a]/50">Papel & Execução</h2>
             <p className="text-lg md:text-xl font-sans leading-relaxed text-[#1a1a1a]/80">
               {project.role}
             </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24 border-t border-[#1a1a1a]/10 pt-32">
             <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a1a]/50">Resultado & Impacto</h2>
             <p className="text-2xl md:text-4xl font-serif leading-snug">
               {project.outcome}
             </p>
          </section>
          
          {(project.liveUrl || project.repoUrl) && (
            <section className="flex gap-6 mt-12 justify-center">
              {project.liveUrl && project.liveUrl !== '#' && (
                <MagneticButton>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#1a1a1a] text-[#F4EFE8] rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#1a1a1a]/80 transition-colors">
                    Ver Projeto Ao Vivo
                  </a>
                </MagneticButton>
              )}
              {project.repoUrl && (
                <MagneticButton>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#1a1a1a]/5 transition-colors">
                    Repositório GitHub
                  </a>
                </MagneticButton>
              )}
            </section>
          )}
        </article>

        <Footer />
      </main>
    </TransitionLayout>
  );
}
