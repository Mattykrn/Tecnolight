import Head from 'next/head';
import { useState } from 'react';
import { FileText, Mail, Phone } from 'lucide-react';

const FONT_RALEWAY_900 = { fontFamily: "'Raleway', sans-serif", fontWeight: 900, textTransform: 'uppercase' };
const FONT_ROBOTO = { fontFamily: "'Roboto', sans-serif" };
const FONT_ROBOTO_500 = { fontFamily: "'Roboto', sans-serif", fontWeight: 500 };

const WaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CATEGORIAS = [
  { id: 'todas', label: 'Todas' },
  { id: 'senalizacion-vial', label: 'Señalización Vial' },
  { id: 'epp', label: 'EPP e Indumentaria' },
  { id: 'balizamiento', label: 'Balizamiento y Vallas' },
  { id: 'demarcacion', label: 'Demarcación Horizontal' },
  { id: 'estructuras', label: 'Estructuras Metálicas' },
];

const PRODUCTOS = [
  { id: 1, categoria: 'senalizacion-vial', nombre: 'Señal Reglamentaria (R)', desc: 'Chapas de acero galvanizado con lámina microprismática Avery Dennison. Cumple DNV / DPV / IRAM 3952.', specs: ['Grado Ingeniería · HIP · Diamante', 'Varios tamaños disponibles', 'Anti-graffiti opcional'], foto: null },
  { id: 2, categoria: 'senalizacion-vial', nombre: 'Señal Preventiva (P)', desc: 'Forma rombo. Chapa de acero galvanizado con impresión TrafficJet™ Xpress. Alta reflectividad nocturna.', specs: ['600×600 / 750×750 / 900×900 mm', 'Postes incluidos a pedido', 'Homologada DNV'], foto: null },
  { id: 3, categoria: 'senalizacion-vial', nombre: 'Señal Informativa (I)', desc: 'Carteles de destinos, distancias y guía. Sobre aluminio o acero galvanizado con lámina reflectiva.', specs: ['Según pliego DNV/DPV', 'Alta intensidad prismática', 'Fondos verde, azul o blanco'], foto: null },
  { id: 4, categoria: 'senalizacion-vial', nombre: 'Cartelería Transitoria de Obra', desc: 'Señales de obra en plástico corrugado o chapa para velocidades reducidas, desvíos y cierre de calzada.', specs: ['Liviana y apilable', 'Retrorreflectiva Tipo I', 'Con o sin estructura'], foto: null },
  { id: 5, categoria: 'senalizacion-vial', nombre: 'Nomenclador Urbano', desc: 'Chapas de nombre de calle y numeración para municipios. Aluminio anodizado con vinilo reflectivo.', specs: ['Tamaños estándar y especiales', 'Fondo verde o azul', 'Letras blancas'], foto: null },
  { id: 6, categoria: 'epp', nombre: 'Chaleco Alta Visibilidad Clase 2 y 3', desc: 'Indumentaria homologada para obra vial e industrial. Tejido fluorescente con cintas retrorreflectivas.', specs: ['Clase 2 y Clase 3 disponibles', 'Talle S al XXXL', 'Lavable y durable'], foto: null },
  { id: 7, categoria: 'epp', nombre: 'Casco de Seguridad', desc: 'Cascos clase A, B y E (dieléctrico). Con y sin ventilación. Varios colores.', specs: ['Clase A · B · E (dieléctrico)', 'Con arnés regulable', 'Varios colores'], foto: null },
  { id: 8, categoria: 'epp', nombre: 'Calzado de Seguridad', desc: 'Botines con puntera de acero, suela antiperforación y dieléctrica. Para obra vial e industrial.', specs: ['Puntera acero o composite', 'Suela antiperforación', 'Dieléctrico disponible'], foto: null },
  { id: 9, categoria: 'epp', nombre: 'Arnés de Seguridad Full Body', desc: 'Arnés completo con punto de anclaje dorsal y esternal para trabajo en altura.', specs: ['Punto dorsal y esternal', 'Con absorbedor de energía', 'Certificado IRAM'], foto: null },
  { id: 10, categoria: 'epp', nombre: 'Mameluco y Ropa de Trabajo', desc: 'Indumentaria resistente para obra. Telas antiflama, alta visibilidad o estándar.', specs: ['Varios modelos', 'Talle S al XXXL', 'Antiflama disponible'], foto: null },
  { id: 11, categoria: 'balizamiento', nombre: 'Valla Metálica Peatonal', desc: 'Valla de cerco peatonal para canalizar flujos en obra urbana o eventos. Enganche rápido.', specs: ['2 m × 1,10 m', 'Tubo galvanizado', 'Alquiler y venta'], foto: null },
  { id: 12, categoria: 'balizamiento', nombre: 'Baliza Luminosa LED Solar', desc: 'Baliza destellante autónoma solar para señalización nocturna de obra. Sin cableado.', specs: ['Panel solar integrado', 'Destellante 60/min', 'IP65 – Apto intemperie'], foto: null },
  { id: 13, categoria: 'balizamiento', nombre: 'Tambor Canalizador Vial', desc: 'Tambor de plástico retrorreflectivo para canalización de tránsito.', specs: ['Lámina reflectiva Tipo I', 'Peso propio estable', 'Apilable'], foto: null },
  { id: 14, categoria: 'balizamiento', nombre: 'Cono Reflectivo', desc: 'Conos de PVC con banda retrorreflectiva para delineación de calzada y desvíos.', specs: ['45 cm / 70 cm / 90 cm', 'Banda Tipo I', 'PVC flexible'], foto: null },
  { id: 15, categoria: 'demarcacion', nombre: 'Demarcación Horizontal Termoplástica', desc: 'Líneas de carril, sendas peatonales y símbolos viales en pintura termoplástica reflectiva.', specs: ['Blanco y amarillo', 'Con microesferas de vidrio', 'Alta durabilidad'], foto: null },
  { id: 16, categoria: 'demarcacion', nombre: 'Demarcación en Estacionamientos', desc: 'Numeración de cajones, flechas y líneas en pintura para estacionamientos y depósitos.', specs: ['Pintura epoxy o termoplástica', 'Varios colores', 'Interior y exterior'], foto: null },
  { id: 17, categoria: 'estructuras', nombre: 'Poste de Acero para Señal', desc: 'Postes de acero galvanizado para fijación de señales en banquina. Con platina de base.', specs: ['Diámetro 60 y 90 mm', 'Largo 3 / 4 / 5 m', 'Galvanizado en caliente'], foto: null },
  { id: 18, categoria: 'estructuras', nombre: 'Pórtico Vial de Gran Porte', desc: 'Estructura metálica tipo pórtico para cartelería aérea en autovías y accesos. A medida.', specs: ['Acero pintado o galvanizado', 'Fundación incluida', 'A medida según pliego'], foto: null },
  { id: 19, categoria: 'estructuras', nombre: 'Ménsula y Pescante', desc: 'Voladizos para señales laterales tipo bandera. Para mástil o pared. Varios alcances.', specs: ['Alcance 1 m a 4 m', 'Acero galvanizado', 'Con abrazaderas de fijación'], foto: null },
];

function ProductCard({ producto }) {
  const catLabel = CATEGORIAS.find(c => c.id === producto.categoria)?.label;
  return (
    <div className="card-corporate flex flex-col overflow-hidden group">
      <div className="relative bg-slate-800/60 aspect-[4/3] flex items-center justify-center overflow-hidden border-b border-white/5">
        {producto.foto ? (
          <img src={producto.foto} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
              <path d="M24 2L46 14V38L24 50L2 38V14L24 2Z" stroke="rgba(255,90,31,0.25)" strokeWidth="1.5"/>
              <path d="M24 12L36 19V33L24 40L12 33V19L24 12Z" stroke="rgba(255,90,31,0.15)" strokeWidth="1"/>
            </svg>
            <span className="text-[9.5px] uppercase tracking-widest text-slate-400 font-semibold">Ficha Normada IRAM / DNV</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge-ig" style={{ fontSize: '0.6rem', padding: '0.25rem 0.75rem' }}>{catLabel}</span>
        </div>
        <div className="corner-brand-glow" style={{ opacity: 0.35 }} />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-white font-bold text-sm leading-snug mb-2" style={FONT_RALEWAY_900}>{producto.nombre}</h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1" style={FONT_ROBOTO}>{producto.desc}</p>
        <ul className="space-y-1 mb-5">
          {producto.specs.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-400" style={FONT_ROBOTO}>
              <span className="w-1 h-1 rounded-full bg-[#FF5A1F] shrink-0" />{s}
            </li>
          ))}
        </ul>
        <a
          href="/#contacto"
          className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-[#FF5A1F] text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg border border-slate-700 hover:border-[#FF5A1F] transition-all"
          style={FONT_ROBOTO_500}
        >
          <FileText size={14} />
          Solicitar Cotización
        </a>
      </div>
    </div>
  );
}

export default function Catalogo() {
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = PRODUCTOS.filter(p => {
    const matchCat = categoriaActiva === 'todas' || p.categoria === categoriaActiva;
    const matchBusq = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.desc.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchBusq;
  });

  return (
    <>
      <Head>
        <title>Catálogo de Productos | TECNO LIGHT S.R.L.</title>
        <meta name="description" content="Catálogo de señalización vial, EPP, indumentaria, balizamiento y estructuras metálicas. Tecno Light S.R.L. Sede comercial en Santa Fe Capital y sucursal Rosario." />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* Hero */}
      <section className="section-ig-card pt-32 pb-14 px-4 border-b border-white/5 relative">
        <div className="corner-brand-glow" style={{ width: '350px', height: '350px' }} />
        <div className="max-w-site mx-auto px-5 lg:px-10 relative z-10">
          <hr className="divider-orange mb-8" style={{ width: '60px' }} />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="badge-ig mb-4 inline-block">Productos y Servicios</span>
              <h1 className="text-white leading-none tracking-tight" style={{ ...FONT_RALEWAY_900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
                CATÁLOGO <span className="text-[#FF5A1F]">TECNO LIGHT</span>
              </h1>
              <p className="text-slate-400 text-sm max-w-xl mt-4 leading-relaxed" style={FONT_ROBOTO}>
                Señalización vial, EPP, indumentaria, balizamiento y estructuras metálicas.
                Cotizaciones formales para obras, empresas e instituciones públicas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="mailto:tecnolightsrl@arnet.com.ar?subject=Solicitud%20de%20Cotizaci%C3%B3n%20Cat%C3%A1logo"
                className="inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#e54e18] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FF5A1F]/25"
                style={FONT_ROBOTO_500}
              >
                <Mail size={16} />
                Enviar Pliego por Correo
              </a>
              <a
                href="/#contacto"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all border border-slate-700"
                style={FONT_ROBOTO_500}
              >
                <FileText size={16} />
                Formulario de Cotización
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros sticky */}
      <div className="sticky top-14 lg:top-16 z-30 section-solid-dark border-b border-white/5 py-3 px-4 shadow-lg">
        <div className="max-w-site mx-auto px-5 lg:px-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative w-full sm:w-60 shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Buscar producto..." value={busqueda} onChange={e => setBusqueda(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm pl-9 pr-4 py-2 rounded-lg focus:border-[#FF5A1F]/60 focus:outline-none transition-colors"
              style={FONT_ROBOTO} />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map(cat => (
              <button key={cat.id} onClick={() => setCategoriaActiva(cat.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all ${
                  categoriaActiva === cat.id
                    ? 'bg-[#FF5A1F] text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/8'
                }`} style={FONT_ROBOTO_500}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grilla */}
      <section className="section-ig-card py-12 px-4 min-h-[60vh]">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-500 text-xs uppercase tracking-widest" style={FONT_ROBOTO_500}>
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''}
            </p>
            <span className="text-slate-500 text-xs flex items-center gap-1.5" style={FONT_ROBOTO}>
              Imágenes y fichas técnicas normadas DNV / DPV / IRAM
            </span>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {productosFiltrados.map(p => <ProductCard key={p.id} producto={p} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-slate-500 text-sm mb-3" style={FONT_ROBOTO}>Sin resultados para esa búsqueda.</p>
              <button onClick={() => { setCategoriaActiva('todas'); setBusqueda(''); }}
                className="text-[#FF5A1F] text-xs font-bold hover:underline" style={FONT_ROBOTO_500}>
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Corporativo B2B */}
      <section className="bg-slate-900 border-t border-white/10 py-14 px-4 text-center relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-white font-black text-xl sm:text-2xl mb-3" style={FONT_RALEWAY_900}>¿Requiere una cotización por pliego o producto a medida?</h2>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed" style={FONT_ROBOTO}>
            Nuestro equipo técnico comercial atiende requerimientos de contratistas, empresas constructoras y organismos viales en Santa Fe, Rosario y todo el país.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:tecnolightsrl@arnet.com.ar?subject=Consulta%20Cat%C3%A1logo%20Tecno%20Light"
              className="inline-flex items-center gap-2.5 bg-[#FF5A1F] hover:bg-[#e54e18] text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#FF5A1F]/20"
              style={FONT_ROBOTO_500}
            >
              <Mail size={16} />
              Enviar Consulta por Correo
            </a>
            <a
              href="tel:03424553582"
              className="inline-flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all border border-slate-700"
              style={FONT_ROBOTO_500}
            >
              <Phone size={16} />
              Sede Santa Fe: (0342) 455-3582
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
