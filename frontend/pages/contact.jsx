/**
 * ============================================
 * PÁGINA DE CONTACTO
 * ============================================
 * 
 * Formulario de contacto con información de la empresa.
 * Permite a los clientes enviar consultas y solicitar presupuestos.
 * 
 * Características:
 * - Formulario validado con feedback visual
 * - Información de contacto (teléfono, email, dirección)
 * - Mapa de Google Maps embebido
 * - Pre-llenado desde catálogo (query param ?product=)
 * - Envío automático de emails de confirmación
 * 
 * Datos:
 * - query.product (opcional): Nombre del producto para pre-llenar mensaje
 * 
 * @module ContactPage
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'; // Hook para leer query params
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertTriangle } from 'lucide-react'; // Iconos
import styles from '../styles/Contact.module.css';

/**
 * Componente de página de contacto
 * 
 * @returns {JSX.Element} Página de contacto con formulario
 */
export default function Contact() {
  const router = useRouter();
  
  // ============================================
  // ESTADOS LOCALES
  // ============================================
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false); // Estado de carga durante envío
  const [submitted, setSubmitted] = useState(false); // Formulario enviado exitosamente
  const [error, setError] = useState(''); // Mensaje de error

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  
  /**
   * useEffect: Pre-llenar mensaje si viene desde catálogo
   * 
   * Si el usuario hace clic en "Solicitar Presupuesto" desde un producto,
   * la URL incluye ?product=NombreDelProducto
   * 
   * Ejemplo: /contact?product=Señal+Pare
   */
  useEffect(() => {
    if (router.query.product) {
      setFormData((prev) => ({
        ...prev,
        message: `Hola Tecnolight, me gustaría solicitar un presupuesto para el producto: ${router.query.product}. Quedo atento a su respuesta.`
      }));
    }
  }, [router.query.product]);

  // ============================================
  // VALIDACIÓN VISUAL
  // ============================================
  
  /**
   * useEffect: Sincronizar atributos ARIA con estado de validación CSS
   * 
   * Mejora la accesibilidad sincronizando el atributo aria-invalid
   * con la pseudo-clase CSS :user-invalid
   */
  useEffect(() => {
    const syncAria = (el) => {
      if (!el || !el.matches) return;
      el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false');
    };

    const handleBlur = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        syncAria(e.target);
      }
    };

    const handleInput = (e) => {
      if ((e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') && e.target.hasAttribute('aria-invalid')) {
        syncAria(e.target);
      }
    };

    document.addEventListener('blur', handleBlur, true);
    document.addEventListener('input', handleInput);

    return () => {
      document.removeEventListener('blur', handleBlur, true);
      document.removeEventListener('input', handleInput);
    };
  }, []);

  // ============================================
  // MANEJO DE CAMBIOS EN EL FORMULARIO
  // ============================================
  
  /**
   * Actualiza el estado del formulario cuando el usuario escribe
   * 
   * @param {Object} e - Evento de cambio del input
   * @param {string} e.target.name - Nombre del campo
   * @param {string} e.target.value - Valor ingresado
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ============================================
  // ENVÍO DEL FORMULARIO
  // ============================================
  
  /**
   * Maneja el envío del formulario de contacto
   * 
   * Flujo:
   * 1. Prevenir recarga de página
   * 2. Validar campos (HTML5 + backend)
   * 3. Enviar datos a la API
   * 4. Mostrar mensaje de éxito o error
   * 
   * @param {Object} e - Evento de submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error al enviar el mensaje.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err.message || 'Error de conexión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // RENDERIZADO DEL COMPONENTE
  // ============================================
  
  return (
    <div className={`${styles.wrapper} container`}>
      {/* ============================================
          HEAD: Meta tags SEO
          ============================================ */}
      <Head>
        <title>Contacto - Tecnolight | Santa Fe</title>
        <meta name="description" content="Contactanos para solicitar asesoramiento y cotización de señales viales y comerciales. Ubicados en Santa Fe, Argentina." />
      </Head>

      {/* ============================================
          ENCABEZADO DE LA PÁGINA
          ============================================ */}
      <div className={styles.intro}>
        <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Contacto Directo</span>
        <h1>Hablemos de tu Proyecto</h1>
        <p>Estamos listos para asesorarte técnicamente conforme a normativas viales nacionales e internacionales.</p>
      </div>

      {/* ============================================
          CONTENIDO PRINCIPAL
          ============================================ */}
      <div className={styles.grid}>
        {/* ============================================
            COLUMNA IZQUIERDA: Información y mapa
            ============================================ */}
        <div className={styles.infoArea}>
          <div className={styles.infoDetails}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={22} />
              </div>
              <div className={styles.infoText}>
                <h3>Ubicación de Planta y Oficinas</h3>
                <p>Bv. Pellegrini 3100, S3000 Santa Fe, Argentina</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Phone size={22} />
              </div>
              <div className={styles.infoText}>
                <h3>Teléfonos de Atención</h3>
                <p>+54 (342) 456-7890 (Administración)</p>
                <p>+54 (342) 456-7891 (Ventas)</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Mail size={22} />
              </div>
              <div className={styles.infoText}>
                <h3>Correos Electrónicos</h3>
                <p>contacto@tecnolight.com.ar</p>
                <p>presupuestos@tecnolight.com.ar</p>
              </div>
            </div>
          </div>

          {/* ============================================
              MAPA DE GOOGLE MAPS
              ============================================ */}
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.90226394336!2d-60.71477752358823!3d-31.63660630680695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5f97b6fa20ad3%3s0x95b5f97b700ddcbd!2sBv.%2520Pellegrini%25203100%252C%2520S3000%2520Santa%2520Fe!5e0!3m2!1ses!2sar!4v1719273900000!5m2!1ses!2sar"
              className={styles.mapFrame}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tecnolight Santa Fe Location Map"
            ></iframe>
          </div>
        </div>

        {/* ============================================
            COLUMNA DERECHA: Formulario de contacto
            ============================================ */}
        <div>
          {submitted ? (
            <div className={styles.successCard}>
              <CheckCircle2 className={styles.successIcon} size={64} />
              <h2>¡Mensaje Enviado!</h2>
              <p>
                Gracias por contactarte con Tecnolight. Hemos recibido tu consulta y un asesor técnico te responderá a la brevedad.
              </p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <div className={styles.formCard}>
              <h2>Enviar Consulta</h2>
              {error && (
                <div style={{ backgroundColor: 'var(--color-error-bg)', border: '1px solid var(--color-error)', color: 'var(--color-error)', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={18} />
                  <span>{error}</span>
                </div>
              )}
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre y Apellido *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    required
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  <div className={`${styles.errorMsg} error-msg`}>
                    Por favor, ingrese su nombre.
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <div className={`${styles.errorMsg} error-msg`}>
                    Por favor, ingrese una dirección de correo válida.
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Teléfono de Contacto</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company">Empresa / Municipio</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={styles.input}
                    value={formData.company}
                    onChange={handleChange}
                    autoComplete="organization"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Mensaje / Consulta *</label>
                  <textarea
                    id="message"
                    name="message"
                    className={styles.textarea}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <div className={`${styles.errorMsg} error-msg`}>
                    Por favor, ingrese su mensaje.
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ justifyContent: 'center', marginTop: '1rem' }}
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'} <Send size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
