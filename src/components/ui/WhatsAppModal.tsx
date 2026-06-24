import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PROFILE_DATA } from '../../config/profile';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [ajuda, setAjuda] = useState('');

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = PROFILE_DATA.contact.phone;
    
    // Construct the message
    const message = `Olá Victor! Vim pelo seu portfólio.\nGostaria de falar sobre um projeto.\n*Nome:* ${nome}\n*Empresa/Projeto:* ${empresa}\n*Como posso ajudar:* ${ajuda}`;
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Close modal and reset
    onClose();
    setNome('');
    setEmpresa('');
    setAjuda('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-[#FAF9F6] w-full max-w-md rounded-lg shadow-2xl p-6 md:p-8 transform transition-all">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-black/50 hover:text-black transition-colors"
          aria-label="Fechar"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-[#1a1a1a] mb-2 uppercase">
          Iniciar Projeto
        </h2>
        <p className="text-sm text-black/60 mb-6 font-light leading-relaxed">
          Preencha os dados abaixo para que eu já tenha um contexto sobre sua necessidade ao iniciarmos a conversa.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="wa-nome" className="block text-[10px] font-bold uppercase tracking-widest text-black/50 mb-1">
              Nome Completo
            </label>
            <input 
              id="wa-nome"
              type="text" 
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-white border border-black/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition-colors"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label htmlFor="wa-empresa" className="block text-[10px] font-bold uppercase tracking-widest text-black/50 mb-1">
              Empresa ou Projeto
            </label>
            <input 
              id="wa-empresa"
              type="text" 
              required
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="w-full bg-white border border-black/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition-colors"
              placeholder="Nome da sua empresa"
            />
          </div>

          <div>
            <label htmlFor="wa-ajuda" className="block text-[10px] font-bold uppercase tracking-widest text-black/50 mb-1">
              Como posso ajudar?
            </label>
            <textarea 
              id="wa-ajuda"
              required
              rows={3}
              value={ajuda}
              onChange={(e) => setAjuda(e.target.value)}
              className="w-full bg-white border border-black/10 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-black/30 transition-colors resize-none"
              placeholder="Descreva brevemente o que você precisa..."
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold tracking-widest uppercase text-[10px] py-4 rounded-sm transition-colors mt-4 flex items-center justify-center gap-2"
          >
            Ir para o WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
