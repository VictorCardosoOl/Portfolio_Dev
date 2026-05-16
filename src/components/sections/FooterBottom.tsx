import Iridescence from '../ui/Iridescence';

export const FooterBottom = () => {
  return (
    <div className="w-full h-[30vh] shrink-0 bg-[#000000] relative overflow-hidden">
      {/* Subtle top shadow/gradient for depth against the black canvas */}
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />
      
      <Iridescence
        color={[0.5, 0.6, 0.8]}
        mouseReact={true}
        amplitude={0.1}
        speed={1}
      />
    </div>
  );
};
