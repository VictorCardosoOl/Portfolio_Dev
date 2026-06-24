import React, { createContext, useContext, useState, ReactNode } from 'react';
import WhatsAppModal from '../components/ui/WhatsAppModal';

interface WhatsAppModalContextType {
  openWhatsAppModal: () => void;
  closeWhatsAppModal: () => void;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextType | undefined>(undefined);

export const WhatsAppModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsAppModal = () => setIsOpen(true);
  const closeWhatsAppModal = () => setIsOpen(false);

  return (
    <WhatsAppModalContext.Provider value={{ openWhatsAppModal, closeWhatsAppModal }}>
      {children}
      <WhatsAppModal isOpen={isOpen} onClose={closeWhatsAppModal} />
    </WhatsAppModalContext.Provider>
  );
};

export const useWhatsAppModal = () => {
  const context = useContext(WhatsAppModalContext);
  if (context === undefined) {
    throw new Error('useWhatsAppModal must be used within a WhatsAppModalProvider');
  }
  return context;
};
