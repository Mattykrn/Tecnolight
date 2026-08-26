# Manual de Uso — Sitio Web Tecno Light

Bienvenido al manual del sitio web de **Tecno Light SRL**. Este documento explica como funciona el sitio, como actualizar contenido y como solucionar problemas comunes.

---

## 1. Estructura del Sitio

```
tecnolight.com.ar/
├── /                    → Pagina de inicio
├── /about               → Nosotros (historia, valores)
├── /projects            → Proyectos realizados
├── /contact             → Contacto y mapas
├── /instagram           → Galeria de Instagram
└── /sitemap.xml         → Sitemap para buscadores
```

---

## 2. Pagina de Inicio — Secciones

La pagina de inicio se compone de las siguientes secciones en orden:

| Seccion                          | Que muestra                                                          |
|----------------------------------|----------------------------------------------------------------------|
| **Hero principal**               | Imagen de autopista, logo, frase, botones CTA, estadisticas         |
| **Nuestra Trayectoria**          | Estadisticas (fundacion, anos, senales, proyectos), tarjetas de calidad |
| **Por Esto Seguimos Aca**        | 3 tarjetas destacadas con valores y logros                          |
| **Como Trabajamos**              | Proceso de 3 pasos: consulta, asesoramiento, fabricacion            |
| **Nuestros Rubros**              | Los 3 rubros con descripcion e imagen                               |
| **Proyectos Realizados**         | Grilla de proyectos con imagenes                                    |
| **Galeria**                      | Mini galeria de imagenes de obras                                   |
| **Contacto**                     | Tarjeta de WhatsApp con boton directo                               |

---

## 3. Como Actualizar el Contenido

### 3.1 Cambiar Textos

Los textos del sitio estan escritos directamente en los archivos de codigo. Para modificarlos:

1. Abrir el archivo correspondiente en la carpeta `frontend/pages/`
2. Buscar el texto a cambiar (esta entre comillas)
3. Modificar y guardar
4. El sitio se actualiza automaticamente

**Archivos principales:**

| Que queres cambiar              | Archivo a editar                    |
|---------------------------------|-------------------------------------|
| Texto del Hero (inicio)         | `frontend/components/InteractiveRoadHero.jsx` |
| Productos y rubros              | `frontend/pages/index.jsx`          |
| Historia de la empresa          | `frontend/pages/about.jsx`          |
| Datos de contacto               | `frontend/pages/contact.jsx`        |
| Proyectos de respaldo           | `frontend/pages/index.jsx` y `frontend/pages/projects/index.jsx` |

### 3.2 Cambiar Imagenes

1. Colocar la nueva imagen en la carpeta `frontend/public/images/`
2. Abrir el archivo donde se usa esa imagen
3. Cambiar la ruta `src` por la nueva (ej: `/images/nueva-imagen.jpg`)
4. Las imagenes del hero y secciones de fondo estan en:
   - `frontend/pages/index.jsx` — seccion `galleryImages` y `SectionBg`
   - `frontend/pages/about.jsx`
   - `frontend/pages/contact.jsx`
   - `frontend/pages/projects/index.jsx`

### 3.3 Agregar o Quitar Proyectos

Los proyectos tienen dos fuentes:

1. **Via API (recomendado)**: Si tenes un backend conectado, los proyectos se cargan desde ahi
2. **Fallback (respaldo)**: Si la API no responde, se muestran proyectos de ejemplo definidos en:
   - `frontend/pages/index.jsx` — variable `fallbackProjects`
   - `frontend/pages/projects/index.jsx` — variable `fallbackProjects`

Cada proyecto tiene esta estructura:
```javascript
{
  id: 'f1',
  title: 'Nombre del Proyecto',
  description: 'Descripcion del proyecto',
  location: 'Santa Fe',
  image: '/images/projects/proyecto.jpg',
  client: 'Nombre del Cliente',
  testimonial: 'Comentario opcional del cliente'
}
```

### 3.4 Galeria de Instagram

La galeria se conecta a la API de Instagram. Si tenes un servidor backend corriendo, las imagenes se actualizan automaticamente. Si no hay backend, la galeria muestra los posts de respaldo.

Para cambiar el perfil de Instagram, editar en `frontend/components/InstagramGallery.jsx`:
```javascript
const INSTAGRAM_URL = 'https://www.instagram.com/tecnolight.srl/';
```

---

## 4. Imagenes del Sitio

### Ubicacion de las imagenes

Todas las imagenes estan en `frontend/public/images/`:

| Carpeta              | Contenido                                       |
|----------------------|--------------------------------------------------|
| `/images/obras/`     | Imagenes de obras y paisajes (hero, fondos)     |
| `/images/instagram/` | Imagenes de Instagram y galerias                |
| `/images/projects/`  | Imagenes de proyectos                           |
| `/images/nosotros/`  | Fotos del equipo                                |

### Formato recomendado

- **Formato**: WebP (mejor compresion) o JPG
- **Tamano maximo**: 1920px de ancho
- **Peso ideal**: < 200KB por imagen
- **Fondo de secciones**: Se usan con opacidad 4%, elegir imagenes claras

---

## 5. Redes Sociales

Las unicas redes sociales vinculadas son:
- **Instagram**: `@tecnolight.srl` (link directo en footer y galeria)
- **WhatsApp**: `+54 342 455-3582` (boton flotante en todas las paginas)

Para cambiar el numero de WhatsApp, buscar en los archivos:
- `frontend/components/Layout.jsx`
- `frontend/pages/contact.jsx`
- `frontend/pages/about.jsx`
- `frontend/pages/projects/index.jsx`

Buscar `543424553582` y reemplazar por el nuevo numero.

---

## 6. SEO y Buscadores

### Meta descripciones
Cada pagina tiene su propia meta descripcion en la etiqueta `<Head>`. Para cambiarlas:
- Editar el array de `Head` en cada pagina
- Buscar `<meta name="description"`

### Sitemap
El sitemap se genera automaticamente en `/sitemap.xml`. Los buscadores lo usan para indexar el sitio. No requiere mantenimiento.

### Schema.org
Los datos estructurados (LocalBusiness) estan en `frontend/pages/_document.js`. Si cambian direccion, telefono o CUIT, actualizar ahi.

---

## 7. Google Analytics

Para activar Google Analytics:
1. Obtener un ID de tracking (ej: `G-XXXXXXXXXX`)
2. Configurarlo como variable de entorno: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
3. Si no se configura, el codigo de tracking no se carga

---

## 8. Comandos de Desarrollo

### Iniciar el servidor de desarrollo
```bash
npm run dev
```
El sitio se abre en `http://localhost:3000`

### Compilar para produccion
```bash
npm run build
```

### Iniciar servidor de produccion
```bash
npm start
```

---

## 9. Solucion de Problemas

### El sitio no carga
1. Verificar que el servidor este corriendo: `npm run dev` o `npm start`
2. Revisar que el puerto 3000 este disponible
3. Verificar que no haya errores en la terminal

### Las imagenes no se ven
1. Confirmar que el archivo existe en `frontend/public/images/`
2. Verificar que la ruta en el codigo comience con `/images/...`
3. Las imagenes nuevas pueden requerir reiniciar el servidor

### La galeria de Instagram no carga
1. Verificar que la API backend este corriendo en el puerto 5000
2. Revisar la conexion a internet
3. Si la API falla, se muestran los datos de respaldo automaticamente

### Error en la consola del navegador
- Presionar F12 → pestana "Console" para ver errores
- Copiar el mensaje de error y consultar con el desarrollador

---

## 10. Contacto Tecnico

Para soporte tecnico o consultas sobre el sitio:
- **WhatsApp**: +54 342 455-3582
- **Email**: ventas@tecnolight.com.ar

---

*Manual actualizado el 09/07/2026*
