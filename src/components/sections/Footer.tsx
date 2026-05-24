import { PROFILE_DATA as DATA } from '../../config/profile';

const Footer = () => {
  return (
    <div className="w-full bg-transparent px-2 md:px-6 pb-2 md:px-6 pt-4">
      <footer 
        id="contact" 
        className="relative w-full rounded-[2rem] md:rounded-[3rem] bg-[#FFFFFF] text-[#1a1a1a] font-sans overflow-hidden flex flex-col justify-between"
        style={{
          minHeight: '75vh',
          // SVG cross grid background in dark color
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 25v10M25 30h10' stroke='%231a1a1a' stroke-width='1' stroke-opacity='0.05' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          backgroundPosition: 'center',
        }}
      >
        {/* Top Navigation Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-12 py-8">
          <a href="#portfolio" className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <div className="w-4 h-4 rounded-full border-[3px] border-[#1a1a1a] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
            </div>
            <span className="text-base md:text-lg font-serif tracking-wide text-[#1a1a1a]">Projetos Selecionados</span>
          </a>

          <a href="#mission" className="flex items-center gap-3 mt-4 md:mt-0 hover:opacity-70 transition-opacity">
            <div className="w-4 h-4 rounded-full border-[3px] border-[#1a1a1a] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>
            </div>
            <span className="text-base md:text-lg font-serif tracking-wide text-[#1a1a1a]">Currículo</span>
          </a>
        </div>

        {/* Middle Section */}
        <div className="flex-grow flex flex-col justify-center px-6 md:px-12 py-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif max-w-4xl leading-[1.1] mb-8 tracking-tight">
            Frontend Dev,<br />
            Designer UI/UX,<br />
            Brasil.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mt-auto">
            {/* Follow Us */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">SIGA-ME</span>
              <div className="flex flex-col text-sm md:text-base font-medium">
                <a href={DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#1a1a1a]/70 transition-colors w-fit">LinkedIn</a>
                <a href={DATA.socials.github} target="_blank" rel="noreferrer" className="hover:text-[#1a1a1a]/70 transition-colors w-fit">GitHub</a>
              </div>
            </div>

            {/* Explore Project */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">INICIE UM PROJETO</span>
              <a href={`mailto:${DATA.contact.email}`} className="text-sm md:text-base font-medium hover:text-[#1a1a1a]/70 transition-colors underline underline-offset-4 w-fit">
                {DATA.contact.email}
              </a>
            </div>

            {/* Work With Us */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">QUER TRABALHAR COMIGO?</span>
              <a href={DATA.resumeLink} target="_blank" rel="noreferrer" className="text-sm md:text-base font-medium hover:text-[#1a1a1a]/70 transition-colors underline underline-offset-4 w-fit">
                Ver Currículo
              </a>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/50">LEGAL</span>
              <a href="#" className="text-sm md:text-base font-medium hover:text-[#1a1a1a]/70 transition-colors w-fit">Política de Privacidade</a>
            </div>
          </div>
        </div>

        {/* Bottom Giant Typography */}
        <div className="w-full flex flex-col items-center justify-end px-4 overflow-hidden pt-4 pb-32 md:pb-12">
          <a href="#" aria-label="Ir para a Home" className="hover:opacity-70 transition-opacity">
            <h1 className="text-[10vw] md:text-[11vw] leading-[0.8] tracking-tighter font-serif m-0 p-0 whitespace-nowrap select-none text-center flex items-center justify-center relative">
              @VictorCardoso
            </h1>
          </a>
        </div>

      </footer>
    </div>
  );
};

export default Footer;
