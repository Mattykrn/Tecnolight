import re
filepath = '/home/matii/Projects/Tecnolight-main (2)/frontend/pages/index.jsx'
with open(filepath, 'r') as f:
    content = f.read()
changes = []
# Hero tagline
if 'Más de 30 años de trayectoria y experiencia' not in content:
    if 'Señalización vial, EPP e indumentaria de trabajo bajo normativas DPV e IRAM.' in content:
        content = content.replace('Señalización vial, EPP e indumentaria de trabajo bajo normativas DPV e IRAM.', 'Más de 30 años de trayectoria y experiencia')
        changes.append('Hero tagline updated')
# Bloque B badge
if 'Bloque B — Impresión Digital y Rotulación' in content:
    content = content.replace('Bloque B — Impresión Digital y Rotulación', 'Bloque B — Soluciones Reflectivas para Señalización Vial')
    changes.append('Bloque B badge updated')
# Bloque B H2
if 'Impresión Digital Retrorreflectiva:' in content:
    content = re.sub(r'Impresión Digital Retrorreflectiva: <span[^>]*>Avery Dennison TrafficJet[^<]*</span>', 'Soluciones Reflectivas para Señalización Vial', content)
    changes.append('Bloque B H2 updated')
# Bloque B paragraph
if 'Impresión digital directa sobre láminas retrorreflectivas microprismáticas' in content:
    old_p = re.search(r'Impresión digital directa sobre láminas retrorreflectivas microprismáticas[^<]*\.', content)
    if old_p:
        content = content.replace(old_p.group(), 'Soluciones reflectivas para señalización vial con láminas Avery Dennison homologadas. Grado Ingeniería, Alta Intensidad Prismática y Omnicube. Reflectividad garantizada para señalización reglamentaria, preventiva e informativa en rutas, autopistas y zonas urbanas.')
        changes.append('Bloque B paragraph updated')
# Grado Diamante -> Omnicube
if 'Grado Diamante' in content:
    content = content.replace('Grado Diamante', 'Omnicube')
    changes.append('Grado Diamante -> Omnicube')
# TrafficJet removal
if 'TrafficJet' in content:
    content = content.replace('TrafficJet™ Xpress', '')
    content = content.replace('TrafficJet', '')
    changes.append('TrafficJet removed')
# PROCESS_STEPS - Corte, Soldadura, Pintura, Producto final
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
# Remove rotulado
if 'rotulado' in content.lower():
    content = re.sub(r'\brotulado\b', '', content, flags=re.IGNORECASE)
    changes.append('rotulado removed')
if 'rotulo final' in content.lower():
    content = re.sub(r'\brotulo final\b', '', content, flags=re.IGNORECASE)
    changes.append('rotulo final removed')
# Pliegos DNV -> Normas DNV
if 'Pliegos DNV' in content:
    content = content.replace('Pliegos DNV', 'Normas DNV')
    changes.append('Pliegos DNV -> Normas DNV')
# Materials list
if 'Chapa de diferentes espesores' in content and 'PVC' not in content:
    content = content.replace('Chapa de diferentes espesores', 'Chapa de diferentes espesores, PVC, alto impacto, plástico compacto')
    changes.append('Materials list updated')
# Phone Rosario
if '(0341) 438-8444' in content:
    content = content.replace('(0341) 438-8444', '341 636 9053')
    changes.append('Rosario phone updated')
# Email replacement
for old_email in ['tecnolightsrl.rosario@gmail.com', 'tecnolight.srl@gmail.com', 'tecnolightsrl@arnet.com.ar', 'tecnolightrsr@arnet.com.ar', 'ventas@tecnolight.com.ar']:
    if old_email in content:
        content = content.replace(old_email, 'tecnolightsrl@tecnolightsrl.com')
        changes.append(f'Email {old_email} replaced')
# Competitor removal
for comp in ['Rosi Distribuciones', 'Parpal', 'Rossi']:
    if comp in content:
        content = content.replace(comp, '')
        changes.append(f'Competitor {comp} removed')
# Write back
with open(filepath, 'w') as f:
    f.write(content)
print(f'{len(changes)} changes applied:')
for c in changes:
    print(f'  - {c}')