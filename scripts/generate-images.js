const fs = require('fs');
const path = require('path');

const COLORS = {
  bg: '#1a1a2e',
  asphalt: '#2d2d44',
  yellow: '#FFB703',
  yellowDark: '#e0a300',
  white: '#ffffff',
  accent: '#2196F3',
  accent2: '#00bcd4',
  gray: '#666680'
};

function svg(name, opts = {}) {
  const { icon = '⊡', subtitle = '', color = COLORS.yellow } = opts;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#16213e"/>
      <stop offset="100%" style="stop-color:#0f3460"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.05"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <rect x="40" y="40" width="520" height="520" rx="12" fill="none" stroke="${color}" stroke-opacity="0.2" stroke-width="1"/>
  <rect x="60" y="60" width="480" height="480" rx="8" fill="url(#glow)"/>
  <text x="300" y="220" font-family="Arial,sans-serif" font-size="80" fill="${color}" text-anchor="middle" opacity="0.9">${icon}</text>
  <text x="300" y="300" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">${name}</text>
  ${subtitle ? `<text x="300" y="340" font-family="Arial,sans-serif" font-size="16" fill="${COLORS.gray}" text-anchor="middle">${subtitle}</text>` : ''}
  <text x="300" y="540" font-family="Arial,sans-serif" font-size="12" fill="${COLORS.gray}" text-anchor="middle" opacity="0.5">Tecnolight</text>
</svg>`;
}

const images = {
  // Instagram mock posts — 6 professional signage photos
  'instagram/senal-pare-1.jpg':      { icon: '⬡', name: 'Señal Pare',     subtitle: 'Señal Reglamentaria · 2024', color: '#FFB703' },
  'instagram/senal-preventiva-2.jpg':{ icon: '▲', name: 'Curva Peligrosa', subtitle: 'Señal Preventiva · 2024',   color: '#FF5722' },
  'instagram/proyecto-santa-fe-3.jpg':{icon: '🏗', name: 'Proyecto Santa Fe',subtitle: 'Señalización Municipal',   color: '#2196F3' },
  'instagram/informativa-4.jpg':     { icon: 'ℹ', name: 'Señal Informativa',subtitle: 'Cartelería Vial',           color: '#4CAF50' },
  'instagram/reglamentaria-5.jpg':   { icon: '⛔', name: 'Prohibido Estacionar',subtitle: 'Señal Reglamentaria',   color: '#F44336' },
  'instagram/proyecto-6.jpg':        { icon: '🏭', name: 'Parque Industrial', subtitle: 'Señalización Completa',    color: '#9C27B0' },
  'instagram/placeholder.jpg':       { icon: '📷', name: 'Instagram',      subtitle: '@tecnolight.srl',           color: '#E1306C' },

  // Products — 6 product images
  'products/senal-pare.jpg':         { icon: '⬡', name: 'Señal Pare',        subtitle: '60×60cm · Aluminio Reflectivo' },
  'products/senal-velocidad-40.jpg': { icon: '40', name: 'Velocidad Máxima', subtitle: '60×60cm · Diamond Grade' },
  'products/senal-curva.jpg':        { icon: '↱', name: 'Curva Peligrosa',   subtitle: '75×75cm · Grado Engineering' },
  'products/senal-desvio.jpg':       { icon: '↩', name: 'Señal Desvío',      subtitle: '90×60cm · Personalizable' },
  'products/cartel-inmobiliario.jpg':{ icon: '🏠', name: 'Cartel Premium',   subtitle: '3×2m · Aluminio Composite' },
  'products/senal-no-estacionar.jpg':{ icon: '⛔', name: 'Prohibido Estacionar', subtitle: '60×60cm · Diamond Grade' },

  // Projects — 10 images for 4 projects
  'projects/santa-fe-1.jpg':  { icon: '🏛', name: 'Municipalidad', subtitle: 'Santa Fe · 500+ señales' },
  'projects/santa-fe-2.jpg':  { icon: '🚦', name: 'Semáforos',     subtitle: 'Intersecciones urbanas' },
  'projects/santa-fe-3.jpg':  { icon: '🛣', name: 'Vía Pública',   subtitle: 'Señalización completa' },
  'projects/autopista-1.jpg': { icon: '🛣', name: 'Autopista',     subtitle: 'Rosario · 45km señalizados' },
  'projects/autopista-2.jpg': { icon: '⬡', name: 'Señal Autopista',subtitle: 'Velocidad máxima' },
  'projects/puerto-1.jpg':    { icon: '⚓', name: 'Puerto',         subtitle: 'Zona portuaria' },
  'projects/puerto-2.jpg':    { icon: '📋', name: 'Cartelería',     subtitle: 'Letras corpóreas' },
  'projects/puerto-3.jpg':    { icon: '🏭', name: 'Polo Logístico',subtitle: 'Señalización interna' },
  'projects/parque-1.jpg':    { icon: '🏭', name: 'Parque Industrial', subtitle: 'Sauce Viejo' },
  'projects/parque-2.jpg':    { icon: '🗺', name: 'Nomencladores',  subtitle: 'Calles del parque' },
};

const outDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });

for (const [file, opts] of Object.entries(images)) {
  const p = path.join(outDir, file);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, svg(opts.name, opts));
  console.log('✅', file);
}

console.log(`\n🎉 ${Object.keys(images).length} imágenes generadas en frontend/public/images/`);
