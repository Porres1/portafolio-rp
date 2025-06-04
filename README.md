# Portafolio Inmersivo - Rodrigo Porres

Este es el código fuente para la página web de portafolio de Rodrigo Porres, creada con HTML5, Tailwind CSS, y JavaScript.

## Características

- Diseño responsive adaptable a escritorio, tablet y móvil.
- Navegación fija (sticky) con scroll suave.
- Animaciones al hacer scroll (AOS.js).
- Carrusel de certificados (Swiper.js).
- Fondo animado con partículas (Particles.js) en la sección Hero.

## Estructura de Carpetas

```
/portafolio-rp
|-- /assets
|   |-- /css
|   |   |-- style.css         # Estilos personalizados
|   |-- /js
|   |   |-- script.js         # Lógica de JavaScript (menú, animaciones, carrusel)
|   |-- /img
|   |   |-- rodri-foto.jpg    # Foto de perfil (reemplazar con la real)
|   |   |-- placeholder-profile.jpg # Placeholder si no hay foto real
|   |   |-- placeholder-cert.jpg    # Placeholder para certificados
|   |   |-- placeholder-project.jpg # Placeholder para proyectos
|   |   |-- /certificados       # Carpeta para imágenes de certificados (JPEG)
|   |       |-- cert1.jpg
|   |       |-- cert2.jpg
|   |-- CV-Rodrigo-Porres.pdf # CV para descargar (reemplazar con el real)
|-- index.html                # Archivo HTML principal
|-- README.md                 # Este archivo
```

## Visualización

1.  Clona o descarga este repositorio.
2.  Abre el archivo `index.html` en tu navegador web.

## Despliegue en Netlify

1.  Crea una cuenta en [Netlify](https://www.netlify.com/).
2.  Arrastra la carpeta raíz del proyecto (`portafolio-rp`) a la sección de "Sites" en Netlify para un despliegue manual.
3.  Alternativamente, conecta tu repositorio de Git (GitHub, GitLab, Bitbucket) a Netlify para despliegues automáticos cada vez que hagas `push` a tu rama principal.

## Dependencias (CDN)

-   [Tailwind CSS](https://tailwindcss.com/)
-   [AOS.js (Animate On Scroll)](https://michalsnik.github.io/aos/)
-   [Particles.js](https://vincentgarreau.com/particles.js/)
-   [Swiper.js](https://swiperjs.com/)

## Personalización

-   **Contenido:** Edita directamente el archivo `index.html` para cambiar textos, descripciones, enlaces, etc.
-   **Imágenes:**
    -   Reemplaza `assets/img/rodri-foto.jpg` (o `placeholder-profile.jpg`) con tu foto de perfil.
    -   Coloca las imágenes de tus certificados (formato JPEG) en la carpeta `assets/img/certificados/` y actualiza las rutas en la sección de Certificados del `index.html`.
    -   Reemplaza las imágenes `placeholder-project.jpg` con las de tus proyectos y actualiza las rutas.
    -   Añade tu CV en formato PDF como `assets/CV-Rodrigo-Porres.pdf` y asegúrate que el enlace de descarga en la sección Hero sea correcto.
-   **Estilos:** Modifica `assets/css/style.css` para ajustes de diseño adicionales.
-   **Scripts:** Ajusta `assets/js/script.js` si necesitas cambiar el comportamiento de las animaciones o el carrusel.

## Iconos

Para los iconos en las secciones de Habilidades y Contacto (LinkedIn, GitHub, Email), se recomienda usar una librería como [Font Awesome](https://fontawesome.com/) o SVGs personalizados. Actualmente, el HTML tiene placeholders `<i>` que necesitarán ser actualizados con los iconos reales.

Ejemplo con Font Awesome (requiere añadir el CDN de Font Awesome en el `<head>` del `index.html`):

```html
<head>
    <!-- ... otros enlaces ... -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
```

Y luego usar las clases correspondientes:
`<i class="fab fa-linkedin"></i>`
`<i class="fab fa-github"></i>`
`<i class="fas fa-envelope"></i>`