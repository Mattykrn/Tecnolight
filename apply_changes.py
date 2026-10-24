#!/usr/bin/env python3
import re
filepath = '/home/matii/Projects/Tecnolight-main (2)/frontend/pages/index.jsx'
with open(filepath, 'r') as f:
    content = f.read()
changes = []

# === HERO SECTION ===
old_hero_pattern = r'<p[^>]*className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed"[^>]*>.*?</p>'
match = re.search(old_hero_pattern, content, re.DOTALL)
if match:
    content = content.replace(match.group(), '<p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed" style={{ fontFamily: "\'Roboto\', sans-serif" }}>Más de 30 años de trayectoria y experiencia</p>')
    changes.append('Hero tagline replaced')
else:
    print("WARNING: Hero tagline paragraph not found")

# === REMOVE TRABAJAN CON NOSOTROS ===
old_trabajan = '''      {/* Clientes — franja sólida oscura con logos en blanco */}
      <section className="py-10 section-solid-dark border-b border-white/5">
        <div className="max-w-site mx-auto px-5 lg:px-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="badge-corporate">Trabajan con nosotros</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
            {[
              'Vialidad Nacional',
              'DPV Santa Fe',
              'Municipios y Comunas',
              'ASSA',
              'Constructoras Viales',
            ].map((cliente) => (
              <span key={cliente} className="text-white/30 hover:text-white/70 font-extrabold text-sm tracking-widest uppercase transition-colors duration-300" style={FONT_RALEWAY_900}>
                {cliente}
              </span>
            ))}
          </div>
        </div>
      </section>'''
if old_trabajan in content:
    content = content.replace(old_trabajan, '')
    changes.append('Removed "Trabajan con nosotros" section')
else:
    print("WARNING: 'Trabajan con nosotros' section not found")

# === REMOVE COMPETITORS ===
for comp in ['Rosi Distribuciones', 'Parpal', 'Rossi']:
    count = content.count(comp)
    if count > 0:
        content = content.replace(comp, '')
        changes.append(f'Removed "{comp}" ({count}x)')

# === BLOQUE B ===
if 'Bloque B — Impresión Digital y Rotulación' in content:
    content = content.replace('Bloque B — Impresión Digital y Rotulación', 'Bloque B — Soluciones Reflectivas para Señalización Vial')
    changes.append('Changed Bloque B badge')
else:
    print("WARNING: Bloque B badge not found")

if re.search(r'Impresión Digital Retrorreflectiva: <span[^>]*>.*?</span>', content):
    content = re.sub(r'Impresión Digital Retrorreflectiva: <span[^>]*>.*?</span>', 'Soluciones Reflectivas para Señalización Vial', content)
    changes.append('Changed Bloque B H2')
else:
    print("WARNING: Bloque B H2 not found")

if re.search(r'Impresión digital directa sobre láminas retrorreflectivas microprismáticas[^<]*\.', content):
    content = re.sub(r'Impresión digital directa sobre láminas retrorreflectivas microprismáticas[^<]*\.', 'Soluciones reflectivas para señalización vial con láminas Avery Dennison homologadas. Grado Ingeniería, Alta Intensidad Prismática y Omnicube. Reflectividad garantizada para señalización reglamentaria, preventiva e informativa en rutas, autopistas y zonas urbanas.', content)
    changes.append('Changed Bloque B paragraph')
else:
    print("WARNING: Bloque B paragraph not found")

if 'Grado Diamante' in content:
    content = content.replace('Grado Diamante', 'Omnicube')
    changes.append('Grado Diamante -> Omnicube')

if 'TrafficJet' in content:
    content = content.replace('TrafficJet™ Xpress', '')
    content = content.replace('TrafficJet', '')
    changes.append('Removed TrafficJet mentions')

# === PROCESS STEPS ===
if 'Corte' in content and 'Corte láser' not in content:
    content = content.replace('Corte', 'Corte láser')
    changes.append('Corte -> Corte láser')

if 'Soldadura' in content and 'TIG y MIG' not in content:
    content = content.replace('Soldadura', 'TIG y MIG')
    changes.append('Soldadura -> TIG y MIG')

if 'Pintura' in content and 'Pintura epoxi' not in content:
    content = content.replace('Pintura', 'Pintura epoxi')
    changes.append('Pintura -> Pintura epoxi')

if 'Producto final' in content and 'Proceso industrial de fabricación hasta el producto final' not in content:
    content = content.replace('Producto final', 'Proceso industrial de fabricación hasta el producto final')
    changes.append('Producto final updated')

if re.search(r'\brotulado\b', content, re.IGNORECASE):
    content = re.sub(r'\brotulado\b', '', content, flags=re.IGNORECASE)
    changes.append('Removed rotulado')

# === GALERÍA DE PROCESO ===
old_galeria = '''        <div className="border-t border-slate-800 pt-12">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest" style={FONT_ROBOTO_500}>
              Galería de Proceso
            </h3>
            <div className="h-px bg-slate-800 flex-grow" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROCESS_GALLERY.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-700 cursor-pointer group hover:border-orange-500/50 transition-colors"
                onClick={() => setSelectedImg(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>'''
if old_galeria in content:
    content = content.replace(old_galeria, '')
    changes.append('Removed Galería de Proceso section')
else:
    print("WARNING: Galería de Proceso section not found")

# === CAPACIDAD INSTALADA ===
if re.search(r'/\* Capacidad instalada y recursos operativos \*/.*?</section>', content, re.DOTALL):
    content = re.sub(r'/\* Capacidad instalada y recursos operativos \*/.*?</section>', '', content, flags=re.DOTALL)
    changes.append('Removed Capacidad Instalada section')
else:
    print("WARNING: Capacidad Instalada section not found")

# === SEÑALIZACIÓN Y MATERIALES ===
if 'Pliegos DNV' in content:
    content = content.replace('Pliegos DNV', 'Normas DNV')
    changes.append('Pliegos DNV -> Normas DNV')

if 'Chapa de diferentes espesores' in content and 'PVC' not in content.split('Chapa de diferentes espesores')[1][:200]:
    content = content.replace('Chapa de diferentes espesores', 'Chapa de diferentes espesores, PVC, alto impacto, plástico compacto')
    changes.append('Updated materials list')

# === DATOS DE CONTACTO ===
for old_email in ['tecnolightsrl.rosario@gmail.com', 'tecnolight.srl@gmail.com', 'tecnolightsrl@arnet.com.ar', 'tecnolightrsr@arnet.com.ar', 'ventas@tecnolight.com.ar']:
    count = content.count(old_email)
    if count > 0:
        content = content.replace(old_email, 'tecnolightsrl@tecnolightsrl.com')
        changes.append(f'Email {old_email} -> tecnolightsrl@tecnolightsrl.com ({count}x)')

if 'Sede Rosario' in content:
    content = content.replace('Sede Rosario', 'Sede Operativa')
    changes.append('Sede Rosario -> Sede Operativa')

if 'Dirección Rosario' in content:
    content = content.replace('Dirección Rosario', 'Dirección Rosario: Sede Operativa')
    changes.append('Dirección Rosario updated')

if '(0341) 438-8444' in content:
    content = content.replace('(0341) 438-8444', '341 636 9053')
    changes.append('Rosario phone -> 341 636 9053')

with open(filepath, 'w') as f:
    f.write(content)

print(f"\n=== {len(changes)} changes applied ===")
for i, c in enumerate(changes, 1):
    print(f"  {i}. {c}")
