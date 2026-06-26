# 🔐 Guía de Administración – Panel Tecnolight

Manual completo para gestionar el contenido del sitio web de Tecnolight desde el panel de administración.

---

## Acceso al Panel

1. Navegar a: **[http://localhost:3000/admin/login](http://localhost:3000/admin/login)**  
   *(En producción: `https://tecnolight.com.ar/admin/login`)*

2. Ingresar las credenciales de administrador:

   | Campo | Valor |
   |-------|-------|
   | Email | `admin@tecnolight.com.ar` |
   | Contraseña | *(la configurada en `.env` → `ADMIN_PASSWORD`)* |

3. Al iniciar sesión correctamente, serás redirigido al **Dashboard de Administración**.

> ⚠️ **Seguridad:** Cambiar la contraseña por defecto inmediatamente después del primer acceso usando la opción "Cambiar Contraseña".

---

## Navegación del Panel

El panel tiene tres secciones principales accesibles desde la barra lateral izquierda:

| Sección | Ícono | Descripción |
|---------|-------|-------------|
| **Consultas** | ✉️ | Mensajes recibidos del formulario de contacto |
| **Productos** | 📦 | Catálogo de señales y cartelería |
| **Proyectos** | 🧭 | Galería de obras realizadas |

---

## Gestión de Consultas (Formulario de Contacto)

### Ver una consulta

1. En la sección **Consultas**, la tabla muestra todas las consultas recibidas.
2. Las consultas **no leídas** aparecen en negrita.
3. Hacé clic en el ícono 👁️ **Ver** para ver el mensaje completo en un modal.

### Marcar como leída

- Desde la tabla: clic en el ícono ✅ (solo aparece en consultas no leídas).
- Desde el modal de detalle: botón **"Marcar como Leído"**.

### Responder una consulta

El panel muestra el email del remitente como enlace `mailto:`. Hacé clic para abrir tu cliente de correo predeterminado con el email pre-cargado.

### Eliminar una consulta

- Desde la tabla: clic en el ícono 🗑️ rojo.
- Desde el modal: botón **"Eliminar Consulta"**.
- Se pedirá confirmación antes de eliminar.

> ⚠️ La eliminación es **permanente** e irreversible.

---

## Gestión de Productos (Catálogo)

### Ver el catálogo

La sección **Productos** muestra todos los productos, incluyendo los ocultos (pausados).

### Agregar un producto nuevo

1. Clic en el botón **"+ Agregar Producto"** (esquina superior derecha).
2. Completar el formulario:

   | Campo | Descripción | Obligatorio |
   |-------|-------------|-------------|
   | **Nombre** | Nombre descriptivo del producto | ✅ |
   | **Slug de URL** | Identificador único sin espacios ni acentos (ej: `senal-pare`) | ✅ |
   | **Categoría** | Reglamentarias / Preventivas / Informativas / Cartelería Comercial | ✅ |
   | **Precio (ARS)** | Precio unitario. Si se deja vacío, aparece "Cotizar" en el catálogo | ❌ |
   | **Descripción** | Texto descriptivo para el catálogo público | ✅ |
   | **Especificaciones Técnicas** | Una especificación por línea (ej: `Material: Aluminio`) | ❌ |
   | **Visibilidad** | Activo (visible en catálogo) / Pausado (oculto) | ✅ |

3. Clic en **"Guardar"**.

> 💡 **Tip sobre el Slug:** El slug debe ser único. Si dos productos tienen el mismo slug, el segundo no podrá guardarse. Usar guiones `-` en lugar de espacios. Ejemplos: `senal-pare`, `panel-direccional-vial`, `cartel-municipal-tipo-a`.

### Editar un producto existente

1. Clic en el ícono ✏️ **Editar** de la fila del producto.
2. Modificar los campos deseados.
3. Clic en **"Guardar"**.

### Pausar / Ocultar un producto

Para ocultar temporalmente un producto del catálogo público sin eliminarlo:

1. Clic en ✏️ **Editar**.
2. Cambiar **Visibilidad** a **"Oculto / Pausado"**.
3. Guardar.

El producto seguirá visible en el panel de admin pero no aparecerá en el sitio público.

### Eliminar un producto

1. Clic en el ícono 🗑️ rojo.
2. Confirmar la eliminación en el diálogo.

> ⚠️ La eliminación es permanente. Si tenés dudas, mejor pausa el producto.

---

## Gestión de Proyectos (Portfolio)

### Agregar un proyecto nuevo

1. Clic en **"+ Agregar Proyecto"**.
2. Completar el formulario:

   | Campo | Descripción | Ejemplo |
   |-------|-------------|---------|
   | **Título** | Nombre descriptivo del proyecto | `Señalización Autopista Rosario-Santa Fe` |
   | **Slug** | URL única (sin espacios ni acentos) | `autopista-rosario-santa-fe` |
   | **Cliente** | Empresa o municipio contratante | `Municipalidad de Santa Fe` |
   | **Ubicación** | Provincia y ciudad | `Santa Fe, Argentina` |
   | **Descripción** | Detalle de los trabajos realizados | Texto libre |
   | **Testimonio** | Cita del cliente sobre el trabajo | Texto libre (opcional) |
   | **Estado** | Activo (visible) / Pausado (oculto) | — |

### Editar y eliminar proyectos

Igual que con los productos: ícono ✏️ para editar y 🗑️ para eliminar.

---

## Seguridad del Panel

### Sesión automática

La sesión tiene una duración de **7 días**. Después de ese período, el sistema pedirá que inicies sesión nuevamente. Para cerrar sesión manualmente, hacer clic en **"Cerrar Sesión"** en la barra lateral.

### Cerrar sesión

Clic en el botón **"Cerrar Sesión"** (ícono de salida, parte inferior de la barra lateral).

### Cambiar contraseña

Actualmente se puede hacer mediante la API directamente:

```bash
curl -X PUT http://localhost:5000/api/auth/change-password \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"currentPassword": "Tecnolight2024!", "newPassword": "NuevaContraseña123!"}'
```

> 🔜 En la próxima versión, habrá una interfaz gráfica para cambiar la contraseña desde el panel.

---

## Preguntas Frecuentes

**¿Qué pasa si olvido la contraseña?**

Un desarrollador debe ejecutar en el servidor:
```bash
cd backend
npm run seed -- --reset-admin
```
Esto restablece la contraseña al valor de `ADMIN_PASSWORD` en el `.env`.

**¿Puedo tener múltiples administradores?**

Actualmente el sistema soporta un administrador por defecto. Para agregar más administradores, un desarrollador puede hacerlo directamente desde Prisma Studio:
```bash
cd backend
npx prisma studio
```
Navegar a la tabla `User` y crear un nuevo registro con `role: ADMIN`.

**¿Los emails de contacto llegan automáticamente?**

Sí, siempre que el backend tenga configuradas las credenciales SMTP en el `.env`:
- `EMAIL_USER` y `EMAIL_PASS` deben estar completos.
- Para Gmail, se necesita una **Contraseña de Aplicación** (no la contraseña normal): [Crear contraseña de app en Google](https://myaccount.google.com/apppasswords).

**¿Cómo agrego imágenes a los productos?**

En la versión actual, las imágenes se referencian por URL externa. En la próxima versión se implementará subida directa de archivos (Cloudinary). Por ahora:
1. Subir la imagen a un servicio como Cloudinary, ImgBB o el propio servidor.
2. Copiar la URL de la imagen.
3. En el campo de especificaciones, agregar: `imageUrl: https://...`.

---

## Soporte Técnico

Para problemas técnicos con el panel, contactar al equipo de desarrollo con:
- Descripción del problema
- Captura de pantalla del error
- Pasos para reproducirlo

**Tecnolight** · [tecnolight.com.ar](https://tecnolight.com.ar) · Santa Fe, Argentina
