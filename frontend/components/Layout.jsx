import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone, MapPin, MessageCircle, Shield, Instagram } from 'lucide-react';

import { getWaLink } from '../utils/whatsapp';

const WA_LINK = getWaLink();

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const LogoMark = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 1.5L18 6V14L10 18.5L2 14V6L10 1.5Z" stroke="white" strokeWidth="1.4" />
    <path d="M10 5V15M6 7.5L14 12.5M14 7.5L6 12.5" stroke="white" strokeWidth="1.1" />
  </svg>
);

const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Proyectos', href: '/projects' },
  { label: 'Nosotros', href: '/about' },
  { label: 'Contacto', href: '/contact' },
];

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  const isHome = router.pathname === '/';
  const isAtTop = !scrolled && isHome;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 bg-[#25D366] text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl hover:bg-[#1db954] transition-all hover:scale-105 active:scale-95"
        style={{ boxShadow: '0 6px 28px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.4)' }}
      >
        <WaIcon size={19} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0C12]/96 backdrop-blur-xl border-b border-white/6 shadow-xl shadow-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-site mx-auto px-5 lg:px-10 flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary rounded-[4px] flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
              <LogoMark />
            </div>
            <div className="leading-none">
              <div className="text-white tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1rem' }}>
                TECNOLIGHT SRL
              </div>
              <div className="text-primary tracking-[0.18em] uppercase font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem' }}>
                ILUMINACIÓN Y MATERIALES ELÉCTRICOS
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[13px] font-medium transition-colors tracking-wide ${router.pathname === l.href || (l.href === '/' && router.pathname === '/') ? 'text-primary' : 'text-white/50 hover:text-primary'}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white text-[13px] font-semibold px-4 py-2.5 rounded-[4px] transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <WaIcon size={13} /> Presupuesto
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white/70 hover:text-white p-1.5" aria-label="Menú">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/6 bg-[#0A0C12]/98 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-5 pt-2 pb-6 flex flex-col">
                {NAV.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-left py-3.5 text-white/55 border-b border-white/5 last:border-0 hover:text-primary transition-colors text-sm font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {l.label}
                  </Link>
                ))}
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-bold py-3.5 rounded-[4px] text-sm"
                >
                  <WaIcon size={16} /> Solicitar presupuesto
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="min-h-screen">{children}</main>

      <footer className="bg-[#080A0F] border-t border-white/5 py-14 lg:py-16">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-primary rounded-[4px] flex items-center justify-center flex-shrink-0">
                  <LogoMark />
                </div>
                <div>
                  <div className="text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1rem' }}>TECNOLIGHT SRL</div>
                  <div className="text-primary" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.18em' }}>ILUMINACIÓN Y MATERIALES ELÉCTRICOS</div>
                </div>
              </div>
              <p className="text-white/28 text-sm leading-relaxed max-w-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Tecnolight S.R.L. — Iluminación y Materiales Eléctricos | Desde 1994. Referentes consolidados en Santa Fe Capital.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366]/12 border border-[#25D366]/20 text-[#25D366] text-xs font-semibold px-4 py-2.5 rounded-[4px] hover:bg-[#25D366]/20 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <WaIcon size={13} /> Contactar por WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/tecnolight.srl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#E1306C]/12 border border-[#E1306C]/20 text-[#E1306C] text-xs font-semibold px-4 py-2.5 rounded-[4px] hover:bg-[#E1306C]/20 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Instagram size={13} /> Seguinos en Instagram
                </a>
              </div>
            </div>

            <div className="lg:col-span-3 lg:col-start-7">
              <div className="text-white/20 text-[10px] uppercase tracking-widest mb-5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Servicios</div>
              <div className="space-y-3">
                {['Iluminación Residencial', 'Iluminación Industrial', 'Materiales Eléctricos', 'Proyectos Lumínicos', 'Atención Especializada'].map(s => (
                  <div key={s} className="text-white/35 text-sm hover:text-primary transition-colors cursor-default" style={{ fontFamily: "'Inter', sans-serif" }}>{s}</div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="text-white/20 text-[10px] uppercase tracking-widest mb-5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Empresa</div>
              <div className="space-y-3">
                {[
                  { label: 'Proyectos', href: '/projects' },
                  { label: 'Nosotros', href: '/about' },
                  { label: 'Contacto', href: '/contact' },
                ].map(s => (
                  <Link key={s.label} href={s.href} className="block text-white/35 text-sm hover:text-primary transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>{s.label}</Link>
                ))}
                <a href="https://www.instagram.com/tecnolight.srl" target="_blank" rel="noopener noreferrer"
                  className="block text-white/35 text-sm hover:text-primary transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  @tecnolight.srl
                </a>
              </div>
            </div>
          </div>

          <div className="pt-7 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-white/18 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              &copy; 2026 Tecnolight S.R.L. &mdash; Iluminación y Materiales Eléctricos | Desde 1994. Todos los derechos reservados.
            </div>
            <div className="text-white/18 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Rosario &middot; Santa Fe &middot; Argentina</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
