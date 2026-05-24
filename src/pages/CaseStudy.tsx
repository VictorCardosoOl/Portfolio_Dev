import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/portfolio';
import TransitionLayout from '../components/TransitionLayout';
import SmoothScroll from '../components/SmoothScroll';
import Footer from '../components/sections/Footer';
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
      <main className="w-full min-h-screen bg-[#ffffff] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-[#ffffff]">
        
        {/* PD-BAR (Sticky Navbar) */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-24 py-5 bg-white/90 backdrop-blur-md border-b border-black/10">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-40">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <Link to="/" className="w-11 h-11 rounded-full border border-black/15 bg-black/5 flex items-center justify-center hover:bg-black/10 hover:border-black/30 transition-all flex-shrink-0 text-black">
            <X size={16} strokeWidth={1.5} />
          </Link>
        </nav>

        {/* PD-CONTENT */}
        <div className="px-6 md:px-24 py-20">
          
          {/* HEADER GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-6 mb-16">
            <div className="md:col-span-8">
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#0a0a0a] opacity-40 uppercase mb-4">{project.category}</p>
              <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight leading-tight mb-6">{project.title}</h1>
            </div>
          </div>

          {/* META ROW */}
          <div className="flex items-center gap-8 md:gap-16 flex-wrap border-y border-black/10 py-6 my-10">
            <div className="flex flex-col gap-1.5">
               <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-30">Ano</span>
               <span className="text-[13px] font-light text-black/50 border-l border-black/10 pl-4">{project.year}</span>
            </div>
            <div className="flex flex-col gap-1.5">
               <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-30">Role</span>
               <span className="text-[13px] font-light text-black/50 border-l border-black/10 pl-4">{project.role}</span>
            </div>
            <div className="flex flex-col gap-1.5">
               <span className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-30">Tech Stack</span>
               <span className="text-[13px] font-light text-black/50 border-l border-black/10 pl-4">
                  {project.techStack.join(', ')}
               </span>
            </div>
          </div>

          {/* DESCRIPTION ROW */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-6 mb-20">
            <div className="md:col-span-7 flex flex-col gap-8">
              <div>
                <h3 className="font-serif italic text-[13px] opacity-40 tracking-wider mb-2">The Challenge</h3>
                <p className="text-[15px] font-light leading-[1.8] text-black/60">{project.problem}</p>
              </div>
              <div>
                <h3 className="font-serif italic text-[13px] opacity-40 tracking-wider mb-2">Architecture & Process</h3>
                <p className="text-[15px] font-light leading-[1.8] text-black/60">{project.architecture}</p>
              </div>
              <div>
                <h3 className="font-serif italic text-[13px] opacity-40 tracking-wider mb-2">Outcome</h3>
                <p className="text-[15px] font-light leading-[1.8] text-black/60">{project.outcome}</p>
              </div>

              {/* Links Ao Vivo / Repo */}
              {(project.liveUrl || project.repoUrl) && (
                 <div className="flex flex-wrap gap-4 pt-4">
                    {project.liveUrl && project.liveUrl !== '#' && (
                       <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-opacity">
                         <ExternalLink size={12} /> Live Project
                       </a>
                    )}
                    {project.repoUrl && (
                       <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-opacity">
                         <Github size={12} /> Repository
                       </a>
                    )}
                 </div>
              )}
            </div>
          </div>

          {/* IMAGE WRAPPER */}
          <div className="relative w-full mb-[30px] overflow-hidden">
             <img src={project.image} alt={project.title} className="w-full block" />
          </div>

          {/* BOTTOM NAV */}
          <div className="flex items-center justify-between py-12 mt-16 border-t border-black/10">
             {prevProject ? (
               <Link to={`/case/${prevProject.id}`} className="flex items-center gap-4 group hover:opacity-60 transition-opacity">
                  <div className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center flex-shrink-0 group-hover:border-black/40 transition-colors">
                     <ArrowLeft size={16} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                     <span className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-35">Previous</span>
                     <span className="font-serif text-lg font-light leading-tight max-w-[240px] truncate">{prevProject.title}</span>
                  </div>
               </Link>
             ) : <div />}

             <Link to="/" className="flex flex-col items-center gap-2 group hover:opacity-60 transition-opacity mx-4">
                <div className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center flex-shrink-0 group-hover:border-black/40 transition-colors">
                   <X size={16} strokeWidth={1.5} />
                </div>
             </Link>

             {nextProject ? (
               <Link to={`/case/${nextProject.id}`} className="flex items-center gap-4 group hover:opacity-60 transition-opacity text-right">
                  <div className="flex flex-col gap-1 items-end">
                     <span className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-35">Next</span>
                     <span className="font-serif text-lg font-light leading-tight max-w-[240px] truncate">{nextProject.title}</span>
                  </div>
                  <div className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center flex-shrink-0 group-hover:border-black/40 transition-colors">
                     <ArrowRight size={16} strokeWidth={1.5} />
                  </div>
               </Link>
             ) : <div />}
          </div>
        </div>
        
        <Footer />
      </main>
    </TransitionLayout>
  );
}
