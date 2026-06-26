import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (router.query.product) {
      setFormData((prev) => ({
        ...prev,
        message: `Hola Tecnolight, me gustaría solicitar un presupuesto para el producto: ${router.query.product}. Quedo atento a su respuesta.`
      }));
    }
  }, [router.query.product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ocurrió un error al enviar el mensaje.');
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err.message || 'Error de conexión. Intente nuevamente.');
    } finally { setLoading(false); }
  };

  return (
    <div className="container-site py-32 max-md:py-20">
      <Head>
        <title>Contacto - Tecnolight | Santa Fe</title>
        <meta name="description" content="Contactanos para solicitar asesoramiento y cotización de señales viales y comerciales. Ubicados en Santa Fe, Argentina." />
      </Head>

      <div className="text-center max-w-[600px] mx-auto mb-16">
        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Contacto Directo</span>
        <h1 className="text-[2.5rem] font-bold mt-2 mb-4 max-md:text-3xl">Hablemos de tu Proyecto</h1>
        <p className="text-text-muted">Estamos listos para asesorarte técnicamente conforme a normativas viales nacionales e internacionales.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-5">
              <div className="w-[50px] h-[50px] bg-[rgba(255,183,3,0.08)] rounded-lg flex items-center justify-center text-primary shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Ubicación de Planta y Oficinas</h3>
                <p className="text-text-muted text-sm">Bv. Pellegrini 3100, S3000 Santa Fe, Argentina</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-[50px] h-[50px] bg-[rgba(255,183,3,0.08)] rounded-lg flex items-center justify-center text-primary shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Teléfonos de Atención</h3>
                <p className="text-text-muted text-sm">+54 (342) 456-7890 (Administración)</p>
                <p className="text-text-muted text-sm">+54 (342) 456-7891 (Ventas)</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-[50px] h-[50px] bg-[rgba(255,183,3,0.08)] rounded-lg flex items-center justify-center text-primary shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Correos Electrónicos</h3>
                <p className="text-text-muted text-sm">contacto@tecnolight.com.ar</p>
                <p className="text-text-muted text-sm">presupuestos@tecnolight.com.ar</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[300px] rounded-xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.90226394336!2d-60.71477752358823!3d-31.63660630680695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5f97b6fa20ad3%3s0x95b5f97b700ddcbd!2sBv.%2520Pellegrini%25203100%252C%2520S3000%2520Santa%2520Fe!5e0!3m2!1ses!2sar!4v1719273900000!5m2!1ses!2sar"
              className="w-full h-full"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tecnolight Santa Fe Location Map"
            />
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="bg-bg-card border border-border rounded-xl p-12 text-center flex flex-col items-center gap-4">
              <CheckCircle2 size={64} className="text-primary" />
              <h2 className="text-2xl font-bold">¡Mensaje Enviado!</h2>
              <p className="text-text-muted">Gracias por contactarte con Tecnolight. Hemos recibido tu consulta y un asesor técnico te responderá a la brevedad.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>Enviar otro mensaje</button>
            </div>
          ) : (
            <div className="bg-bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Enviar Consulta</h2>
              {error && (
                <div className="bg-error/10 border border-error text-error p-4 rounded-md mb-6 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  <span>{error}</span>
                </div>
              )}
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-text-main">Nombre y Apellido *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} autoComplete="name" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Juan Pérez" />
                  <div className="text-error text-xs mt-1 hidden error-msg">Por favor, ingrese su nombre.</div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-main">Correo Electrónico *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} autoComplete="email" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="ejemplo@correo.com" />
                  <div className="text-error text-xs mt-1 hidden error-msg">Por favor, ingrese una dirección de correo válida.</div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-text-main">Teléfono de Contacto</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="+54 342 1234567" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-text-main">Empresa / Municipio</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} autoComplete="organization" className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Municipalidad de Santa Fe" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-text-main">Mensaje / Consulta *</label>
                  <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={4} className="w-full bg-bg-dark border border-border rounded-lg px-4 py-3 text-text-main placeholder-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-y" placeholder="Describí tu proyecto..." />
                  <div className="text-error text-xs mt-1 hidden error-msg">Por favor, ingrese su mensaje.</div>
                </div>
                <button type="submit" className="btn-primary w-full justify-center mt-4" disabled={loading}>
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
