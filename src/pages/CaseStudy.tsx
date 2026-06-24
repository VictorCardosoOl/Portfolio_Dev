import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/portfolio';
import TransitionLayout from '../components/TransitionLayout';
import Footer from '../components/sections/Footer';
import { X, ExternalLink, Github, ArrowLeft, ArrowRight, Linkedin, MessageCircle } from 'lucide-react';
import { PROFILE_DATA } from '../config/profile';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import Lightbox from '../components/ui/Lightbox';

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const { openWhatsAppModal } = useWhatsAppModal();
  const [lightboxState, setLightboxState] = useState({ isOpen: false, index: 0 });

  const currentIndex = projects.findIndex(p => p.id === id);
  const project = projects[currentIndex];

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const allImages = [project.image, ...(project.gallery || [])];

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <TransitionLayout>
      <title>{project.title} | Case Study - Victor Cardoso</title>
      <meta name="description" content={project.problem} />
      <main className="w-full min-h-screen bg-[#ffffff] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a] selection:text-[#ffffff]">
        
        {/* MAIN SPLIT SCREEN CONTAINER */}
        <div className="w-full flex flex-col md:flex-row relative">
          
          {/* LEFT COLUMN: SIDEBAR (STICKY ON DESKTOP) */}
          <div className="w-full md:w-[35%] lg:w-[30%] bg-[#FAF9F6] z-10 border-b md:border-b-0 md:border-r border-black/10 relative">
             <div className="md:sticky md:top-0 md:h-screen p-8 md:p-12 flex flex-col justify-between overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                
                {/* Header: Project Index & Close Button */}
                <div className="flex justify-between items-center w-full mb-12">
                   <span className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-40">
                     PROJECT {String(currentIndex + 1).padStart(2, '0')}
                   </span>
                   <Link 
                     to="/" 
                     className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity text-black font-semibold p-3 -mr-3 touch-manipulation"
                   >
                     CLOSE <X size={12} strokeWidth={2.5} />
                   </Link>
                </div>

                {/* Content Details */}
                <div className="flex-grow flex flex-col justify-center my-8">
                   <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight uppercase mb-6">
                     {project.title}
                   </h1>
                   
                   <div className="w-12 h-[1px] bg-black/30 mb-8" />

                   <p className="font-serif italic text-sm md:text-base text-black/80 leading-relaxed mb-6">
                     "{project.problem}"
                   </p>
                   
                   <p className="text-xs md:text-sm font-light leading-relaxed text-black/60 mb-8">
                     {project.architecture}
                   </p>

                   {/* Meta Grid (Similar to screenshot layout) */}
                   <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-black/10 pt-6 mt-4 text-left">
                     <div>
                        <span className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-30 block mb-1">Year</span>
                        <span className="text-xs font-light text-black/70">{project.year}</span>
                     </div>
                     <div>
                        <span className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-30 block mb-1">Role</span>
                        <span className="text-xs font-light text-black/70">{project.role}</span>
                     </div>
                     <div className="col-span-2">
                        <span className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-30 block mb-1">Tech Stack</span>
                        <span className="text-xs font-light text-black/70">{project.techStack.join(', ')}</span>
                     </div>
                   </div>
                </div>

                {/* Call To Action buttons at bottom of Sidebar */}
                <div className="flex flex-col gap-3 mt-8">
                   <div className="flex items-stretch gap-2">
                     {project.liveUrl && project.liveUrl !== '#' ? (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 bg-[#1a1a1a] text-white hover:bg-black py-4 px-4 rounded-none text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-300"
                        >
                          Ver Projeto Online
                          <ExternalLink size={12} />
                        </a>
                     ) : (
                        <button 
                          disabled
                          className="flex-1 bg-[#1a1a1a]/20 text-black/40 py-4 px-4 rounded-none text-[10px] font-bold tracking-widest uppercase flex items-center justify-center transition-colors"
                        >
                          Projeto Interno
                        </button>
                     )}
                     
                     <div className="flex items-center justify-center gap-4 px-4 border border-black/10">
                       <a href={PROFILE_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="text-black/50 hover:text-black transition-colors" aria-label="LinkedIn">
                          <Linkedin size={18} strokeWidth={1.5} />
                       </a>
                       <a href={PROFILE_DATA.socials.github} target="_blank" rel="noreferrer" className="text-black/50 hover:text-black transition-colors" aria-label="GitHub">
                          <Github size={18} strokeWidth={1.5} />
                       </a>
                       <button onClick={openWhatsAppModal} className="text-black/50 hover:text-black transition-colors" aria-label="WhatsApp">
                          <MessageCircle size={18} strokeWidth={1.5} />
                       </button>
                     </div>
                   </div>

                   {project.repoUrl && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full border border-black/20 hover:border-black py-3.5 px-6 rounded-none text-[10px] font-bold tracking-widest uppercase text-center transition-colors duration-300"
                      >
                        Repository GitHub
                      </a>
                   )}
                </div>

             </div>
          </div>

          {/* RIGHT COLUMN: SCROLLING IMAGES */}
          <div className="w-full md:w-[65%] lg:w-[70%] bg-black">
             <div className="w-full min-h-[50vh] md:min-h-screen flex flex-col">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-auto block cursor-pointer hover:opacity-95 transition-opacity" 
                  onClick={() => setLightboxState({ isOpen: true, index: 0 })}
                />

                {/* Detailed Text Sections from the project */}
                {project.sections && project.sections.length > 0 && (
                  <div className="w-full bg-[#faf9f6] text-[#1a1a1a] p-8 md:p-16 lg:p-24 border-b border-black/10">
                    <div className="max-w-4xl mx-auto space-y-16">
                      {project.sections.map((sec, i) => (
                        <div key={i} className="flex flex-col gap-6">
                           <h3 className="font-serif text-2xl md:text-3xl font-light uppercase tracking-widest border-b border-black/10 pb-4">{sec.title}</h3>
                           {sec.content && sec.content.map((p, j) => (
                             <p key={j} className="text-sm md:text-base leading-relaxed text-black/80 font-light">{p}</p>
                           ))}
                           {sec.list && sec.list.length > 0 && (
                             <ul className="list-disc pl-5 space-y-4 text-sm md:text-base leading-relaxed text-black/80 font-light mt-2">
                               {sec.list.map((li, j) => (
                                 <li key={j} className="pl-2">{li}</li>
                               ))}
                             </ul>
                           )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Secondary Full Screen display of details/outcome */}
                <div className="w-full h-auto md:h-screen bg-neutral-900 flex items-center justify-center p-8 md:p-16">
                  <div className="max-w-2xl text-center text-white/80">
                     <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-45 mb-4">Outcome & Impact</p>
                     <h3 className="font-serif italic text-2xl md:text-4xl font-light mb-8 leading-relaxed">"{project.outcome}"</h3>
                  </div>
                </div>

                {/* Masonry Gallery (Montessoriana) */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="w-full bg-[#0a0a0a] p-6 md:p-12 lg:p-16">
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-45 mb-10 text-white text-center">Galeria do Projeto</p>
                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                      {project.gallery.map((img, index) => (
                        <div key={index} className="break-inside-avoid w-full">
                          <img 
                            src={img} 
                            alt={`${project.title} gallery ${index + 1}`} 
                            className="w-full h-auto object-cover rounded-sm border border-white/5 cursor-pointer hover:opacity-90 transition-opacity"
                            loading="lazy"
                            onClick={() => setLightboxState({ isOpen: true, index: index + 1 })}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
             </div>
          </div>

        </div>

        {/* PART 3: BOTTOM NAVIGATION & FOOTER */}
        <div className="w-full border-t border-black/10 bg-white relative z-20">
          <div className="px-6 md:px-24 py-16 flex items-center justify-between">
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
          <Footer />
        </div>

      </main>
      
      <Lightbox 
        images={allImages}
        initialIndex={lightboxState.index}
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
      />
    </TransitionLayout>
  );
}
