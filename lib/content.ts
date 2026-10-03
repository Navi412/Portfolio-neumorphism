// Todo el contenido del portfolio. Las páginas solo lo pintan.
// Los textos son `Loc<…>`: una cadena si es igual en ambos idiomas, o { es, en }.

import type { Loc } from "@/lib/i18n";

type Text = Loc<string>;

export type MenuItem = { title: Text; subtitle: string; url: string };

export type ActionLink = {
  name: Text;
  icon: "github" | "cv" | "letter";
  url: string;
  isExternal: boolean;
  download?: string;
};

export type Estudio = {
  id: string;
  title: Text;
  subtitle: Text;
  status: Text;
  centro: Text;
  fecha: string;
  desc: Text;
  tags: Loc<string[]>;
  logo?: string;
  /** Formación todavía en curso o por empezar (cambia el indicador de estado). */
  enCurso?: boolean;
};

export type Proyecto = {
  id: string;
  slug: string;
  title: string;
  type: string;
  tech: string[];
  desc: Text;
  imageUrl: string | undefined;
  imagePlaceholder: string;
  /** "icon": imagen cuadrada tipo icono de app, se muestra centrada y entera. */
  imageFit?: "cover" | "icon";
  /** Proyecto todavía en desarrollo (muestra un aviso en la tarjeta). */
  enDesarrollo?: boolean;
};

export type Skill = { name: Text; level: number };

export type SkillCategory = {
  id: string;
  title: Text;
  subtitle: Text;
  skills: Skill[];
};

export type SocialLink = {
  id: string;
  level: string;
  name: Text;
  description: Text;
  url: Text;
};

/* ---------- Menú principal ---------- */

export const menuItems: MenuItem[] = [
  { title: { es: "PROYECTOS", en: "PROJECTS" }, subtitle: "Infiltrations & Apps", url: "/portfolio/proyectos" },
  { title: { es: "ESTUDIOS", en: "EDUCATION" }, subtitle: "Academic Stats", url: "/portfolio/estudios" },
  { title: { es: "HABILIDADES", en: "SKILLS" }, subtitle: "Technical Skills", url: "/portfolio/habilidades" },
  { title: "SOCIAL LINK", subtitle: "Contact & Network", url: "/portfolio/social" },
];

export const actionLinks: ActionLink[] = [
  { name: "GITHUB", icon: "github", url: "https://github.com/Navi412", isExternal: true },
  {
    name: { es: "CURRICULUM", en: "RESUME" },
    icon: "cv",
    url: "/Curriculum%20Vitae%20CV%20Iv%C3%A1n%20Mart%C3%ADn%20Vallejo.pdf",
    isExternal: true,
    download: "Curriculum Vitae CV Iván Martín Vallejo.pdf",
  },
  { name: { es: "CARTA RECOMEND.", en: "REFERENCE" }, icon: "letter", url: "/portfolio/carta", isExternal: false },
];

/* ---------- Estudios ---------- */

const COMPLETADO = { es: "COMPLETADO", en: "COMPLETED" };

export const estudios: Estudio[] = [
  {
    id: "01",
    title: {
      es: "CURSO DE ESPECIALIZACIÓN EN INTELIGENCIA ARTIFICIAL Y BIG DATA",
      en: "SPECIALIZATION COURSE IN ARTIFICIAL INTELLIGENCE AND BIG DATA",
    },
    subtitle: {
      es: "TÍTULO OFICIAL DE FP · 600 H · PRESENCIAL",
      en: "OFFICIAL VOCATIONAL QUALIFICATION · 600 H · ON-SITE",
    },
    status: { es: "EN CURSO", en: "IN PROGRESS" },
    centro: {
      es: "Instituto Nebrija de Formación Profesional (Nebrija FP) · Campus de Princesa, Madrid",
      en: "Instituto Nebrija de Formación Profesional (Nebrija FP) · Princesa Campus, Madrid",
    },
    fecha: "2026 - 2027",
    desc: {
      es: "Amplío mi perfil de desarrollador con una especialización oficial en inteligencia artificial y big data, basada en proyectos y con enfoque laboral. Quiero aprender a analizar datos y a aplicar modelos de IA para llevarlos a las aplicaciones y videojuegos que desarrollo.",
      en: "I'm expanding my developer profile with an official specialization in artificial intelligence and big data, project-based and career-focused. I want to learn to analyze data and apply AI models to the apps and games I build.",
    },
    tags: {
      es: ["Inteligencia Artificial", "Big Data", "Análisis de Datos", "Aprendizaje por Proyectos"],
      en: ["Artificial Intelligence", "Big Data", "Data Analysis", "Project-Based Learning"],
    },
    logo: "/logotipo-universidad-nebrija.jpg",
    enCurso: true,
  },
  {
    id: "02",
    title: { es: "DESARROLLO DE APLICACIONES MULTIPLATAFORMA", en: "MULTIPLATFORM APPLICATION DEVELOPMENT" },
    subtitle: { es: "GRADO SUPERIOR (DAM)", en: "HIGHER VOCATIONAL DEGREE (DAM)" },
    status: COMPLETADO,
    centro: "iFP - Innovación en Formación Profesional",
    fecha: "2024 - 2026",
    desc: {
      es: "Especialización en desarrollo de software, diseño de interfaces, acceso a bases de datos y programación orientada a objetos. La base principal del arsenal técnico.",
      en: "Specialization in software development, interface design, database access and object-oriented programming. The core of my technical arsenal.",
    },
    tags: {
      es: ["Java", "C#", "Bases de Datos", "Interfaces UI/UX"],
      en: ["Java", "C#", "Databases", "UI/UX Interfaces"],
    },
    logo: "/logo-centro.png",
  },
  {
    id: "03",
    title: { es: "BACHILLERATO EN CIENCIAS SOCIALES", en: "HIGH SCHOOL DIPLOMA IN SOCIAL SCIENCES" },
    subtitle: { es: "EDUCACIÓN SECUNDARIA POSTOBLIGATORIA", en: "UPPER SECONDARY EDUCATION" },
    status: COMPLETADO,
    centro: "Colegio Guzmán el Bueno",
    fecha: "2023 - 2024",
    desc: {
      es: "Base académica con fuerte enfoque en matemáticas, física y tecnología. Fundamentos lógicos y analíticos preparatorios para la programación avanzada.",
      en: "Academic foundation with a strong focus on mathematics, physics and technology. Logical and analytical groundwork for advanced programming.",
    },
    tags: {
      es: ["Matemáticas", "Física", "Tecnología Industrial"],
      en: ["Mathematics", "Physics", "Industrial Technology"],
    },
    logo: "/logo-bachiller.png",
  },
];

/* ---------- Proyectos ---------- */

export const proyectos: Proyecto[] = [
  {
    id: "01",
    slug: "pigmentum",
    title: "Pigmentum",
    type: "UNITY // GAME",
    tech: ["Unity 3D", "C#", "Pixel Art", "WebGL"],
    desc: {
      es: "Videojuego de plataformas Metroidvania en 2D. Diseño completo de físicas, combate ágil, mecánicas de plataformeo e integración de animaciones pixel-art propias.",
      en: "2D Metroidvania platformer. Full physics design, fast-paced combat, platforming mechanics and my own pixel-art animations.",
    },
    imageUrl: "/pigmentum-bg.png",
    imagePlaceholder: "PIGMENTUM_GAMEPLAY.GIF",
  },
  {
    id: "02",
    slug: "backlog",
    title: "Backlog",
    type: "APP // DESKTOP & ANDROID",
    tech: ["Node.js", "node:sqlite", "Electron", "Vanilla JS"],
    desc: {
      es: "App personal para llevar un registro único de tu biblioteca de videojuegos y horas jugadas, sincronizando Steam, Xbox/Game Pass y Epic automáticamente. Deriva las sesiones jugadas a partir de snapshots periódicos del contador acumulado, ya que ninguna API ofrece histórico directo.",
      en: "Personal app that keeps a single record of your game library and hours played, automatically syncing Steam, Xbox/Game Pass and Epic. It works out play sessions from periodic snapshots of the cumulative playtime counter, since no API provides that history directly.",
    },
    imageUrl: "/backlog-tarjeta-limpia.png",
    imagePlaceholder: "BACKLOG_APP.PNG",
  },
  {
    id: "03",
    slug: "app-video",
    title: "App Video",
    type: "APP // DESKTOP VIDEO EDITOR",
    tech: ["TypeScript", "WebCodecs", "WebGL2", "Electron"],
    desc: {
      es: "Editor de vídeo multipista de escritorio hecho desde cero: decodifica, compone y exporta vídeo fotograma a fotograma con WebCodecs, sin el elemento <video> ni librerías de edición de terceros.",
      en: "Multitrack desktop video editor built from scratch: it decodes, composites and exports video frame by frame with WebCodecs, without the <video> element or third-party editing libraries.",
    },
    imageUrl: undefined,
    imagePlaceholder: "APP_VIDEO.MP4",
    enDesarrollo: true,
  },
];

/** Color de acento propio de cada proyecto (se reutiliza en su detalle). */
export const projectAccents: Record<string, string> = {
  pigmentum: "#a855f7",
  backlog: "#3b82f6",
  "app-video": "#f43f5e",
};

export const pigmentum = {
  gameUrl: "/pigmentum/index.html",
  tech: ["Unity 3D", "C#", "Pixel Art", "WebGL"],
  label: "METROIDVANIA 2D",
  desc: {
    es: "Videojuego de plataformas Metroidvania en 2D. Diseño completo de físicas, combate ágil, mecánicas de plataformeo e integración de animaciones pixel-art propias. Desarrollado íntegramente en Unity, con exportación a WebGL para jugarse directamente en el navegador.",
    en: "2D Metroidvania platformer. Full physics design, fast-paced combat, platforming mechanics and my own pixel-art animations. Built entirely in Unity and exported to WebGL so it can be played right in the browser.",
  } satisfies Text,
};

export const backlog = {
  repoUrl: "https://github.com/Navi412/App-Steamdb",
  tech: ["Node.js", "node:sqlite", "Electron", "HTML/CSS/JS", "GitHub Actions"],
  intro: {
    es: "Todas tus horas de juego de Steam, Xbox y Epic en un solo sitio.",
    en: "All your gaming hours from Steam, Xbox and Epic in one place.",
  } satisfies Text,
  label: { es: "TRACKER DE VIDEOJUEGOS", en: "GAME TRACKER" } satisfies Text,
  desc: {
    es: "Nació de querer saber cuántas horas llevo jugadas en total. Cada launcher guarda las suyas por separado, así que Backlog las junta en una sola biblioteca.",
    en: "It started because I wanted to know how many hours I've played in total. Each launcher keeps its own count, so Backlog brings them together in a single library.",
  } satisfies Text,
  funcionalidades: {
    es: [
      "Sincroniza automáticamente la biblioteca de Steam y, opcionalmente, Xbox/Game Pass y Epic Games.",
      "Guarda snapshots periódicos del contador acumulado de horas y deriva sola cuánto se jugó en cada intervalo, ya que ninguna API ofrece histórico directo.",
      "Permite añadir a mano juegos de otras plataformas (Nintendo físico, etc.).",
      "Enriquece cada juego con el tiempo estimado para completarlo vía IGDB.",
      "Carátulas personalizables por juego, subiendo imagen o pegando una URL.",
      "Onboarding guiado que conecta cada plataforma con validación en vivo contra la API real.",
    ],
    en: [
      "Automatically syncs your Steam library and, optionally, Xbox/Game Pass and Epic Games.",
      "Stores periodic snapshots of the cumulative hours counter and works out how much was played in each interval, since no API offers that history directly.",
      "Lets you add games from other platforms by hand (physical Nintendo copies, etc.).",
      "Enriches each game with its estimated time to beat via IGDB.",
      "Custom covers per game, by uploading an image or pasting a URL.",
      "Guided onboarding that connects each platform with live validation against the real API.",
    ],
  } satisfies Loc<string[]>,
};

export const appVideo = {
  repoUrl: "https://github.com/Navi412/App-Editor",
  tech: ["TypeScript", "WebCodecs", "mp4box.js", "Web Audio API", "Canvas 2D", "WebGL2", "Vite", "Vitest", "Electron"],
  intro: {
    es: "Un editor de vídeo no lineal (NLE) de escritorio, inspirado en DaVinci Resolve y Premiere, construido desde cero.",
    en: "A desktop non-linear video editor (NLE), inspired by DaVinci Resolve and Premiere, built from scratch.",
  } satisfies Text,
  label: { es: "EDITOR DE VÍDEO (NLE)", en: "VIDEO EDITOR (NLE)" } satisfies Text,
  desc: {
    es: "Funciona sobre tecnologías web modernas y se empaqueta como aplicación nativa con Electron. El objetivo es que se use como un editor de escritorio de verdad, no como una web metida en una ventana.",
    en: "It runs on modern web technologies and is packaged as a native app with Electron. The goal is for it to feel like a real desktop editor, not a website stuck inside a window.",
  } satisfies Text,
  stats: [
    { value: "~8.200", label: { es: "líneas de TypeScript", en: "lines of TypeScript" } },
    { value: "153", label: { es: "tests automáticos", en: "automated tests" } },
    { value: "12", label: { es: "commits desde ago. 2026", en: "commits since Aug 2026" } },
  ] satisfies { value: string; label: Text }[],
  funcionalidades: {
    es: [
      "Línea de tiempo multipista con varias pistas de vídeo y de audio. Las pistas se pueden añadir, ocultar, silenciar y renombrar.",
      "Edición básica de clips: cargar, recortar entrada y salida, mover, cortar (split) y pasar clips de una pista a otra. Deja huecos libres entre clips y tiene imán (snapping) desactivable.",
      "Recorte profesional: ripple opcional con Mayús y controles J/K/L de navegación al estilo de los NLE.",
      "Transiciones entre clips: fundido cruzado y fundido a negro.",
      "Texto superpuesto que se arrastra directamente sobre el preview, con tipografía a elegir.",
      "Audio: mezcla en tiempo real de todas las pistas, puntos de volumen dentro de cada clip y un máster con EQ de 3 bandas y compresor/limitador.",
      "Color: filtros predefinidos, corrección de color real en GPU (lift/gamma/gain con la fórmula ASC CDL, saturación y contraste) y croma. Se pueden guardar filtros propios.",
      "Exportación a MP4 con audio, renderizada fotograma a fotograma.",
      "Flujo de escritorio: menú nativo, bin de medios, marcadores, banderas en los clips, deshacer/rehacer, proyectos que vuelven a enlazar sus archivos solos y tema neumórfico claro u oscuro.",
    ],
    en: [
      "Multitrack timeline with several video and audio tracks. Tracks can be added, hidden, muted and renamed.",
      "Basic clip editing: load, trim in and out, move, split and move clips between tracks. Leaves free gaps between clips and has snapping that can be turned off.",
      "Pro trimming: optional ripple with Shift and NLE-style J/K/L navigation controls.",
      "Transitions between clips: cross-dissolve and fade to black.",
      "Text overlays dragged directly on the preview, with a choice of typeface.",
      "Audio: real-time mixing of every track, volume points inside each clip, and a master bus with 3-band EQ and compressor/limiter.",
      "Color: presets, real GPU color correction (lift/gamma/gain with the ASC CDL formula, saturation and contrast) and chroma key. Users can save their own filters.",
      "MP4 export with audio, rendered frame by frame.",
      "Desktop workflow: native menu, media bin, markers, clip flags, undo/redo, projects that relink their files on their own, and a light or dark neumorphic theme.",
    ],
  } satisfies Loc<string[]>,
  decisiones: {
    es: [
      {
        title: "La línea de tiempo es un modelo de datos puro",
        text: "Un clip solo guarda una referencia a su archivo y un rango de tiempo, nunca píxeles. Toda la lógica de edición son funciones puras sin dependencias del navegador, y se prueba con datos inventados, sin archivos de vídeo reales.",
      },
      {
        title: "Tiempo en ticks enteros",
        text: "El tiempo se mide en ticks enteros (600.000 por segundo) en vez de segundos con decimales. Así se evitan los errores de redondeo y los desfases de sincronización entre frame rates distintos.",
      },
      {
        title: "Capas con dependencias en un solo sentido",
        text: "ui → export → media → core. Cada capa solo conoce a las que tiene debajo.",
      },
      {
        title: "Lo que ves es lo que exportas",
        text: "El preview y la exportación comparten el mismo código de render, color y mezcla de audio.",
      },
      {
        title: "Memoria de GPU gestionada a mano",
        text: "Cada fotograma de vídeo se libera en cuanto deja de hacer falta. Gracias a eso encontré y corregí un bloqueo del decodificador por hardware que congelaba el vídeo después de un corte.",
      },
      {
        title: "Puente nativo mínimo y aislado",
        text: "El renderer no tiene acceso a Node. Solo una API estrecha y explícita da acceso al sistema de archivos.",
      },
    ],
    en: [
      {
        title: "The timeline is a pure data model",
        text: "A clip only stores a reference to its file and a time range, never pixels. All editing logic is pure functions with no browser dependencies, tested with made-up data and no real video files.",
      },
      {
        title: "Time in integer ticks",
        text: "Time is measured in integer ticks (600,000 per second) instead of decimal seconds. This avoids rounding errors and sync drift between different frame rates.",
      },
      {
        title: "Layers with one-way dependencies",
        text: "ui → export → media → core. Each layer only knows about the ones below it.",
      },
      {
        title: "What you see is what you export",
        text: "Preview and export share the same render, color and audio-mixing code.",
      },
      {
        title: "Hand-managed GPU memory",
        text: "Each video frame is released as soon as it's no longer needed. That's how I found and fixed a hardware decoder stall that froze the video after a cut.",
      },
      {
        title: "Minimal, isolated native bridge",
        text: "The renderer has no Node access. Only a narrow, explicit API reaches the file system.",
      },
    ],
  } satisfies Loc<{ title: string; text: string }[]>,
  proximosPasos: {
    es: [
      "Línea de tiempo dibujada íntegramente en canvas, para mejorar el rendimiento.",
      "Instalador para distribuir la aplicación.",
      "Ampliar las funciones de edición y de color.",
    ],
    en: [
      "A timeline drawn entirely on canvas, for better performance.",
      "An installer to distribute the app.",
      "More editing and color features.",
    ],
  } satisfies Loc<string[]>,
};

/* ---------- Habilidades ---------- */

export const skillCategories: SkillCategory[] = [
  {
    id: "01",
    title: { es: "Game Dev & Arte 2D", en: "Game Dev & 2D Art" },
    subtitle: { es: "Motor & Creatividad", en: "Engine & Creativity" },
    skills: [
      { name: "Unity 3D", level: 90 },
      { name: "C# Scripting", level: 85 },
      { name: "Aseprite & Piskel", level: 95 },
      { name: "Photoshop (UI/Sprites)", level: 80 },
    ],
  },
  {
    id: "02",
    title: { es: "Desarrollo Web", en: "Web Development" },
    subtitle: "Frontend & Frameworks",
    skills: [
      { name: "Next.js & React", level: 95 },
      { name: "Angular", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: { es: "Git & GitLab (Versiones)", en: "Git & GitLab (Versioning)" }, level: 85 },
    ],
  },
  {
    id: "03",
    title: { es: "Sistemas & Móvil", en: "Systems & Mobile" },
    subtitle: { es: "Nativo & Hardware", en: "Native & Hardware" },
    skills: [
      { name: "Kotlin (Android)", level: 85 },
      { name: "Hardware & BIOS", level: 90 },
      { name: "VR Setup & Streaming", level: 85 },
    ],
  },
];

export const skillAccents = ["#a855f7", "#f97316", "#10b981"];

/* ---------- Social ---------- */

export const socialLinks: SocialLink[] = [
  {
    id: "01",
    level: "ACCESS // LEVEL 01",
    name: { es: "MAIL DIRECTO", en: "DIRECT MAIL" },
    description: {
      es: "Línea directa de comunicación. Haz clic para abrir Gmail y enviarme un mensaje profesional directamente.",
      en: "A direct line of communication. Click to open Gmail and send me a professional message straight away.",
    },
    url: {
      es: "https://mail.google.com/mail/?view=cm&fs=1&to=ivanmv412@gmail.com&su=Queremos%20contratarte!!",
      en: "https://mail.google.com/mail/?view=cm&fs=1&to=ivanmv412@gmail.com&su=We%20want%20to%20hire%20you!!",
    },
  },
  {
    id: "02",
    level: "ACCESS // LEVEL 02",
    name: "LINKEDIN",
    description: {
      es: "Red profesional. Conexión directa para propuestas de desarrollo de software, colaboraciones técnicas y oportunidades laborales.",
      en: "Professional network. A direct connection for software development proposals, technical collaborations and job opportunities.",
    },
    url: "https://www.linkedin.com/in/iv%C3%A1n-martin-vallejo",
  },
];

export const phone = { href: "tel:682378476", label: "682 37 84 76" };

/* ---------- Carta de recomendación ---------- */
// El texto de la carta se mantiene en español en ambos idiomas: es el documento original firmado.

export const carta = {
  fileName: "> CARTA_RECOMENDACIÓN.TXT",
  pdfUrl: "/CartaRecomendación.pdf",
  pdfDownload: "CartaRecomendación.pdf",
  remitente: [
    "Joan Morera Perich",
    "Jefe del equipo de desarrollo del videojuego Moción",
    "Técnico Informático de Gestión (Universitat de Girona, 2005)",
    "Compañía de Jesús Provincia de España",
    "joanmorera@jesuitas.es",
    "Lleida, 8 de junio de 2026",
  ],
  saludo: "A quien pueda interesar:",
  despedida: "Sin otro particular, reciban un cordial saludo.",
  firma: ["Atentamente,", "Joan Morera Perich"],
  sello: ["[ FIRMA DIGITAL VALIDADA ]", "Emisor: MORERA PERICH JOAN", "Fecha: 08/06/2026"],
};
