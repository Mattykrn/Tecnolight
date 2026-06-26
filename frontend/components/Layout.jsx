/**
 * ============================================
 * COMPONENTE: LAYOUT PRINCIPAL
 * ============================================
 * 
 * Componente de layout global que envuelve todas las páginas del sitio.
 * Proporciona estructura consistente con header, footer y navegación.
 * 
 * Características:
 * - Header con logo, navegación y botón de cotización
 * - Menú móvil responsive (hamburguesa)
 * - Footer con información de contacto y enlaces
 * - Efecto de scroll en el header (cambia de estilo al bajar)
 * - Cierre automático del menú móvil al cambiar de ruta
 * 
 * Uso:
 * - Envuelve todas las páginas públicas del sitio
 * - Se importa en pages/_app.js
 * 
 * @module Layout
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Hook para detectar cambios de ruta
import { Phone, Mail, MapPin, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react'; // Iconos
import styles from './Layout.module.css';

/**
 * Componente Layout principal
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido de la página (children)
 * @returns {JSX.Element} Layout completo con header, contenido y footer
 */
export default function Layout({ children }) {
  // ============================================
  // ESTADOS LOCALES
  // ============================================
  
  const [scrolled, setScrolled] = useState(false); // Header con fondo al hacer scroll
  const [menuOpen, setMenuOpen] = useState(false); // Menú móvil abierto/cerrado
  const router = useRouter();

  // ============================================
  // EFECTOS
  // ============================================
  
  /**
   * useEffect: Detectar scroll para cambiar estilo del header
   * 
   * Cuando el usuario baja más de 50px, el header cambia de estilo
   * (fondo sólido, sombra, etc.) para mejorar legibilidad.
   * 
   * Se ejecuta al montar el componente y limpia el listener al desmontar.
   */
  useEffect(() => {
    // Scroll listener to toggle header background
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * useEffect: Cerrar menú móvil al cambiar de ruta
   * 
   * Mejora la UX cerrando automáticamente el menú hamburguesa
   * cuando el usuario navega a otra página.
   * 
   * Se ejecuta cada vez que cambia router.pathname
   */
  useEffect(() => {
    // Close mobile menu on route change
    setMenuOpen(false);
  }, [router.pathname]);

  // ============================================
  // DATOS DE NAVEGACIÓN
  // ============================================
  
  /**
   * Array de items de navegación principal
   * Se usa tanto en el menú desktop como en el móvil
   */
  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Contacto', path: '/contact' }
  ];

  // ============================================
  // MANEJO DE EVENTOS
  // ============================================
  
  /**
   * Maneja el clic en el logo
   * Navega a la página de inicio
   */
  const handleLogoClick = () => {
    router.push('/');
  };

  // ============================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================
  
  return (
    <div className={styles.wrapper}>
      {/* ============================================
          HEADER: Navegación principal
          ============================================ */}
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <div className={`${styles.navContainer} container`}>
          {/* Logo */}
          <div className={styles.logoArea} onClick={handleLogoClick}>
            <div className={styles.logoIcon}>
              <span className={styles.logoText}>TL</span>
            </div>
            <div className={styles.brandName}>
              <span className={styles.brandTitle}>TECNOLIGHT</span>
              <span className={styles.brandSubtitle}>Señalización Vial</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav>
            <ul className={styles.navLinks}>
              {navItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    href={item.path}
                    className={`${styles.navLink} ${
                      router.pathname === item.path ? styles.navLinkActive : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action / Mobile Trigger */}
          <div className={styles.headerActions}>
            <Link href="/contact" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              Cotizar <ArrowRight size={16} />
            </Link>

            {/* Hamburger button */}
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu principal"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} color="#FFF" /> : <Menu size={24} color="#FFF" />}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================
          MENÚ MÓVIL: Overlay responsive
          ============================================ */}
      <ul className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`${styles.mobileNavLink} ${
                router.pathname === item.path ? styles.mobileNavLinkActive : ''
              }`}
            >
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

      {/* ============================================
          CONTENIDO PRINCIPAL: Children de la página
          ============================================ */}
      <main className={styles.main}>{children}</main>

      {/* ============================================
          FOOTER: Información institucional
          ============================================ */}
      <footer className={styles.footer}>
        <div className={`${styles.footerGrid} container`}>
          {/* Column 1: Brand Info */}
          <div className={styles.footerCol}>
            <div className={styles.logoArea} onClick={handleLogoClick} style={{ marginBottom: '0.5rem' }}>
              <div className={styles.logoIcon}>
                <span className={styles.logoText}>TL</span>
              </div>
              <div className={styles.brandName}>
                <span className={styles.brandTitle}>TECNOLIGHT</span>
                <span className={styles.brandSubtitle}>Señalización Vial</span>
              </div>
            </div>
            <p className={styles.footerBrandDesc}>
              Más de 30 años de experiencia fabricando señalización vial y cartelería de alta calidad. 
              Guiando el tránsito de forma segura en todo el territorio argentino desde Santa Fe.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Enlaces</h3>
            <ul className={styles.footerLinks}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className={styles.footerLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admin/login" className={styles.footerLink} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Categorías</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/catalog?category=Reglamentarias" className={styles.footerLink}>
                  Reglamentarias
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Preventivas" className={styles.footerLink}>
                  Preventivas
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Informativas" className={styles.footerLink}>
                  Informativas
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Cartelería+Comercial" className={styles.footerLink}>
                  Cartelería Comercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Contacto</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin className={styles.contactIcon} size={18} />
                <span>Bv. Pellegrini 3100,<br />Santa Fe, S3000, Argentina</span>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.contactIcon} size={18} />
                <span>+54 (342) 456-7890</span>
              </li>
              <li className={styles.contactItem}>
                <Mail className={styles.contactIcon} size={18} />
                <span>contacto@tecnolight.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={`${styles.footerBottom} container`}>
          <p>© {new Date().getFullYear()} Tecnolight. Todos los derechos reservados. Santa Fe, Argentina.</p>
          <div className={styles.footerSocials}>
            <a href="https://wa.me/543424567890" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
              <Phone size={16} />
            </a>
            <a href="mailto:contacto@tecnolight.com.ar" className={styles.socialIcon} aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
