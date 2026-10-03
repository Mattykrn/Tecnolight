import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Phone, Mail, ExternalLink } from 'lucide-react';
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

const NAV_LINKS = [
  { label: 'Inicio', href: '/#inicio', category: 'General' },
  { label: 'Quiénes Somos', href: '/#nosotros', category: 'Empresa' },
  { label: 'Tecnología & Avery Dennison', href: '/#tecnologia', category: 'Empresa' },
  { label: 'Proceso Industrial de Fabricación', href: '/#proceso', category: 'Empresa' },
  { label: 'Cartelería y Señalización Vial', href: '/#catalogo', category: 'Divisiones' },
  { label: 'Seguridad Industrial & EPP', href: '/#seguridad', category: 'Divisiones' },
  { label: 'Alquiler de Vallas & Equipos', href: '/#alquiler-vallas', category: 'Divisiones' },
  { label: 'Sedes & Contacto', href: '/#contacto', category: 'Atención' },
  { label: 'Catálogo de Productos', href: '/catalogo', category: 'Atención' },
];

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  // Bloqueo de scroll cuando el drawer está abierto en móviles/desktop
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (menuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (router.pathname === '/') {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const headerOffset = 68;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 50);
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  const waLink = getWaLink();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {/* Botón flotante de WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-5 z-40 flex items-center gap-2.5 bg-[#25D366] text-white font-bold text-sm px-4 sm:px-5 py-3 sm:py-3.5 rounded-full shadow-2xl hover:bg-[#1db954] transition-all hover:scale-105 active:scale-95"
        style={{ boxShadow: '0 6px 28px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.4)' }}
      >
        <WaIcon size={22} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {/* Header Compacto y Reducido (h-14 en móvil, h-16 en desktop) */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#0D0F14]/98 shadow-xl border-b border-white/10' : 'bg-[#0D0F14]/90 backdrop-blur-md border-b border-white/5'
        }`}
        style={{ height: '58px' }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo Corporativo */}
          <Link href="/#inicio" className="flex items-center gap-3 group" onClick={(e) => handleNavClick(e, '/#inicio')}>
            <Image
              src="/images/logo-tecnolight-white.png"
              alt="Tecno Light S.R.L."
              width={140}
              height={34}
              priority
              style={{ width: 'auto', height: '28px' }}
              className="sm:h-[32px]"
            />
            <span className="hidden xl:inline-block border-l border-white/15 pl-3 text-[10px] uppercase tracking-widest text-slate-400 font-medium">
              Seguridad Vial e Industrial
            </span>
          </Link>

          {/* Acciones Rápidas y Botón de Menú Hamburguesa */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/tecnolight.srl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Tecno Light"
              className="text-slate-400 hover:text-[#E1306C] p-2 transition-colors flex items-center justify-center rounded-lg hover:bg-white/5"
              title="Instagram @tecnolight.srl"
            >
              <InstagramIcon size={18} />
            </a>

            {/* Presupuesto Directo */}
            <a
              href="/#contacto"
              onClick={(e) => handleNavClick(e, '/#contacto')}
              className="hidden sm:inline-flex items-center justify-center bg-[#FF5A1F] hover:bg-[#e54e18] text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all shadow-md shadow-[#FF5A1F]/20"
            >
              Presupuesto
            </a>

            {/* Botón Menú Hamburguesa Principal (Siempre visible y funcional) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-[#FF5A1F] text-slate-200 hover:text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg border border-slate-700 hover:border-[#FF5A1F] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm group active:scale-95"
              aria-label="Abrir Menú de Navegación"
            >
              <Menu size={18} className="group-hover:rotate-90 transition-transform duration-200" />
              <span className="font-bold">Menú</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú Drawer Universal y Responsivo (Montado fuera de <header> con z-[9999] para evitar recortes en celulares) */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[9999] flex justify-end">
            {/* Overlay oscurecedor con backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Panel Lateral Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="relative w-full max-w-sm sm:max-w-md h-full bg-[#0D0F14] text-white shadow-2xl flex flex-col z-10 border-l border-white/10 overflow-hidden"
            >
              {/* Encabezado del Menú Drawer */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#090C12]">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo-tecnolight-white.png"
                    alt="TECNO LIGHT S.R.L."
                    width={130}
                    height={30}
                    style={{ width: 'auto', height: '24px' }}
                  />
                  <div className="border-l border-white/15 pl-2.5">
                    <span className="text-[10px] font-bold text-[#FF5A1F] uppercase tracking-widest block leading-tight">Navegación</span>
                    <span className="text-[10px] text-slate-400 font-medium block leading-tight">Sitio Oficial</span>
                  </div>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full"
                  aria-label="Cerrar Menú"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Lista de Enlaces con Secciones Claras y Táctiles para Móviles */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                  Secciones del Sitio
                </div>

                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center justify-between px-3.5 py-3 text-slate-200 hover:text-white hover:bg-white/5 rounded-xl border border-transparent hover:border-slate-800 transition-all text-sm font-medium group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] opacity-70 group-hover:scale-125 transition-transform" />
                      <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-500 group-hover:text-[#FF5A1F] group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}

                {/* Sello Oficial Avery Dennison dentro del Drawer */}
                <div className="pt-4 pb-2 px-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-2">
                      Convertidor Certificado:
                    </span>
                    <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg">
                      <img
                        src="/images/avery-dennison-official.svg"
                        alt="Avery Dennison"
                        className="h-5 w-auto object-contain"
                      />
                      <div className="h-4 w-px bg-slate-300" />
                      <img
                        src="/images/trafficjet-xpress-official.svg"
                        alt="TrafficJet™ Xpress"
                        className="h-4 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pie del Drawer con Contacto Corporativo */}
              <div className="p-4 border-t border-white/10 bg-[#090C12] space-y-2.5">
                <a
                  href="mailto:tecnolightsrl@arnet.com.ar"
                  className="w-full flex items-center justify-center gap-2 bg-[#FF5A1F] hover:bg-[#e54e18] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-all shadow-md shadow-[#FF5A1F]/20"
                >
                  <Mail size={16} />
                  <span>tecnolightsrl@arnet.com.ar</span>
                </a>
                <div className="flex flex-col gap-1 text-[11px] text-slate-400 pt-1 px-1 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span>Sede Comercial Santa Fe:</span>
                    <a href="tel:03424553582" className="text-slate-300 hover:text-[#FF5A1F] font-medium">(0342) 455-3582</a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sucursal Rosario:</span>
                    <a href="tel:03414388444" className="text-slate-300 hover:text-[#FF5A1F] font-medium">(0341) 438-8444</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="min-h-screen overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="section-ig-card border-t border-white/5 py-14 lg:py-16">
        <div className="corner-brand-glow" />
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
            {/* Col 1 */}
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
                Señalización &amp; Protección Personal. Referentes en seguridad vial, demarcación horizontal y seguridad industrial. Lunes a Viernes de 8:00 a 17:00 hs.
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
                  Sede Comercial Santa Fe
                </h4>
                <div className="flex flex-col gap-2 text-slate-300 text-sm leading-relaxed">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Suipacha+3243,+Santa+Fe,+Argentina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors block"
                  >
                    Suipacha 3243<br />Santa Fe Capital
                  </a>
                  <a href="tel:03424553582" className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <span className="font-semibold text-slate-400 group-hover:text-primary/70 transition-colors">Tel/Fax:</span> (0342) 455-3582
                  </a>
                  <a href="mailto:tecnolightsrl@arnet.com.ar" className="hover:text-primary transition-colors text-[13.5px]">
                    tecnolightsrl@arnet.com.ar
                  </a>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wide uppercase border-b border-white/10 pb-2 inline-block max-w-max">
                  Sucursal Rosario
                </h4>
                <div className="flex flex-col gap-2 text-slate-300 text-sm leading-relaxed">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Gutenberg+1122,+Rosario,+Santa+Fe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors block"
                  >
                    Gutenberg 1122<br />Rosario, Santa Fe
                  </a>
                  <a href="tel:03414388444" className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <span className="font-semibold text-slate-400 group-hover:text-primary/70 transition-colors">Tel/Fax:</span> (0341) 438-8444
                  </a>
                  <a href="mailto:tecnolightrsr@arnet.com.ar" className="hover:text-primary transition-colors text-[13.5px]">
                    tecnolightrsr@arnet.com.ar
                  </a>
                </div>
              </div>
            </div>

            {/* Col 4: Digital & Nav */}
            <div className="lg:col-span-3 flex flex-col lg:items-end">
              <h4 className="text-white font-bold text-[13px] tracking-wide uppercase mb-4 lg:text-right">
                Atención Corporativa &amp; Pliegos
              </h4>
              <a
                href="mailto:tecnolightsrl@arnet.com.ar"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#FF5A1F] hover:border-[#FF5A1F] transition-all w-full sm:w-auto lg:w-full max-w-[240px] mb-8 uppercase tracking-wider"
              >
                <Mail size={15} />
                Enviar Pliego por Email
              </a>
              <div className="text-white/20 text-[10px] uppercase tracking-widest mb-3 mt-auto" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Navegación
              </div>
              <nav className="flex flex-col gap-2.5 lg:items-end">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-slate-400 text-sm hover:text-orange-500 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-7 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-white/20 text-xs" style={{ fontFamily: "'Roboto', sans-serif" }}>
              © {new Date().getFullYear()} Tecno Light S.R.L. — CUIT: 30-69238932-4 | Todos los derechos reservados.
            </div>
            <div className="text-white/20 text-xs" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Santa Fe Capital · Sucursal Rosario · Argentina
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
