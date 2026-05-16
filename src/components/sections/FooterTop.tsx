import { PROFILE_DATA as DATA } from '../../config/profile';
import { MagneticButton } from '../ui/MagneticButton';

export const FooterTop = () => {
  return (
    <div className="flex-grow flex flex-col justify-between pt-8 pb-8">
      
      {/* Top Header */}
      <div className="flex justify-between items-start px-4 md:px-8 pb-8 md:pb-16">
        <div className="hidden md:block w-1/3"></div>
        <div className="w-full md:w-1/3 text-center">
          <span className="uppercase font-bold tracking-widest text-lg">
            {DATA.name.split(' ')[0]} {DATA.name.split(' ')[1]}
          </span>
        </div>
        <div className="hidden md:flex w-1/3 justify-end gap-6 text-sm text-stone-500">
          <a href={DATA.resumeLink} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">resume (pdf)</a>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-12 px-4 md:px-8 pb-12 md:pb-20">
        
        <div className="col-span-2 md:col-span-1 flex flex-col gap-[2px] text-sm text-stone-600">
          <a href="#" className="hover:text-black transition-colors w-fit">home</a>
          <a href="#portfolio" className="hover:text-black transition-colors w-fit">projects</a>
          <a href="#services" className="hover:text-black transition-colors w-fit">services</a>
          <a href="#mission" className="hover:text-black transition-colors w-fit">about {DATA.name.split(' ')[0]}</a>
          <a href="#contact" className="text-black underline w-fit mt-1">contacts</a>
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col gap-4 items-start">
          <h3 className="uppercase text-lg md:text-xl text-black">MAIL</h3>
          <MagneticButton>
            <a href={`mailto:${DATA.contact.email}`} className="text-sm text-stone-600 hover:text-black transition-colors block p-2 -ml-2">
              {DATA.contact.email}
            </a>
          </MagneticButton>
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <h3 className="uppercase text-lg md:text-xl text-black">PHONE</h3>
          <div className="flex flex-col gap-1">
            <a href={`tel:${DATA.contact.phone.replace(/\D/g, '')}`} className="text-sm text-stone-600 hover:text-black transition-colors">
              {DATA.contact.phone}
            </a>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col gap-4 items-start">
          <h3 className="uppercase text-lg md:text-xl text-black">SOCIAL MEDIA</h3>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-stone-600">
            <span className="pt-2">in</span>
            <MagneticButton>
              <a href={DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-black transition-colors block p-2 -ml-2">
                @victorcardoso
              </a>
            </MagneticButton>
            <span className="pt-2">gh</span>
            <MagneticButton>
              <a href={DATA.socials.github} target="_blank" rel="noreferrer" className="hover:text-black transition-colors block p-2 -ml-2">
                @VictorCardosoOl
              </a>
            </MagneticButton>
          </div>
        </div>

        <div className="col-span-2 md:col-span-2 flex flex-col gap-4">
          <h3 className="uppercase text-lg md:text-xl text-black">ADDRESS</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            {DATA.location}<br />
            Available for remote work<br />
            Mon//Fri 9am//6pm
          </p>
        </div>

      </div>

      {/* Huge Bottom Text */}
      <div className="w-full px-2 md:px-4 flex items-end justify-center overflow-hidden mt-auto">
        <h1 className="text-[13vw] leading-[0.8] tracking-tight font-medium text-black m-0 p-0 whitespace-nowrap">
          //our contacts
        </h1>
      </div>

    </div>
  );
};
