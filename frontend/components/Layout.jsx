import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Phone, Mail, MapPin, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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

  return (
    <div>
      <header className={`fixed top-0 left-0 w-full h-20 flex items-center z-[1000] transition-all duration-300 ${scrolled ? 'h-[70px] bg-[rgba(18,20,28,0.75)] backdrop-blur-[12px] border-b border-[#232735] shadow-premium' : 'bg-transparent border-b border-transparent'}`}>
        <div className="container-site flex justify-between items-center w-full">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-primary flex items-center justify-center rotate-45 shadow-[0_0_10px_rgba(255,183,3,0.3)]">
              <span className="-rotate-45 text-black font-black text-lg">TL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-text-main leading-none">TECNOLIGHT</span>
              <span className="text-xs text-primary uppercase tracking-widest font-semibold mt-0.5">Señalización Vial</span>
            </div>
          </div>

          <nav>
            <ul className="hidden md:flex gap-10 list-none items-center">
              {navItems.map((item) => (
                <li key={item.path} className="relative">
                  <Link href={item.path} className={`text-text-muted font-medium py-2 text-base transition-all duration-300 hover:text-text-main relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${router.pathname === item.path ? 'text-text-main after:w-full' : 'after:w-0 hover:after:w-full'}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/contact" className="hidden md:inline-flex btn-primary !py-2 !px-5 !text-sm">
              Cotizar <ArrowRight size={16} />
            </Link>
            <button className="md:hidden flex-col justify-between w-6 h-[18px] cursor-pointer z-[1100]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu principal" aria-expanded={menuOpen}>
              {menuOpen ? <X size={24} color="#FFF" /> : <Menu size={24} color="#FFF" />}
            </button>
          </div>
        </div>
      </header>

      <ul className={`fixed top-0 ${menuOpen ? 'right-0' : '-right-full'} w-full h-screen bg-[rgba(10,11,13,0.98)] backdrop-blur-[20px] flex flex-col justify-center items-center gap-10 z-[1050] transition-all duration-[0.4s] ease-in-out list-none`}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className={`text-2xl font-semibold transition-all duration-300 ${router.pathname === item.path ? 'text-primary scale-110' : 'text-text-muted hover:text-primary hover:scale-110'}`}>
              {item.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" className="btn-primary" style={{ marginTop: '1rem' }}>
            Cotizar Presupuesto <ArrowRight size={18} />
          </Link>
        </li>
      </ul>

      <main className="min-h-[calc(100vh-80px)] pt-20">{children}</main>

      <footer className="bg-bg-dark border-t border-border pt-20 pb-8 mt-32">
        <div className="container-site grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-16 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-10 h-10 bg-primary flex items-center justify-center rotate-45 shadow-[0_0_10px_rgba(255,183,3,0.3)]">
                <span className="-rotate-45 text-black font-black text-lg">TL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-text-main leading-none">TECNOLIGHT</span>
                <span className="text-xs text-primary uppercase tracking-widest font-semibold mt-0.5">Señalización Vial</span>
              </div>
            </div>
            <p className="text-text-muted leading-relaxed text-sm">
              Más de 30 años de experiencia fabricando señalización vial y cartelería de alta calidad. 
              Guiando el tránsito de forma segura en todo el territorio argentino desde Santa Fe.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-base font-semibold text-text-main uppercase tracking-wider">Enlaces</h3>
            <ul className="list-none flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-text-muted text-sm transition-all duration-300 hover:text-primary hover:pl-1">{item.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/admin/login" className="text-text-muted text-sm transition-all duration-300 hover:text-primary hover:pl-1 flex items-center gap-1">
                  <ShieldCheck size={14} /> Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-base font-semibold text-text-main uppercase tracking-wider">Categorías</h3>
            <ul className="list-none flex flex-col gap-3">
              {['Reglamentarias', 'Preventivas', 'Informativas', 'Cartelería Comercial'].map((cat) => (
                <li key={cat}>
                  <Link href={`/catalog?category=${encodeURIComponent(cat)}`} className="text-text-muted text-sm transition-all duration-300 hover:text-primary hover:pl-1">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-base font-semibold text-text-main uppercase tracking-wider">Contacto</h3>
            <ul className="list-none flex flex-col gap-4">
              <li className="flex items-start gap-3 text-text-muted text-sm leading-relaxed">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Bv. Pellegrini 3100,<br />Santa Fe, S3000, Argentina</span>
              </li>
              <li className="flex items-start gap-3 text-text-muted text-sm leading-relaxed">
                <Phone size={18} className="text-primary shrink-0 mt-0.5" />
                <span>+54 (342) 456-7890</span>
              </li>
              <li className="flex items-start gap-3 text-text-muted text-sm leading-relaxed">
                <Mail size={18} className="text-primary shrink-0 mt-0.5" />
                <span>contacto@tecnolight.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container-site border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Tecnolight. Todos los derechos reservados. Santa Fe, Argentina.</p>
          <div className="flex gap-5">
            <a href="https://wa.me/543424567890" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#12141C] border border-border text-text-muted transition-all duration-300 hover:bg-primary hover:text-[#0A0B0D] hover:-translate-y-1 hover:shadow-glow" aria-label="WhatsApp">
              <Phone size={16} />
            </a>
            <a href="mailto:contacto@tecnolight.com.ar" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#12141C] border border-border text-text-muted transition-all duration-300 hover:bg-primary hover:text-[#0A0B0D] hover:-translate-y-1 hover:shadow-glow" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
