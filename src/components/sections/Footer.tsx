import { FooterTop } from './FooterTop';
import { FooterBottom } from './FooterBottom';

const Footer = () => {
  return (
    <footer id="contact" className="w-full min-h-screen flex flex-col border-t border-[#1a1a1a]/15 text-black font-sans overflow-hidden bg-[#F4EFE8] relative z-20">
      <FooterTop />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
