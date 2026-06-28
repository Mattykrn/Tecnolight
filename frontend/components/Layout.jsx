// ============================================================
// LAYOUT GLOBAL — header/footer naranja + navegación
// Envuelve todas las páginas del frontend (públicas)
// ============================================================
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Phone, MapPin, Menu, X, ArrowRight } from 'lucide-react';

export default function Layout({ children }) {
  // Estado: detecta scroll para encoger header / menú mobile
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [router.pathname]);

  // Items de navegación principal
  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Contacto', path: '/contact' }
  ];

  return (
    <div>
      <header className={`fixed top-0 left-0 w-full h-20 flex items-center z-[1000] transition-all duration-300 ${scrolled ? 'h-[70px] bg-[#FF5A1F] shadow-lg' : 'bg-[#FF5A1F]'}`}>
        <div className="container-site flex justify-between items-center w-full">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-white flex items-center justify-center rotate-45">
              <span className="-rotate-45 text-[#FF5A1F] font-black text-lg">TL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white leading-none">TECNOLIGHT</span>
              <span className="text-xs text-white/80 uppercase tracking-widest font-semibold mt-0.5">Señalización Vial</span>
            </div>
          </div>

          <nav>
            <ul className="hidden md:flex gap-8 list-none items-center">
              {navItems.map((item) => (
                <li key={item.path} className="relative">
                  <Link href={item.path} className={`font-semibold py-2 text-[15px] transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:bg-white after:rounded after:transition-all after:duration-300 ${router.pathname === item.path ? 'text-white after:w-full' : 'text-white/85 hover:text-white after:w-0 hover:after:w-full'}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/contact" className="hidden md:inline-flex items-center gap-2 bg-white text-[#FF5A1F] font-semibold px-5 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5">
              Cotizar <ArrowRight size={16} />
            </Link>
            <button className="md:hidden flex-col justify-between w-6 h-[18px] cursor-pointer z-[1100]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu principal" aria-expanded={menuOpen}>
              {menuOpen ? <X size={24} color="#FFF" /> : <Menu size={24} color="#FFF" />}
            </button>
          </div>
        </div>
      </header>

      <ul className={`fixed top-0 ${menuOpen ? 'right-0' : '-right-full'} w-full h-screen bg-[#FF5A1F] flex flex-col justify-center items-center gap-10 z-[1050] transition-all duration-[0.4s] ease-in-out list-none`}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className={`text-3xl font-semibold transition-all duration-300 ${router.pathname === item.path ? 'text-white scale-110' : 'text-white/60 hover:text-white hover:scale-110'}`}>
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#FF5A1F] font-semibold px-6 py-3 rounded-lg text-lg transition-all duration-300 hover:bg-white/90">
            Cotizar Presupuesto <ArrowRight size={20} />
          </Link>
        </li>
      </ul>

      <main className="min-h-[calc(100vh-80px)] pt-20">{children}</main>

      <footer className="bg-[#FF5A1F] pt-20 pb-8 mt-32">
        <div className="container-site grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-16 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-10 h-10 bg-white flex items-center justify-center rotate-45">
                <span className="-rotate-45 text-[#FF5A1F] font-black text-lg">TL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-white leading-none">TECNOLIGHT</span>
                <span className="text-xs text-white/80 uppercase tracking-widest font-semibold mt-0.5">Señalización Vial</span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
              Más de 30 años de experiencia fabricando señalización vial y cartelería de alta calidad.
              Guiando el tránsito de forma segura en todo el territorio argentino desde Santa Fe.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Enlaces</h3>
            <ul className="list-none flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-white/70 text-sm transition-all duration-300 hover:text-white hover:pl-1">{item.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/admin/login" className="text-white/70 text-sm transition-all duration-300 hover:text-white hover:pl-1 flex items-center gap-1">
                  Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Categorías</h3>
            <ul className="list-none flex flex-col gap-3">
              {['Reglamentarias', 'Preventivas', 'Informativas', 'Cartelería Comercial'].map((cat) => (
                <li key={cat}>
                  <Link href={`/catalog?category=${encodeURIComponent(cat)}`} className="text-white/70 text-sm transition-all duration-300 hover:text-white hover:pl-1">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto</h3>
            <ul className="list-none flex flex-col gap-4">
              <li className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                <MapPin size={18} className="text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Sede Comercial:</strong><br />
                  Salvador Caputto 3243, Santa Fe
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                <MapPin size={18} className="text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Fábrica:</strong><br />
                  Cv Oeste, Santa Fe
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                <Phone size={18} className="text-white shrink-0 mt-0.5" />
                <span>+54 (342) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-site border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-white/70 text-sm">
          <p>&copy; {new Date().getFullYear()} Tecnolight. Todos los derechos reservados. Santa Fe, Argentina.</p>
          <div className="flex gap-4">
            <a href="https://wa.me/543424567890" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 text-white transition-all duration-300 hover:bg-white hover:text-[#FF5A1F] hover:-translate-y-1" aria-label="WhatsApp">
              <Phone size={16} />
            </a>
            <a href="https://instagram.com/tecnolight.srl" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 text-white transition-all duration-300 hover:bg-white hover:text-[#FF5A1F] hover:-translate-y-1" aria-label="Instagram">
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
