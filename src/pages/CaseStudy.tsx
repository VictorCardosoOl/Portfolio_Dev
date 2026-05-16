import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/portfolio';
import TransitionLayout from '../components/TransitionLayout';
import { MagneticButton } from '../components/ui/MagneticButton';
import SmoothScroll from '../components/SmoothScroll';
import Footer from '../components/sections/Footer';
import { Typography } from '../components/ui/Typography';

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
          <Link to="/" className="text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity font-sans">
            Victor Cardoso
          </Link>
          <MagneticButton>
            <Link to="/" className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 font-sans">
              <span className="w-2 h-2 rounded-full bg-[#F4EFE8] inline-block" /> Voltar
            </Link>
          </MagneticButton>
        </nav>

        {/* Hero do Case */}
        <header className="w-full h-screen relative flex items-end pb-24 px-6 md:px-24">
          <div className="absolute inset-0 w-full h-full">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale" />
             <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          </div>
          <div className="relative z-10 max-w-5xl">
            <Typography variant="label" themeColor="inverted" className="mb-4 block">
              {project.category} — {project.year}
            </Typography>
            <Typography as="h1" variant="huge" themeColor="inverted">
              {project.title}
            </Typography>
          </div>
        </header>

        {/* Detalhamento Técnico (Brutalismo Minimalista) */}
        <article className="w-full max-w-6xl mx-auto px-6 py-32 md:py-48 flex flex-col gap-32">
          
          <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 md:gap-24">
             <Typography as="h2" variant="label" className="pt-2 border-t border-[#1a1a1a]/20">
               O Desafio de Engenharia
             </Typography>
             <Typography as="p" variant="h3" themeColor="default">
               {project.problem}
             </Typography>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 md:gap-24">
             <Typography as="h2" variant="label" className="pt-2 border-t border-[#1a1a1a]/20">
               Arquitetura & Clean Code
             </Typography>
             <div className="flex flex-col gap-8">
               <Typography as="p" variant="p" themeColor="default" className="text-lg md:text-2xl font-medium">
                 {project.architecture}
               </Typography>
               <div className="flex flex-wrap gap-3 mt-4">
                 {project.techStack.map(tech => (
                   <span key={tech} className="px-5 py-2 border border-[#1a1a1a] rounded-full text-xs font-bold uppercase tracking-widest font-sans">
                     {tech}
                   </span>
                 ))}
               </div>
             </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 md:gap-24">
             <Typography as="h2" variant="label" className="pt-2 border-t border-[#1a1a1a]/20">
               Papel & Execução
             </Typography>
             <Typography as="p" variant="p" themeColor="default" className="text-lg md:text-xl">
               {project.role}
             </Typography>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 md:gap-24 pt-32">
             <Typography as="h2" variant="label" className="pt-2 border-t border-[#1a1a1a]/20">
               Resultado & Impacto
             </Typography>
             <Typography as="p" variant="h2" themeColor="default">
               {project.outcome}
             </Typography>
          </section>
          
          {(project.liveUrl || project.repoUrl) && (
            <section className="flex gap-6 mt-24 justify-center">
              {project.liveUrl && project.liveUrl !== '#' && (
                <MagneticButton>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-[#1a1a1a] text-[#F4EFE8] rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#1a1a1a]/80 transition-colors font-sans">
                    Ver Projeto Ao Vivo
                  </a>
                </MagneticButton>
              )}
              {project.repoUrl && (
                <MagneticButton>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-5 border border-[#1a1a1a] text-[#1a1a1a] rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#1a1a1a]/5 transition-colors font-sans">
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
