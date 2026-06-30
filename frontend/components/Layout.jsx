import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Menu, X, ArrowRight, MessageCircle, ChevronUp } from 'lucide-react';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Contacto', path: '/contact' }
  ];

  const isAdminPage = router.pathname.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <header className={`fixed top-0 left-0 w-full h-20 flex items-center z-[1000] transition-all duration-300 ${
        scrolled
          ? 'h-[68px] bg-white/95 backdrop-blur-md shadow-sm'
          : 'h-20 bg-[#0A0B0D]/80 backdrop-blur-sm'
      }`}>
        <div className="container-site flex justify-between items-center w-full">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-[#FF5A1F] flex items-center justify-center rotate-45">
              <span className="-rotate-45 text-white font-black text-lg">TL</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-extrabold tracking-wider leading-none transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>TECNOLIGHT</span>
              <span className={`text-[10px] uppercase tracking-widest font-semibold mt-0.5 transition-colors duration-300 ${scrolled ? 'text-gray-400' : 'text-white/50'}`}>Señalización Vial</span>
            </div>
          </div>

          <nav className="hidden md:block">
            <ul className="flex gap-8 list-none items-center">
              {navItems.map((item) => (
                <li key={item.path} className="relative">
                  <Link href={item.path} className={`font-medium text-sm transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded after:transition-all after:duration-300 ${
                    router.pathname === item.path
                      ? 'text-[#FF5A1F] after:w-full after:bg-[#FF5A1F]'
                      : scrolled
                        ? 'text-gray-600 hover:text-gray-900 after:w-0 hover:after:w-full after:bg-[#FF5A1F]'
                        : 'text-white/80 hover:text-white after:w-0 hover:after:w-full after:bg-[#FF5A1F]'
                  }`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden md:inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 hover:bg-[#E04E1A] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FF5A1F]/25">
              Cotizar <ArrowRight size={16} />
            </Link>
            <button className="md:hidden w-6 h-[18px] cursor-pointer z-[1100] relative" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu principal" aria-expanded={menuOpen}>
              {menuOpen ? <X size={24} color="#1A1A2E" /> : <Menu size={24} color={scrolled ? '#1A1A2E' : '#FFFFFF'} />}
            </button>
          </div>
        </div>
      </header>

      <ul className={`fixed top-0 ${menuOpen ? 'right-0' : '-right-full'} w-full h-screen bg-white flex flex-col justify-center items-center gap-10 z-[1050] transition-all duration-[0.4s] ease-in-out list-none`}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className={`text-2xl font-semibold transition-all duration-300 ${router.pathname === item.path ? 'text-[#FF5A1F] scale-110' : 'text-gray-700 hover:text-[#FF5A1F] hover:scale-110'}`}>
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#FF5A1F] text-white font-semibold px-6 py-3 rounded-lg text-base transition-all duration-300 hover:bg-[#E04E1A]">
            Cotizar Presupuesto <ArrowRight size={20} />
          </Link>
        </li>
      </ul>

      <main className="min-h-screen">{children}</main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-24 right-6 z-[900] w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            aria-label="Volver arriba"
          >
            <ChevronUp size={22} className="text-gray-600 group-hover:text-[#FF5A1F] transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/543424567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[900] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 group"
        aria-label="WhatsApp"
      >
        <MessageCircle size={30} className="text-white" />
      </a>

      <footer className="bg-gray-900 pt-20 pb-8">
        <div className="container-site grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-12 mb-16">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-10 h-10 bg-[#FF5A1F] flex items-center justify-center rotate-45">
                <span className="-rotate-45 text-white font-black text-lg">TL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-white leading-none">TECNOLIGHT</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-0.5">Señalización Vial</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Más de 30 años de experiencia fabricando señalización vial y cartelería de alta calidad.
              Guiando el tránsito de forma segura en todo el territorio argentino desde Santa Fe.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Enlaces</h3>
            <ul className="list-none flex flex-col gap-2.5">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-gray-400 text-sm transition-all duration-300 hover:text-white hover:pl-1">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Categorías</h3>
            <ul className="list-none flex flex-col gap-2.5">
              {['Reglamentarias', 'Preventivas', 'Informativas', 'Cartelería Comercial'].map((cat) => (
                <li key={cat}>
                  <Link href={`/catalog?category=${encodeURIComponent(cat)}`} className="text-gray-400 text-sm transition-all duration-300 hover:text-white hover:pl-1">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto</h3>
            <ul className="list-none flex flex-col gap-3.5">
              <li className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                <MapPin size={16} className="text-[#FF5A1F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-xs">Sede Comercial:</strong><br />
                  Salvador Caputto 3243, Santa Fe
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                <MapPin size={16} className="text-[#FF5A1F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-xs">Fábrica:</strong><br />
                  Cv Oeste, Santa Fe
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                <Phone size={16} className="text-[#FF5A1F] shrink-0 mt-0.5" />
                <span>+54 (342) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-site border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Tecnolight. Todos los derechos reservados. Santa Fe, Argentina.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com/tecnolight.srl" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 text-gray-400 transition-all duration-300 hover:bg-[#FF5A1F] hover:text-white hover:-translate-y-1" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
