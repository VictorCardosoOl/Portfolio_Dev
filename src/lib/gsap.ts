/**
 * gsap.ts — Ponto único de inicialização do GSAP
 * ─────────────────────────────────────────────
 * Importe gsap e ScrollTrigger SOMENTE deste arquivo.
 * Isso garante que gsap.registerPlugin é chamado uma única vez,
 * evitando registros duplicados em múltiplos componentes.
 *
 * Uso: import { gsap, ScrollTrigger } from '../lib/gsap';
 */

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
