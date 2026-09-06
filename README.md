# ClinicaNutricionalNutriVida

## Despliegue en Producción

El proyecto se encuentra publicado y accesible a través de GitHub Pages:  
https://maxijrrr.github.io/ClinicaNutricionalNutriVida/

## Contexto de Negocio

NutriVida es un centro de atención nutricional integral fundado en Temuco que atiende un promedio de 60 pacientes semanales mediante un equipo de 4 especialistas.

### Problemática Identificada
* **Proceso de atención manual:** La gestión de horas y la coordinación médica se realizaban exclusivamente de manera telefónica o presencial mediante agendas en papel.
* **Tasa de inasistencia (20%):** La falta de un canal de confirmación generaba horas profesionales desaprovechadas e ineficiencia operativa.
* **Ausencia de catálogo unificado:** Los pacientes no disponían de un medio digital para conocer el tarifario, los planes especializados ni las áreas de atención de los nutricionistas.

### Alcance de la Solución
Desarrollo de una plataforma web pública disponible de forma continua, que centraliza la oferta de servicios y automatiza la captura de solicitudes de consulta. Se implementaron validaciones de datos en cliente para garantizar que el personal administrativo reciba información consistente y libre de solapamientos horarios.

## Tecnologías Implementadas

* **HTML5:** Marcado estructurado aplicando elementos semánticos estándar (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) y vinculación estricta de formularios (`<label for>` y `<input id>`).
* **CSS3:** Hoja de estilos centralizada externa (`css/style.css`), layouts basados en Flexbox y CSS Grid, y reglas de diseño responsivo (`@media (max-width: 768px)`) para adaptación en dispositivos móviles.
* **JavaScript (Vanilla):** Lógica del lado del cliente sin librerías externas para manipulación del DOM, cálculo dinámico de bloques de atención y validaciones de datos.
* * **Git y GitHub:** Control de versiones colaborativo mediante commits semánticos y sincronización remota.

## Estructura del Proyecto

clinica-nutrivida/
├── css/
│   └── style.css            # Hoja de estilos centralizada y responsiva
├── img/
│   └── nutricionn.png       # Recursos gráficos e imágenes del sitio
├── js/
│   └── funciones.js        # Lógica de validaciones y dinamismo del DOM
├── contacto.html           # Formulario de agendamiento 
├── index.html              # Página principal e información institucional
├── README.md               # Documentación técnica del proyecto
└── servicios.html          # Directorio de profesionales y catálogo 
