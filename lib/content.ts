// Todo el contenido del portfolio. Las páginas solo lo pintan.

export type MenuItem = { title: string; subtitle: string; url: string };

export type ActionLink = {
  name: string;
  url: string;
  isExternal: boolean;
  download?: string;
};

export type Estudio = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  centro: string;
  fecha: string;
  desc: string;
  tags: string[];
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
  desc: string;
  imageUrl: string | undefined;
  imagePlaceholder: string;
  /** "icon": imagen cuadrada tipo icono de app, se muestra centrada y entera. */
  imageFit?: "cover" | "icon";
};

export type Skill = { name: string; level: number };

export type SkillCategory = {
  id: string;
  title: string;
  subtitle: string;
  skills: Skill[];
};

export type SocialLink = {
  id: string;
  level: string;
  name: string;
  description: string;
  url: string;
};

/* ---------- Menú principal ---------- */

export const menuItems: MenuItem[] = [
  { title: "PROYECTOS", subtitle: "Infiltrations & Apps", url: "/portfolio/proyectos" },
  { title: "ESTUDIOS", subtitle: "Academic Stats", url: "/portfolio/estudios" },
  { title: "HABILIDADES", subtitle: "Technical Skills", url: "/portfolio/habilidades" },
  { title: "SOCIAL LINK", subtitle: "Contact & Network", url: "/portfolio/social" },
];

export const actionLinks: ActionLink[] = [
  { name: "GITHUB", url: "https://github.com/Navi412", isExternal: true },
  {
    name: "CURRICULUM",
    url: "/Curriculum%20Vitae%20CV%20Iv%C3%A1n%20Mart%C3%ADn%20Vallejo.pdf",
    isExternal: true,
    download: "Curriculum Vitae CV Iván Martín Vallejo.pdf",
  },
  { name: "CARTA RECOMEND.", url: "/portfolio/carta", isExternal: false },
];

/* ---------- Estudios ---------- */

export const estudios: Estudio[] = [
  {
    id: "01",
    title: "CURSO DE ESPECIALIZACIÓN EN INTELIGENCIA ARTIFICIAL Y BIG DATA",
    subtitle: "TÍTULO OFICIAL DE FP · 600 H · PRESENCIAL",
    status: "EN CURSO",
    centro: "Instituto Nebrija de Formación Profesional (Nebrija FP) · Campus de Princesa, Madrid",
    fecha: "2026 - 2027",
    desc: "Amplío mi perfil de desarrollador con una especialización oficial en inteligencia artificial y big data, basada en proyectos y con enfoque laboral. Quiero aprender a analizar datos y a aplicar modelos de IA para llevarlos a las aplicaciones y videojuegos que desarrollo.",
    tags: ["Inteligencia Artificial", "Big Data", "Análisis de Datos", "Aprendizaje por Proyectos"],
    logo: "/logotipo-universidad-nebrija.jpg",
    enCurso: true,
  },
  {
    id: "02",
    title: "DESARROLLO DE APLICACIONES MULTIPLATAFORMA",
    subtitle: "GRADO SUPERIOR (DAM)",
    status: "COMPLETADO",
    centro: "iFP - Innovación en Formación Profesional",
    fecha: "2024 - 2026",
    desc: "Especialización en desarrollo de software, diseño de interfaces, acceso a bases de datos y programación orientada a objetos. La base principal del arsenal técnico.",
    tags: ["Java", "C#", "Bases de Datos", "Interfaces UI/UX"],
    logo: "/logo-centro.png",
  },
  {
    id: "03",
    title: "BACHILLERATO EN CIENCIAS SOCIALES",
    subtitle: "EDUCACIÓN SECUNDARIA POSTOBLIGATORIA",
    status: "COMPLETADO",
    centro: "Colegio Guzmán el Bueno",
    fecha: "2023 - 2024",
    desc: "Base académica con fuerte enfoque en matemáticas, física y tecnología. Fundamentos lógicos y analíticos preparatorios para la programación avanzada.",
    tags: ["Matemáticas", "Física", "Tecnología Industrial"],
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
    desc: "Videojuego de plataformas Metroidvania en 2D. Diseño completo de físicas, combate ágil, mecánicas de plataformeo e integración de animaciones pixel-art propias.",
    imageUrl: "/pigmentum-bg.png",
    imagePlaceholder: "PIGMENTUM_GAMEPLAY.GIF",
  },
  {
    id: "02",
    slug: "backlog",
    title: "Backlog",
    type: "APP // DESKTOP & ANDROID",
    tech: ["Node.js", "node:sqlite", "Electron", "Vanilla JS"],
    desc: "App personal para llevar un registro único de tu biblioteca de videojuegos y horas jugadas, sincronizando Steam, Xbox/Game Pass y Epic automáticamente. Deriva las sesiones jugadas a partir de snapshots periódicos del contador acumulado, ya que ninguna API ofrece histórico directo.",
    imageUrl: "/backlog-tarjeta.png",
    imagePlaceholder: "BACKLOG_APP.PNG",
  },
];

/** Color de acento propio de cada proyecto (se reutiliza en su detalle). */
export const projectAccents: Record<string, string> = {
  pigmentum: "#a855f7",
  backlog: "#3b82f6",
};

export const pigmentum = {
  gameUrl: "/pigmentum/index.html",
  tech: ["Unity 3D", "C#", "Pixel Art", "WebGL"],
  label: "METROIDVANIA 2D",
  desc: "Videojuego de plataformas Metroidvania en 2D. Diseño completo de físicas, combate ágil, mecánicas de plataformeo e integración de animaciones pixel-art propias. Desarrollado íntegramente en Unity, con exportación a WebGL para jugarse directamente en el navegador.",
};

export const backlog = {
  repoUrl: "https://github.com/Navi412/App-Steamdb",
  tech: ["Node.js", "node:sqlite", "Electron", "HTML/CSS/JS", "GitHub Actions"],
  intro: "Todas tus horas de juego de Steam, Xbox y Epic en un solo sitio.",
  label: "TRACKER DE VIDEOJUEGOS",
  desc: "Nació de querer saber cuántas horas llevo jugadas en total. Cada launcher guarda las suyas por separado, así que Backlog las junta en una sola biblioteca.",
  funcionalidades: [
    "Sincroniza automáticamente la biblioteca de Steam y, opcionalmente, Xbox/Game Pass y Epic Games.",
    "Guarda snapshots periódicos del contador acumulado de horas y deriva sola cuánto se jugó en cada intervalo, ya que ninguna API ofrece histórico directo.",
    "Permite añadir a mano juegos de otras plataformas (Nintendo físico, etc.).",
    "Enriquece cada juego con el tiempo estimado para completarlo vía IGDB.",
    "Carátulas personalizables por juego, subiendo imagen o pegando una URL.",
    "Onboarding guiado que conecta cada plataforma con validación en vivo contra la API real.",
  ],
};

/* ---------- Habilidades ---------- */

export const skillCategories: SkillCategory[] = [
  {
    id: "01",
    title: "Game Dev & Arte 2D",
    subtitle: "Motor & Creatividad",
    skills: [
      { name: "Unity 3D", level: 90 },
      { name: "C# Scripting", level: 85 },
      { name: "Aseprite & Piskel", level: 95 },
      { name: "Photoshop (UI/Sprites)", level: 80 },
    ],
  },
  {
    id: "02",
    title: "Desarrollo Web",
    subtitle: "Frontend & Frameworks",
    skills: [
      { name: "Next.js & React", level: 95 },
      { name: "Angular", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Git & GitLab (Versiones)", level: 85 },
    ],
  },
  {
    id: "03",
    title: "Sistemas & Móvil",
    subtitle: "Nativo & Hardware",
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
    name: "MAIL DIRECTO",
    description:
      "Línea directa de comunicación. Haz clic para abrir Gmail y enviarme un mensaje profesional directamente.",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=ivanmv412@gmail.com&su=Queremos%20contratarte!!",
  },
  {
    id: "02",
    level: "ACCESS // LEVEL 02",
    name: "LINKEDIN",
    description:
      "Red profesional. Conexión directa para propuestas de desarrollo de software, colaboraciones técnicas y oportunidades laborales.",
    url: "https://www.linkedin.com/in/iv%C3%A1n-martin-vallejo",
  },
];

export const phone = { href: "tel:682378476", label: "682 37 84 76" };

/* ---------- Carta de recomendación ---------- */

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
