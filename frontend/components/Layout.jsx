import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { getWaLink } from '../utils/whatsapp';

const WA_LINK = getWaLink();

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const NAV = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Catálogo', href: '/#catalogo' },
  { label: 'Servicios y Alquiler', href: '/#servicios' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];

const FOOTER_NAV = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Catálogo de Productos', href: '/#catalogo' },
  { label: 'Señalización Vial', href: '/#senalizacion' },
  { label: 'Servicios y Alquiler', href: '/#servicios' },
  { label: 'Instalación y Montaje', href: '/#instalacion' },
  { label: 'Planta y Tecnología', href: '/#infraestructura' },
  { label: 'Quiénes Somos', href: '/#nosotros' },
  { label: 'Contacto y Sedes', href: '/#contacto' },
];

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      const hash = href.replace('/#', '');
      if (router.pathname === '/') {
        e.preventDefault();
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.replaceState(null, '', `/#${hash}`);
          }
        }, 80);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>

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

      {/* Header fijo: logo a la izquierda y menú hamburguesa a la derecha */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/8 transition-colors duration-300 ${
          scrolled ? 'bg-[#0A0C12]/95 backdrop-blur-xl shadow-lg shadow-black/40' : 'bg-[#0A0C12]'
        }`}
      >
        <div className="max-w-site mx-auto px-5 lg:px-10 flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center transition-transform hover:scale-[1.02]">
            <span className="text-lg lg:text-xl font-extrabold tracking-wider text-white leading-none">
              TECNO <span className="text-primary">LIGHT</span> <span className="text-white/50 text-sm font-bold">SRL</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navegación principal">
              {NAV.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 text-white/80 hover:text-white px-3 py-2 rounded-lg border border-white/10 hover:border-primary/40 hover:bg-white/5 transition-all"
              aria-label="Abrir menú de navegación"
              aria-expanded={menuOpen}
            >
              <Menu size={22} className="text-primary" />
              <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-widest">Menú</span>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop del menú */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer lateral derecho */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.28 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[70] bg-[#0D0F15] border-l border-white/10 shadow-2xl flex flex-col"
            aria-label="Menú de navegación"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,90,31,0.6)]" />
                <span className="text-white font-black text-sm tracking-widest uppercase" style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Navegación
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col py-4 px-3 overflow-y-auto flex-1 space-y-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium group border border-transparent hover:border-white/5"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                  <span className="text-primary/70 text-xs">›</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-white/8 bg-[#0B0D12] shrink-0 text-xs text-slate-400">
              <div className="font-semibold text-slate-200 mb-1">Tecno Light S.R.L.</div>
              <div className="text-[11px] text-slate-400">Rosario: 341 636 9053</div>
              <div className="text-[11px] text-slate-400">Santa Fe: (0342) 455-3582</div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <footer className="section-ig-card border-t border-white/5 py-14 lg:py-16">
        <div className="corner-brand-glow"></div>
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
            <div className="lg:col-span-4 flex flex-col items-start">
              <div className="mb-6">
                <img
                  src="/images/logo-tecnolight.png"
                  alt="Tecno Light S.R.L."
                  className="h-11 w-auto object-contain"
                />
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-8" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Señalización &amp; Protección Personal. Lunes a Viernes de 8:00 a 17:00 hs. (Sábados Cerrado).
              </p>
              <div className="flex flex-col items-start gap-2.5 mb-8">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Tecnología de impresión:</span>
                <div className="bg-white/95 rounded-lg px-3.5 py-2 flex items-center gap-3.5 shadow-md border border-white/20">
                  <img src="/images/avery-dennison-official.svg" alt="Avery Dennison" className="h-6 w-auto object-contain" />
                  <div className="h-5 w-px bg-slate-200" />
                  <img src="/images/trafficjet-xpress-official.svg" alt="TrafficJet™ Xpress" className="h-5 w-auto object-contain" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-8 lg:gap-4 xl:gap-8">
              <div className="flex flex-col space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wide uppercase border-b border-white/10 pb-2 inline-block max-w-max">Sede Comercial Santa Fe</h4>
                <div className="flex flex-col gap-2 text-slate-300 text-sm leading-relaxed">
                  <a href="https://www.google.com/maps/search/?api=1&query=Suipacha+3248,+Santa+Fe,+Argentina" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">Suipacha 3248<br />Santa Fe Capital</a>
                  <a href="tel:03424553582" className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <span className="font-semibold text-slate-400 group-hover:text-primary/70 transition-colors">Tel/Fax:</span> (0342) 455-3582
                  </a>
                  <a href="mailto:tecnolightsrl@tecnolightsrl.com" className="hover:text-primary transition-colors text-[13.5px]">tecnolightsrl@tecnolightsrl.com</a>
                  <a href="https://www.google.com/maps/search/?api=1&query=Cnel.+Loza+7198,+Santa+Fe,+Argentina" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">Planta (solo fabricación): Cnel. Loza 7198<br />P.I. Los Polígonos</a>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wide uppercase border-b border-white/10 pb-2 inline-block max-w-max">Sede Operativa Rosario</h4>
                <div className="flex flex-col gap-2 text-slate-300 text-sm leading-relaxed">
                  <a href="https://www.google.com/maps/search/?api=1&query=Fuhr+1282,+Rosario,+Santa+Fe" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block">Fuhr 1282<br />Rosario, Santa Fe</a>
                  <a href="tel:3416369053" className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <span className="font-semibold text-slate-400 group-hover:text-primary/70 transition-colors">Tel:</span> 341 636 9053
                  </a>
                  <a href="mailto:rosario@tecnolightsrl.com" className="hover:text-primary transition-colors text-[13.5px]">rosario@tecnolightsrl.com</a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col lg:items-end">
              <h4 className="text-white font-bold text-[13px] tracking-wide uppercase mb-4 lg:text-right">Navegación Institucional</h4>
              <nav className="flex flex-col gap-2.5 lg:items-end">
                {FOOTER_NAV.map((item) => (
                  <Link key={item.label} href={item.href} className="text-slate-400 text-sm hover:text-primary transition-colors font-medium">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="pt-7 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-white/20 text-xs" style={{ fontFamily: "'Roboto', sans-serif" }}>
              &copy; 2026 Tecno Light S.R.L. &mdash; CUIT: 30-69238932-4 | Todos los derechos reservados.
            </div>
            <div className="text-white/20 text-xs" style={{ fontFamily: "'Roboto', sans-serif" }}>Rosario &middot; Santa Fe &middot; Argentina</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
