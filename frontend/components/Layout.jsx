import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ArrowRight } from 'lucide-react';
import { getWaLink } from '../utils/whatsapp';

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// ─── Enlaces completos y verificados del menú lateral ────────────────────────
const SECCIONES_MENU = [
  { label: 'Inicio', href: '/' },
  { label: 'Catálogo de Productos (EPP y Alquiler)', href: '/catalogo' },
  { label: 'Alquiler de Vallas y Dispositivos Viales', href: '/#servicios' },
  { label: 'Seguridad Industrial y EPP', href: '/#seguridad' },
  { label: 'Fabricación y Señalización Vial', href: '/#fabricacion' },
  { label: 'Planta y Tecnología TrafficJet™', href: '/#planta' },
  { label: 'Quiénes Somos (Historia y Empresa)', href: '/about' },
  { label: 'Obras y Proyectos Realizados', href: '/projects' },
  { label: 'Contacto y Sedes (Santa Fe / Rosario)', href: '/contact' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Cierre con Escape y gestión de scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Manejador de navegación para anclas y páginas
  const handleNavClick = (e, href) => {
    setMenuOpen(false);
    document.body.style.overflow = '';

    if (href.startsWith('/#')) {
      const hash = href.replace('/#', '');
      if (router.pathname === '/') {
        e.preventDefault();
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', `/#${hash}`);
          }
        }, 80);
      }
    }
  };

  // Scroll suave al llegar a la página principal con un hash desde otra página
  useEffect(() => {
    if (router.pathname === '/' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [router.asPath, router.pathname]);

  const waLink = getWaLink();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Botón flotante de WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] text-white font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl hover:bg-[#1db954] transition-all hover:scale-105 active:scale-95"
        style={{ boxShadow: '0 6px 28px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.4)' }}
      >
        <WaIcon size={22} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* Header Institucional: ÚNICAMENTE Logo a la izquierda y Botón Hamburguesa a la derecha */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#0f1117] border-b border-white/8 shadow-md" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.5)' }}>
        <div className="header-brand-line" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
          {/* Logo institucional */}
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02] shrink-0">
            <Image
              src="/images/logo-tecnolight-white.png"
              alt="Tecno Light S.R.L."
              width={160}
              height={48}
              priority
              style={{ width: 'auto', height: '40px' }}
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] font-medium tracking-wider text-white/40 brand-tagline">
                Seguridad vial e industrial
              </span>
            </div>
          </Link>

          {/* Extremo derecho: Botón hamburguesa único para abrir el menú */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2.5 text-white px-4 py-2 rounded-lg bg-white/8 hover:bg-white/15 transition-all border border-white/15 cursor-pointer shadow-sm hover:border-[#FF5A1F]/50 group"
              aria-label="Abrir Menú de Navegación"
            >
              <Menu size={20} className="text-[#FF5A1F] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-200 group-hover:text-white">Menú</span>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-[60] transition-opacity duration-200 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer lateral anclado a la derecha */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[70] bg-[#111318] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-200 ease-out will-change-transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        aria-label="Menú de Navegación"
      >
        {/* Encabezado del menú con botón de cierre */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.6)]" />
            <span className="text-white font-black text-sm tracking-widest uppercase" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Navegación
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar Menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de enlaces del menú lateral */}
        <nav className="flex flex-col py-4 px-3 overflow-y-auto flex-1 space-y-1">
          {SECCIONES_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-center justify-between px-3.5 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium group border border-transparent hover:border-white/5"
            >
              <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
              <ArrowRight size={14} className="text-slate-600 group-hover:text-[#FF5A1F] transition-colors shrink-0" />
            </Link>
          ))}
        </nav>

        {/* Footer simple del drawer */}
        <div className="p-4 border-t border-white/8 bg-[#0c0e13] shrink-0 text-xs text-slate-400">
          <div className="font-semibold text-slate-200 mb-1">Tecno Light S.R.L.</div>
          <div className="text-[11px] text-slate-400">Santa Fe: (0342) 455-3582</div>
          <div className="text-[11px] text-slate-400">Rosario: (0341) 438-8444</div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="min-h-screen overflow-x-hidden">
        {children}
      </main>

      {/* Footer Institucional */}
      <footer className="section-ig-card border-t border-white/5 py-14 lg:py-16">
        <div className="corner-brand-glow" />
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
            {/* Col 1: Identidad */}
            <div className="lg:col-span-4 flex flex-col items-start">
              <div className="mb-6">
                <Image
                  src="/images/logo-tecnolight.png"
                  alt="Tecno Light S.R.L."
                  width={160}
                  height={48}
                  loading="lazy"
                  style={{ width: 'auto', height: '44px' }}
                />
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-8" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Señalización &amp; Protección Personal. Fabricación y venta de seguridad para el obrero (EPP) y alquiler de equipamiento de seguridad vial. Lunes a Viernes de 8:00 a 17:00 hs.
              </p>
              <div className="flex flex-col items-start gap-2.5 mb-8">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Aval oficial y convertidor certificado:
                </span>
                <div className="bg-white/95 rounded-lg px-3.5 py-2 flex items-center gap-3.5 shadow-md border border-white/20">
                  <img src="/images/avery-dennison-official.svg" alt="Avery Dennison" className="h-6 w-auto object-contain" />
                  <div className="h-5 w-px bg-slate-200" />
                  <img src="/images/trafficjet-xpress-official.svg" alt="TrafficJet™ Xpress" className="h-5 w-auto object-contain" />
                </div>
              </div>
              <a
                href="https://www.instagram.com/tecnolight.srl/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-[#E1306C]/10 border border-[#E1306C]/20 text-[#E1306C] rounded-full hover:bg-[#E1306C] hover:text-white transition-all mt-auto"
                aria-label="Instagram Oficial"
              >
                <InstagramIcon size={18} />
              </a>
            </div>

            {/* Col 2 & 3: Sedes */}
            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-8 lg:gap-4 xl:gap-8">
              <div className="flex flex-col space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wide uppercase border-b border-white/10 pb-2 inline-block max-w-max">
                  Sede Central Santa Fe
                </h4>
                <div className="flex flex-col gap-2 text-slate-300 text-sm leading-relaxed">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Suipacha+3243,+Santa+Fe,+Argentina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF5A1F] transition-colors block"
                  >
                    Suipacha 3243<br />Santa Fe Capital
                  </a>
                  <a href="tel:03424553582" className="hover:text-[#FF5A1F] transition-colors flex items-center gap-1.5 group">
                    <span className="font-semibold text-slate-400 group-hover:text-[#FF5A1F]/70 transition-colors">Tel/Fax:</span> (0342) 455-3582
                  </a>
                  <a href="mailto:tecnolightsrl.rosario@gmail.com" className="hover:text-[#FF5A1F] transition-colors text-[13.5px]">
                    tecnolightsrl.rosario@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wide uppercase border-b border-white/10 pb-2 inline-block max-w-max">
                  Sede Rosario
                </h4>
                <div className="flex flex-col gap-2 text-slate-300 text-sm leading-relaxed">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Fuhr+1281,+Rosario,+Santa+Fe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF5A1F] transition-colors block"
                  >
                    Fuhr 1281<br />Rosario, Santa Fe
                  </a>
                  <a href="tel:03414388444" className="hover:text-[#FF5A1F] transition-colors flex items-center gap-1.5 group">
                    <span className="font-semibold text-slate-400 group-hover:text-[#FF5A1F]/70 transition-colors">Tel/Fax:</span> (0341) 438-8444
                  </a>
                  <a href="mailto:tecnolightsrl.rosario@gmail.com" className="hover:text-[#FF5A1F] transition-colors text-[13.5px]">
                    tecnolightsrl.rosario@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Col 4: Navegación Institucional */}
            <div className="lg:col-span-3 flex flex-col lg:items-end">
              <h4 className="text-white font-bold text-[13px] tracking-wide uppercase mb-4 lg:text-right">
                Navegación Institucional
              </h4>
              <nav className="flex flex-col gap-2.5 lg:items-end">
                {SECCIONES_MENU.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-slate-400 text-sm hover:text-[#FF5A1F] transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-7 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-white/30 text-xs" style={{ fontFamily: "'Roboto', sans-serif" }}>
              © {new Date().getFullYear()} Tecno Light S.R.L. — CUIT: 30-69238932-4 | Todos los derechos reservados.
            </div>
            <div className="text-white/30 text-xs" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Santa Fe · Rosario · Argentina
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
