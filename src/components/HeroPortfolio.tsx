import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { projects } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import Image from './ui/Image';
import TextType from './ui/TextType';
import { Button } from './ui/Button';
import ProjectModal from './ProjectModal';

const BG = ['#B8CADB', '#C9A8B5', '#8FA192'] as const;
const N = 3;
const STRIP_W = 6;    // vw — thin inactive strip
const ACTIVE_W = 100 - (N - 1) * STRIP_W; // 88vw — active panel
const HERO_INIT = 50; // vw — hero starts at 50%

/**
 * Each element has a right-edge value (% from left).
 * clip-path: inset(0 (100 - rightEdge)% 0 0)
 * Higher z-index panels cover lower ones, so what's "visible" for each
 * panel is the gap between its right-edge and the panel above it.
 *
 * Stack: hero=z40, panel[0]=z30, panel[1]=z20, panel[2]=z10
 */
function rightEdges(state: number): [number, number, number, number] {
  if (state === 0) {
    const s = (100 - HERO_INIT) / N; // ~16.67vw each strip
    return [HERO_INIT, HERO_INIT + s, HERO_INIT + 2 * s, 100];
  }
  const active = state - 1;
  let cursor = 0;
  const edges: number[] = [0]; // hero = 0 (hidden)
  for (let i = 0; i < N; i++) {
    cursor += i === active ? ACTIVE_W : STRIP_W;
    edges.push(cursor);
  }
  return edges as [number, number, number, number];
}

const clip = (re: number) => `inset(0 ${(100 - re).toFixed(3)}% 0 0)`;

export default function HeroPortfolio() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const metaRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const picked = projects.slice(0, N);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* ── initial state ──────────────────────────────────────── */
      const e0 = rightEdges(0);
      gsap.set(heroRef.current,   { clipPath: clip(e0[0]), willChange: 'clip-path' });
      panelRefs.current.forEach((el, j) => {
        gsap.set(el, { clipPath: clip(e0[j + 1]), willChange: 'clip-path' });
      });
      imgRefs.current.forEach(el   => gsap.set(el, { scale: 1.12 }));
      titleRefs.current.forEach(el => gsap.set(el, { autoAlpha: 0, y: 28 }));
      metaRefs.current.forEach(el  => gsap.set(el, { autoAlpha: 0, y: 14 }));

      /* ── ScrollTrigger timeline ─────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.4,            // lag = buttery trailing feel
          start: 'top top',
          end: `+=${N * 900}`,
          invalidateOnRefresh: true,
        },
      });

      for (let step = 1; step <= N; step++) {
        const lbl    = `s${step}`;
        const e      = rightEdges(step);
        const active = step - 1;

        tl.addLabel(lbl, step - 1);

        // Clip animations (GPU composited — no reflow)
        tl.to(heroRef.current, { clipPath: clip(e[0]), ease: 'power2.inOut' }, lbl);
        panelRefs.current.forEach((el, j) => {
          tl.to(el, { clipPath: clip(e[j + 1]), ease: 'power2.inOut' }, lbl);
        });

        // Image parallax: zoom out as panel becomes active
        tl.to(imgRefs.current[active], { scale: 1, ease: 'power2.out' }, lbl);
        if (active > 0) {
          tl.to(imgRefs.current[active - 1], { scale: 1.08, ease: 'power2.in' }, lbl);
        }

        // Title and meta fade-in
        tl.to(titleRefs.current[active], { autoAlpha: 1, y: 0, ease: 'power2.out' }, lbl);
        tl.to(metaRefs.current[active],  { autoAlpha: 1, y: 0, ease: 'power2.out' }, lbl);
        if (active > 0) {
          tl.to(titleRefs.current[active - 1], { autoAlpha: 0, y: -18, ease: 'power2.in' }, lbl);
          tl.to(metaRefs.current[active - 1],  { autoAlpha: 0, y: -10, ease: 'power2.in' }, lbl);
        }
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{ background: '#F4EFE8' }}
    >

      {/* ═══════════════════════════════════════════════════════════
          HERO PANEL — z:40 — left 50% initially
      ════════════════════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="absolute inset-0"
        style={{ zIndex: 40, background: '#F4EFE8' }}
      >
        {/* Content anchored to left; never squishes */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-14 pt-28"
          style={{ width: `${HERO_INIT}vw` }}
        >
          {/* PORTFOLIO SVG Wordmark */}
          <div className="w-full max-w-[180px] md:max-w-[220px] -ml-3 -mt-16 -mb-10 text-[#1a1a1a]">
            <svg viewBox="-40 0 230 450" className="w-full h-auto fill-current">
              <defs>
                <mask id="m-p"><rect x="-100" y="-100" width="500" height="600" fill="white"/><circle cx="60" cy="30" r="15" fill="black"/></mask>
                <mask id="m-o1"><rect x="-100" y="-100" width="500" height="600" fill="white"/><circle cx="145" cy="50" r="20" fill="black"/></mask>
                <mask id="m-r"><rect x="-100" y="-100" width="500" height="600" fill="white"/><circle cx="60" cy="140" r="15" fill="black"/></mask>
                <mask id="m-o2"><rect x="-100" y="-100" width="500" height="600" fill="white"/><circle cx="145" cy="270" r="20" fill="black"/></mask>
                <mask id="m-o3"><rect x="-100" y="-100" width="500" height="600" fill="white"/><ellipse cx="145" cy="360" rx="20" ry="13.5" fill="black"/></mask>
              </defs>
              <text x="-95" y="-15" transform="rotate(-90)" fill="currentColor" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="sans-serif">2026</text>
              <path d="M0,0L60,0A30,30,0,0,1,60,60L30,60L30,100L0,100Z" mask="url(#m-p)"/>
              <circle cx="145" cy="50" r="45" mask="url(#m-o1)"/>
              <path d="M0,110L60,110A30,30,0,0,1,60,170L30,170L30,210L0,210Z" mask="url(#m-r)"/>
              <path d="M30,170L60,170L90,210L60,210Z"/>
              <path d="M100,110L190,110L190,140L160,140L160,210L130,210L130,140L100,140Z"/>
              <path d="M0,220L90,220L90,250L30,250L30,265L75,265L75,290L30,290L30,320L0,320Z"/>
              <circle cx="145" cy="270" r="45" mask="url(#m-o2)"/>
              <path d="M0,330L30,330L30,400L190,400L190,430L0,430Z"/>
              <rect x="50" y="330" width="30" height="60"/>
              <ellipse cx="145" cy="360" rx="45" ry="30" mask="url(#m-o3)"/>
            </svg>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-tighter uppercase whitespace-pre-line leading-[1.05] text-[#1a1a1a] mt-6">
            <TextType
              text={['Victor\nCardoso']}
              typingSpeed={100}
              initialDelay={800}
              loop={false}
              showCursor
              cursorCharacter="_"
              cursorBlinkDuration={0.4}
            />
          </h1>
          <p className="mt-4 text-[11px] font-bold tracking-[0.28em] text-[#1a1a1a]/40 uppercase">
            selected works
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          PROJECT PANELS — each is absolute full-screen
          z: 30, 20, 10  (panel 0 covers panel 1 which covers panel 2)
      ════════════════════════════════════════════════════════════ */}
      {picked.map((project, j) => (
        <div
          key={project.id}
          ref={el => panelRefs.current[j] = el}
          className="absolute inset-0"
          style={{ zIndex: 30 - j * 10, backgroundColor: BG[j] }}
        >
          {/* Inner content: full-screen, never clips its own content */}
          <div className="absolute inset-0 flex flex-col">

            {/* ── Image (top 63%) ── */}
            <div className="relative overflow-hidden" style={{ height: '63%' }}>
              <div
                ref={el => imgRefs.current[j] = el}
                className="absolute inset-0"
                style={{ transformOrigin: 'center center' }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Subtle dark vignette at bottom of image */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* ── Info bar (bottom 37%) ── */}
            <div className="relative flex-1 flex flex-col justify-between px-8 md:px-14 py-8 md:py-10">

              {/* Meta row */}
              <div
                ref={el => metaRefs.current[j] = el}
                className="flex items-center gap-4 md:gap-10 text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a]/60"
                style={{ visibility: 'hidden' }}
              >
                <span className="border border-[#1a1a1a]/20 rounded-full px-4 py-1.5 bg-white/30 backdrop-blur-sm">
                  {project.year}
                </span>
                <span>{project.category}</span>
                <span className="hidden lg:block ml-auto font-normal tracking-wide text-right max-w-[240px] leading-relaxed">
                  {project.fullDescription.slice(0, 72)}…
                </span>
              </div>

              {/* Giant project title — only visible when panel is wide */}
              <div
                ref={el => titleRefs.current[j] = el}
                className="pointer-events-none select-none"
                style={{ visibility: 'hidden' }}
              >
                <h2
                  className="font-serif tracking-tighter leading-none text-[#1a1a1a] whitespace-nowrap"
                  style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
                >
                  {project.title}
                </h2>
              </div>

              {/* Bottom row */}
              <div className="flex items-end justify-between">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#1a1a1a]/40">
                  0{j + 1}
                </span>
                <Button
                  variant="default"
                  className="rounded-full w-14 h-14 md:w-[68px] md:h-[68px] p-0 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-xl"
                  onClick={() => setSelected(project)}
                >
                  <span className="sr-only">Ver projeto</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Button>
              </div>

            </div>
          </div>
        </div>
      ))}

      <ProjectModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        project={selected}
      />
    </section>
  );
}
