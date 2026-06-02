// ─────────────────────────────────────────────────────────────────────────────
// PORTFÓLIO DE PROJETOS — Victor Cardoso
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technicalChallenge: string;
  techStack: string[];
  problem: string;
  architecture: string;
  role: string;
  outcome: string;
  repoUrl?: string;
  liveUrl?: string;
  image: string;
  year: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 'termique',
    title: 'Tērmique',
    description: 'Brand strategy, visual identity & digital experience for a premium wellness brand.',
    fullDescription:
      'Sistema de identidade visual completo para uma marca de bem-estar premium, abrangendo estratégia de marca, naming, tipografia editorial e a presença digital flagship.',
    technicalChallenge:
      'Implementar uma experiência de scroll horizontal com GSAP ScrollTrigger pinning preciso, garantindo fluidez em resoluções de 1080p a 4K sem causar layout shift perceptível.',
    techStack: ['React', 'TypeScript', 'GSAP', 'ScrollTrigger', 'TailwindCSS'],
    problem: 'O cliente precisava de um posicionamento premium digital que não comprometesse a performance e mantivesse o feeling de "revista editorial" nas interações de rolagem.',
    architecture: 'Arquitetura componentizada usando React com custom hooks para orquestração das timelines GSAP. O CSS global foi otimizado aplicando princípios SOLID de separação de responsabilidades para evitar vazamento de estilos.',
    role: 'Lead Frontend Developer & UI Engineer - Fui responsável pela idealização da micro-interação, codificação e otimização Core Web Vitals.',
    outcome: 'A plataforma atingiu pontuações perfeitas no Lighthouse (98 Performance / 100 Acessibilidade). Aumento de 40% na permanência de tempo de página e redução brusca de Bounce Rate.',
    liveUrl: '#',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop',
    year: '2026',
    category: 'Branding & Web',
  },
  {
    id: 'lumina',
    title: 'Lumina',
    description: 'Real estate platform with immersive UI, 3D rendering integration & digital marketing.',
    fullDescription:
      'Plataforma imobiliária com UX imersiva, integração de renderizações 3D em tempo real e painel administrativo para gestão de unidades. Foco em conversão e autoridade de marca.',
    technicalChallenge:
      'Arquitetura de renderização otimizada para assets de alta resolução (renders 3D) com lazy loading progressivo e skeleton states, mantendo o Core Web Vitals (LCP < 2.5s) mesmo em conexões lentas.',
    techStack: ['Next.js', 'TypeScript', 'Framer Motion', 'Node.js', 'Prisma'],
    problem: 'Atrasos no carregamento das texturas 3D causavam alta taxa de rejeição entre usuários mobile. A plataforma precisava unificar visual de alto padrão e velocidade instantânea.',
    architecture: 'Next.js App Router para SSR das páginas institucionais. Implementação da injeção de dependências (Clean Architecture) nos handlers de API do banco (Prisma) para facilitar testes unitários (Jest).',
    role: 'Fullstack Engineer. Arquitetura de DB, BFF (Backend for Frontend) e integração do canvas 3D no client-side.',
    outcome: 'O carregamento da listagem 3D baixou de 8.5s para 1.8s (LCP). A aplicação escalou para lidar com os altos picos de acessos sem timeouts de banco.',
    liveUrl: '#',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    year: '2025',
    category: 'Produto Web',
  },
  {
    id: 'aura',
    title: 'Aura',
    description: 'E-commerce experience, packaging design, brand identity & art direction.',
    fullDescription:
      'Experiência de e-commerce end-to-end para uma marca de cosméticos independente: identidade visual, design de embalagens e loja online com checkout otimizado.',
    technicalChallenge:
      'Construção de um carrinho de compras com estado global (Zustand) persistido no localStorage, integrado ao gateway de pagamento Stripe com webhooks para atualização de estoque em tempo real.',
    techStack: ['Next.js', 'Stripe', 'Zustand', 'Sanity CMS', 'TailwindCSS'],
    problem: 'Integração assíncrona complexa com 3 sistemas distintos: CMS para conteúdo, ERP para estoque, e Stripe para transações, garantindo forte segurança e nula inconsistência de estado.',
    architecture: 'A arquitetura seguiu princípios DRY (Don\'t Repeat Yourself), com repositórios e serviços de domínio desacoplados da camada de UI. Estado global otimizado com sub-slices usando Zustand.',
    role: 'Frontend Architect. Definição do boilerplate padrão do time, integração CMS e implementação dos funis de checkout.',
    outcome: 'Carrinho de compras totalmente seguro, fluxo performático e integração CMS permitiu o time de marketing alterar os catálogos independentemente de deploys.',
    repoUrl: 'https://github.com/VictorCardosoOl',
    liveUrl: '#',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2000&auto=format&fit=crop',
    year: '2025',
    category: 'E-Commerce',
  },
  {
    id: 'vanguard',
    title: 'Vanguard',
    description: 'Mobile application, fintech UI, design system & interactive prototyping.',
    fullDescription:
      'Aplicativo fintech mobile-first para controle de gastos pessoais, com dashboard analítico, gráficos interativos e Design System próprio documentado em Storybook.',
    technicalChallenge:
      'Implementação de gráficos SVG animados sem dependências pesadas (Recharts customizado), com performance garantida via memoização granular (useMemo/React.memo) e virtualization de listas longas.',
    techStack: ['React', 'TypeScript', 'Recharts', 'Storybook', 'Radix UI'],
    problem: 'Desenvolver e orquestrar um Design System do zero que gerasse acessibilidade A11y impecável (WCAG 2.1) além de ser o mais fluido possível.',
    architecture: 'Uso de Radix UI Primitives para lidar estritamente com lógica comportamental de acessibilidade. Padrão Headless UI focado na reutilização de código e separação da UI vs Lógica de Negócio.',
    role: 'Design System Lead & UI Developer. Foco total em WCAG e padronização.',
    outcome: 'Certificação completa de acessibilidade, navegação 100% via teclado nos modais. Componentes documentados aumentaram a produtividade de outras squads de desenvolvimento em cerca de 30%.',
    repoUrl: 'https://github.com/VictorCardosoOl',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    year: '2024',
    category: 'App & Design System',
  },
];
