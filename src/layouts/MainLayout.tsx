import React from 'react';
import Navbar from '../components/Navbar';
import { NAVIGATION_CONFIG } from '../config/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* O ruído visual isolado na camada de layout */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-multiply" 
        style={{ backgroundImage: "url('/noise.png')" }} 
      />
      
      <Navbar items={NAVIGATION_CONFIG} logoText="Victor Cardoso" />
      
      {children}
    </>
  );
}
