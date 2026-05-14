/**
 * HeroPortfolio — Akaru-inspired Accordion
 *
 * Mechanism:
 *   - State 0 (landing): Hero = left 50vw | 3 project strips each = 50/3 vw
 *   - State 1-3 (scroll): Hero shrinks to 0, active project → ~88vw, others → 6vw
 *
 * Implementation:
 *   All panels are stacked with position:absolute and same dimensions (100vw × 100vh).
 *   GSAP animates `clip-path: inset(0 X% 0 0)` on each panel — a right-side clip.
 *   This means we only clip the right edge. The LEFT boundary of each panel is always 0.
 *
 *   Panel stack order (z-index):
 *     - Hero: z=40 (top of stack at start)
 *     - Panel 0: z=30
 *     - Panel 1: z=20
 *     - Panel 2: z=10 (bottom)
 *
 *   As scroll progresses:
 *     - We close (clip right) the hero, revealing Panel 0 underneath.
 *     - Then we close Panel 0's right side further, which — because Panel 1 is behind it
 *       but to the right — means Panel 1 peek.
 *
 *   Wait — this doesn't work for the accordion (multiple strips visible at once in state 0).
 *
 * REVISED Mechanism (correct for Akaru):
 *   Panels are positioned ABSOLUTELY, each shifted to their initial X position.
 *   Clip-path is used so we can reveal/hide cleanly. 
 *   We animate translateX (via GSAP `x` in px, computed from vw values) so content inside 
 *   doesn't shift — only the container moves. The content inside is counter-shifted (sticky).
 *
 * SIMPLEST correct approach that actually works smoothly:
 *   Use a full-width flex container (100vw total).
 *   Set `overflow: hidden` on the section.
 *   Animate panel widths with GSAP but use CSS `min-width` and `max-width` = `width` 
 *   so flex doesn't interfere. The key: set `will-change: width` and `overflow: hidden`
 *   on each panel so the browser GPU-accelerates the clip.
 *   Content inside each panel is `position:absolute; inset:0` so it never squishes.
 */

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { projects } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import Image from './ui/Image';
import TextType from './ui/TextType';
import { Button } from './ui/Button';
import ProjectModal from './ProjectModal';

// Akaru-inspired muted palette
const BG_COLORS = ['#B4C5D5', '#C6A4B3', '#8D9F8E'] as const;

// Widths in percentage of viewport width
const STRIP_VW   = 6;   // inactive strip width
const ACTIVE_VW  = 100 - (3 - 1) * STRIP_VW; // 88vw
const HERO_VW    = 50;  // initial hero width
const INITIAL_STRIP_VW = STRIP_VW; // each strip at rest = 50/3 ≈ 16.6, but we'll calc

const N = 3;

/* Build the [hero, p0, p1, p2] width-% array for a given scroll state */
function buildWidths(state: 0 | 1 | 2 | 3): number[] {
  if (state === 0) {
    const stripW = (100 - HERO_VW) / N; // ≈ 16.66
    return [HERO_VW, stripW, stripW, stripW];
  }
  const active = state - 1; // which project is active (0-indexed)
  const widths: number[] = [0]; // hero = 0
  for (let i = 0; i < N; i++) {
    widths.push(i === active ? ACTIVE_VW : STRIP_VW);
  }
  return widths; // [hero, p0, p1, p2]
}

export default function HeroPortfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sectionRef  = useRef<HTMLElement>(null);
  const heroRef     = useRef<HTMLDivElement>(null);
  const panelRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const selectedProjects = projects.slice(0, N);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── helpers ────────────────────────────────────────────────── */
      const vw = (pct: number) => `${pct}%`;

      /* ── initial layout ─────────────────────────────────────────── */
      const w0 = buildWidths(0);
      gsap.set(heroRef.current,   { width: vw(w0[0]) });
      panelRefs.current.forEach((el, j) => {
        gsap.set(el, { width: vw(w0[j + 1]) });
      });

      /* Images start zoomed in; titles start hidden */
      imageRefs.current.forEach(el => gsap.set(el, { scale: 1.2, transformOrigin: 'center center' }));
      titleRefs.current.forEach(el => gsap.set(el, { autoAlpha: 0, yPercent: 15 }));

      /* ── timeline ───────────────────────────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin:     true,
          scrub:   1,
          start:   'top top',
          end:     `+=${N * 900}`,
          invalidateOnRefresh: true,
        },
      });

      /* Animate between states 0→1, 1→2, 2→3 */
      for (let step = 1; step <= N; step++) {
        const w = buildWidths(step as 0 | 1 | 2 | 3);
        const active = step - 1; // 0-indexed
        const label  = `s${step}`;

        tl.addLabel(label, step - 1);

        /* Hero shrinks to 0 after first step */
        tl.to(heroRef.current, { width: vw(w[0]), ease: 'none' }, label);

        panelRefs.current.forEach((el, j) => {
          tl.to(el, { width: vw(w[j + 1]), ease: 'none' }, label);
        });

        /* Parallax zoom-out on active image */
        tl.to(imageRefs.current[active], { scale: 1, ease: 'none' }, label);
        /* Un-zoom previously active image */
        if (active > 0) {
          tl.to(imageRefs.current[active - 1], { scale: 1.15, ease: 'none' }, label);
        }

        /* Reveal title of active panel */
        tl.to(titleRefs.current[active], { autoAlpha: 1, yPercent: 0, ease: 'none' }, label);
        /* Hide previous title */
        if (active > 0) {
          tl.to(titleRefs.current[active - 1], { autoAlpha: 0, yPercent: -10, ease: 'none' }, label);
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#F5F0EA]"
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      {/* ─────────────────────────────────────────────────────────── */}
      {/*  HERO PANEL                                                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative h-full shrink-0 overflow-hidden bg-[#F5F0EA]"
        style={{ willChange: 'width' }}
      >
        {/* Content pinned inside the hero — never squishes */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-14 pt-28"
          style={{ width: `${HERO_VW}vw` }}
        >
          {/* PORTFOLIO wordmark */}
          <div className="w-full max-w-[200px] md:max-w-[240px] -ml-4 md:-ml-6 -mt-16 md:-mt-24 -mb-8 md:-mb-14">
            <svg viewBox="-40 0 230 450" className="w-full h-auto fill-current text-[#1a1a1a]">
              <defs>
                <mask id="hp"><rect x="-100" y="-100" width="500" height="600" fill="white"/><circle cx="60" cy="30" r="15" fill="black"/></mask>
                <mask id="ho1"><rect x="-100" y="-100" width="500" height="600" fill="white"/><circle cx="145" cy="50" r="20" fill="black"/></mask>
                <mask id="hr"><rect x="-100" y="-100" width="500" height="600" fill="white"/><circle cx="60" cy="140" r="15" fill="black"/></mask>
                <mask id="ho2"><rect x="-100" y="-100" width="500" height="600" fill="white"/><circle cx="145" cy="270" r="20" fill="black"/></mask>
                <mask id="ho3"><rect x="-100" y="-100" width="500" height="600" fill="white"/><ellipse cx="145" cy="360" rx="20" ry="13.5" fill="black"/></mask>
              </defs>
              <text x="-95" y="-15" transform="rotate(-90)" fill="currentColor" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="sans-serif">2026</text>
              <path d="M 0,0 L 60,0 A 30,30 0 0,1 60,60 L 30,60 L 30,100 L 0,100 Z" mask="url(#hp)"/>
              <circle cx="145" cy="50" r="45" mask="url(#ho1)"/>
              <path d="M 0,110 L 60,110 A 30,30 0 0,1 60,170 L 30,170 L 30,210 L 0,210 Z" mask="url(#hr)"/>
              <path d="M 30,170 L 60,170 L 90,210 L 60,210 Z"/>
              <path d="M 100,110 L 190,110 L 190,140 L 160,140 L 160,210 L 130,210 L 130,140 L 100,140 Z"/>
              <path d="M 0,220 L 90,220 L 90,250 L 30,250 L 30,265 L 75,265 L 75,290 L 30,290 L 30,320 L 0,320 Z"/>
              <circle cx="145" cy="270" r="45" mask="url(#ho2)"/>
              <path d="M 0,330 L 30,330 L 30,400 L 190,400 L 190,430 L 0,430 Z"/>
              <rect x="50" y="330" width="30" height="60"/>
              <ellipse cx="145" cy="360" rx="45" ry="30" mask="url(#ho3)"/>
            </svg>
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tighter uppercase whitespace-pre-line text-[#1a1a1a] leading-[1.05] mt-6 md:mt-8">
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
          <p className="mt-3 text-xs font-semibold tracking-[0.25em] text-[#1a1a1a]/50 uppercase">
            selected works
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  PROJECT PANELS                                             */}
      {/* ─────────────────────────────────────────────────────────── */}
      {selectedProjects.map((project, j) => (
        <div
          key={project.id}
          ref={el => panelRefs.current[j] = el}
          className="relative h-full shrink-0 overflow-hidden"
          style={{
            backgroundColor: BG_COLORS[j],
            willChange: 'width',
          }}
        >
          {/*
            Inner content is fixed to ACTIVE_VW wide so it never squishes.
            It's anchored to the left edge of the panel; as the panel expands
            leftward, the content comes into view naturally.
          */}
          <div
            className="absolute top-0 left-0 h-full flex flex-col"
            style={{ width: `${ACTIVE_VW}vw` }}
          >
            {/* Image (top ~65%) */}
            <div className="relative overflow-hidden" style={{ height: '62%' }}>
              <div
                ref={el => imageRefs.current[j] = el}
                className="absolute inset-0"
                style={{ transformOrigin: 'center center' }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info (bottom ~38%) */}
            <div className="relative flex-1 flex flex-col justify-between p-8 md:p-12">

              {/* Top meta row */}
              <div className="flex items-center gap-6 text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#1a1a1a]/70">
                <span className="border border-[#1a1a1a]/25 rounded-full px-4 py-1">{project.year}</span>
                <span>{project.category}</span>
                <span className="hidden md:block ml-auto text-right max-w-[220px] font-normal tracking-wide leading-relaxed">
                  {project.fullDescription.slice(0, 70)}…
                </span>
              </div>

              {/* Giant title — only visible when panel is expanded */}
              <div
                ref={el => titleRefs.current[j] = el}
                className="absolute inset-x-0 bottom-20 md:bottom-16 px-8 md:px-12 pointer-events-none"
                style={{ visibility: 'hidden' }}
              >
                <h2 className="text-[11vw] md:text-[9vw] leading-none tracking-tighter font-serif text-[#1a1a1a] whitespace-nowrap">
                  {project.title}
                </h2>
              </div>

              {/* Bottom row: number + CTA */}
              <div className="flex items-end justify-between relative z-10">
                <span className="text-xs font-bold tracking-[0.2em] text-[#1a1a1a]/50">
                  0{j + 1}
                </span>
                <Button
                  variant="default"
                  className="rounded-full w-14 h-14 md:w-[72px] md:h-[72px] flex items-center justify-center p-0 hover:scale-105 active:scale-95 transition-transform shadow-xl"
                  onClick={() => setSelectedProject(project)}
                >
                  <span className="sr-only">Ver projeto</span>
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Button>
              </div>

            </div>
          </div>

          {/* Minimal index label pinned to left edge when strip is thin */}
          <span className="absolute top-4 left-0 w-full text-center text-[9px] font-bold tracking-[0.2em] text-[#1a1a1a]/40 uppercase writing-vertical">
            {String(j + 1).padStart(2, '0')}
          </span>
        </div>
      ))}

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
}
