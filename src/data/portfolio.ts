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
  gallery?: string[];
  sections?: {
    title: string;
    content: string[];
    list?: string[];
  }[];
}

export const projects: Project[] = [
  {
    id: 'luiz-felipe',
    title: 'Luiz Felipe (TCC)',
    description: 'Plataforma web focada na captação e conversão de pacientes para o psicólogo Luiz Felipe, especialista em TCC.',
    fullDescription:
      'Muito além de uma vitrine institucional, a aplicação foi projetada como uma ferramenta estratégica de negócios. O design foi guiado por uma experiência de usuário (UX) empática e acolhedora, utilizando uma paleta de cores amena, aplicação inteligente de espaços de respiro e transições fluidas.',
    technicalChallenge:
      'Motion Design de Alta Fidelidade: sincronização minuciosa entre a física de interpolação do Lenis e o ScrollTrigger do GSAP, com taxa de atualização cravada em 60fps sem onerar a bateria.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis', 'Zod'],
    problem: 'O público-alvo que procura suporte emocional precisava de um ambiente virtual que diminuísse a fricção na navegação e transmitisse segurança imediata e acolhimento.',
    architecture: 'A aplicação foi desenvolvida sob o paradigma de Server-Side Rendering (SSR) do Next.js App Router, garantindo SEO técnico para destaque orgânico. A estrutura segue Separation of Concerns (SoC) com dados isolados em /src/constants/data.ts.',
    role: 'Frontend Developer - Desenvolvimento da plataforma, otimização de SEO e UX Design empático.',
    outcome: 'Navegação fluida e premium que prepara o terreno emocional para o processo terapêutico, maximizando as taxas de contato e atração de tráfego orgânico qualificado.',
    liveUrl: 'https://luizfelipepsicologo.vercel.app/',
    image: '/luiz-felipe/hero.png',
    year: '2026',
    category: 'Saúde & Bem-estar',
    gallery: [
      '/luiz-felipe/hero_moblie.png',
      '/luiz-felipe/about_moblie.png',
      '/luiz-felipe/tcc.png',
      '/luiz-felipe/formulario.png',
      '/luiz-felipe/formulario_moblie.png',
      '/luiz-felipe/footer.png'
    ],
    sections: [
      {
        title: 'Resumo do Projeto e Estratégia Comercial',
        content: [
          'Este projeto consiste no desenvolvimento de uma plataforma web de alta performance focada na captação e conversão de pacientes para o psicólogo Luiz Felipe, especialista em Terapia Cognitivo-Comportamental (TCC). Muito além de uma vitrine institucional, a aplicação foi projetada como uma ferramenta estratégica de negócios. A arquitetura foi construída com rigorosas práticas de SEO (Otimização para Mecanismos de Busca) para garantir que o profissional ganhe destaque orgânico no Google, conectando-o rapidamente a quem busca ajuda.',
          'Considerando que o público-alvo procura suporte emocional e saúde mental, o design foi guiado por uma experiência de usuário (UX) empática e acolhedora. A interface utiliza uma paleta de cores amena, aplicação inteligente de espaços de respiro (whitespace) e transições de tela altamente fluidas. Esse cuidado técnico diminui a fricção na navegação, transmite segurança imediata e prepara o terreno emocional para o processo terapêutico, maximizando as taxas de contato.'
        ]
      },
      {
        title: 'Ficha Técnica de Desenvolvimento',
        content: [],
        list: [
          'Framework Core: Next.js (App Router) e React.',
          'Linguagem: TypeScript.',
          'Estilização & UI: Tailwind CSS integrado com variáveis CSS.',
          'Motion Design: GSAP (GreenSock) para coreografias de animação e Lenis para rolagem suave (smooth scroll).',
          'Formulários & Validação: React Hook Form e Zod.',
          'DevOps & Qualidade: Pipeline de CI/CD automatizado, Husky, Commitlint (padrão Conventional Commits), Lint-staged e GitHub Actions.'
        ]
      },
      {
        title: 'Destaques de Arquitetura e Engenharia',
        content: [],
        list: [
          'Performance e SEO Técnico (Foco em Conversão): A aplicação foi desenvolvida sob o paradigma de Server-Side Rendering (SSR) nativo do Next.js App Router, garantindo que os motores de busca (Googlebots) façam a leitura instantânea de meta tags e conteúdo. A implementação de tags semânticas e metadados focados em tratamentos de ansiedade, depressão e TCC impulsiona a indexação e atrai tráfego qualificado.',
          'Motion Design de Alta Fidelidade: O sistema de rolagem foi aprimorado com a criação do componente dedicado SmoothScrollLayout. Houve uma sincronização minuciosa entre a física de interpolação do Lenis e o ScrollTrigger do GSAP. O ticker de renderização do GSAP foi configurado com prioridade máxima no loop, mantendo uma taxa de atualização cravada em 60fps. O resultado é uma navegação fluida e premium, sem onerar a bateria do dispositivo ou causar engasgos (lag smoothing travado em 0).',
          'Clean Code e Escalabilidade (Data Layer): A estrutura do projeto segue rigorosamente o princípio de Separation of Concerns (SoC). Os dados brutos da aplicação (textos de serviços, detalhamento de transtornos) foram extraídos da camada de apresentação e isolados em /src/constants/data.ts. Isso mantém os componentes React limpos, estritamente focados na renderização, facilitando a escalabilidade e futuras manutenções.',
          'Design System Customizado: A paleta padrão do Tailwind foi reescrita para refletir um tom Premium, combinando autoridade e acolhimento. Foram adicionados tons terrosos (stone), azuis serenos (primary) e esverdeados (sage). Esse conjunto é complementado por uma tipografia elegante (fontes Inter e Playfair Display) e animações customizadas, como o fade-in-up, consolidando a identidade visual do profissional.'
        ]
      }
    ]
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
