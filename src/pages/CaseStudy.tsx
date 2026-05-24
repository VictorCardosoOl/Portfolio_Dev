import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/portfolio';
import TransitionLayout from '../components/TransitionLayout';
import { MagneticButton } from '../components/ui/MagneticButton';
import SmoothScroll from '../components/SmoothScroll';
import Footer from '../components/sections/Footer';
import { Typography } from '../components/ui/Typography';
import { X, ExternalLink, Github, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const currentIndex = projects.findIndex(p => p.id === id);
  const project = projects[currentIndex];

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <TransitionLayout>
      <SmoothScroll />
      <main className="w-full min-h-screen bg-[#FFFFFF] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#FFFFFF]">
        
        {/* Navbar Simplificada para o Case */}
        <nav className="fixed top-0 left-0 w-full p-4 md:p-8 z-50 flex justify-between items-center mix-blend-difference text-[#FFFFFF] pointer-events-none">
          <Link to="/" className="text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity font-sans pointer-events-auto">
            Victor Cardoso
          </Link>
          <div className="pointer-events-auto">
            <MagneticButton>
              <Link 
                to="/" 
                aria-label="Voltar para a página inicial"
                className="w-12 h-12 bg-[#1a1a1a] text-[#FFFFFF] hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-white/20"
              >
                <X size={24} />
              </Link>
            </MagneticButton>
          </div>
        </nav>

        {/* Hero do Case */}
        <header className="w-full h-[60vh] md:h-[70vh] relative flex items-end pb-12 px-4 md:px-10">
          <div className="absolute inset-0 w-full h-full">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale" />
             <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          </div>
          <div className="relative z-10 max-w-4xl">
            <Typography variant="label" themeColor="inverted" className="mb-2 block">
              {project.category} — {project.year}
            </Typography>
            <Typography as="h1" variant="h2" themeColor="inverted">
              {project.title}
            </Typography>
          </div>
        </header>

        {/* Detalhamento Técnico (Compacto) */}
        <article className="w-full max-w-4xl mx-auto px-4 md:px-10 py-10 flex flex-col gap-10">
          
          <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-8">
             <Typography as="h2" variant="label" className="pt-2 border-t border-[#1a1a1a]/20">
               O Desafio de Engenharia
             </Typography>
             <Typography as="p" variant="p" className="text-[15px] font-light leading-relaxed">
               {project.problem}
             </Typography>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-8">
             <Typography as="h2" variant="label" className="pt-2 border-t border-[#1a1a1a]/20">
               Arquitetura & Clean Code
             </Typography>
             <div className="flex flex-col gap-4">
               <Typography as="p" variant="p" className="text-[15px] font-medium leading-relaxed">
                 {project.architecture}
               </Typography>
               <div className="flex flex-wrap gap-2 mt-2">
                 {project.techStack.map(tech => (
                   <span key={tech} className="px-4 py-1.5 border border-[#1a1a1a] rounded-full text-[10px] font-bold uppercase tracking-widest font-sans">
                     {tech}
                   </span>
                 ))}
               </div>
             </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-8">
             <Typography as="h2" variant="label" className="pt-2 border-t border-[#1a1a1a]/20">
               Papel & Execução
             </Typography>
             <Typography as="p" variant="p" className="text-[15px] font-light leading-relaxed text-[#1a1a1a]/90">
               {project.role}
             </Typography>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-8 pt-10">
             <Typography as="h2" variant="label" className="pt-2 border-t border-[#1a1a1a]/20">
               Resultado & Impacto
             </Typography>
             <Typography as="p" variant="h4">
               {project.outcome}
             </Typography>
          </section>
          
          {(project.liveUrl || project.repoUrl) && (
            <section className="flex flex-wrap gap-4 mt-10 justify-start md:justify-center">
              {project.liveUrl && project.liveUrl !== '#' && (
                <MagneticButton>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#1a1a1a] text-[#FFFFFF] rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#1a1a1a]/80 transition-colors font-sans flex items-center gap-2">
                    <ExternalLink size={14} /> Ver Projeto Ao Vivo
                  </a>
                </MagneticButton>
              )}
              {project.repoUrl && (
                <MagneticButton>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#1a1a1a] text-[#1a1a1a] rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#1a1a1a]/5 transition-colors font-sans flex items-center gap-2">
                    <Github size={14} /> Repositório GitHub
                  </a>
                </MagneticButton>
              )}
            </section>
          )}

          {/* Navegação entre projetos (Prev / Next) */}
          <div className="border-t border-[#1a1a1a]/10 pt-6 mt-10 flex justify-between items-center gap-4 flex-wrap">
            {prevProject ? (
              <Link 
                to={`/case/${prevProject.id}`}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-all p-2 rounded-full hover:bg-[#1a1a1a]/5 font-sans"
              >
                <ArrowLeft size={16} />
                Projeto Anterior
              </Link>
            ) : <div />}
            
            {nextProject ? (
              <Link 
                to={`/case/${nextProject.id}`}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-all p-2 rounded-full hover:bg-[#1a1a1a]/5 font-sans"
              >
                Próximo Projeto
                <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>
        </article>

        <Footer />
      </main>
    </TransitionLayout>
  );
}
