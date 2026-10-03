// Textos de la interfaz en ambos idiomas. Se usan con `useStrings()`.

import { useLang, type Lang } from "@/lib/i18n";

const es = {
  // Controles globales
  themeLabel: "Modo oscuro",
  toLight: "Cambiar a modo claro",
  toDark: "Cambiar a modo oscuro",
  langLabel: "Idioma: español / inglés",
  toOtherLang: "Switch to English",

  // Portada
  studying: "Cursando IA y Big Data",
  graduated: "Graduado en DAM",
  enter: "Entrar al Portfolio",
  enterShort: "ENTRAR",
  viewSkills: "Ver habilidades",
  viewStudies: "Ver estudios",
  viewProject: (title: string) => `Ver proyecto ${title}`,

  // GitHub
  contributionsTitle: "contribuciones en el último año",
  contributionsAria: (n: number) => `${n} contribuciones en GitHub en el último año`,
  viewProfile: "Ver perfil ↗",
  activeDays: "Días con actividad",
  longestStreak: "Racha más larga",
  streakDays: (n: number) => `${n} ${n === 1 ? "día seguido" : "días seguidos"}`,
  bestDay: "Día más activo",
  contributions: (n: number) => `${n} ${n === 1 ? "contribución" : "contribuciones"}`,
  less: "Menos",
  more: "Más",
  months: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  weekdays: ["", "Lun", "", "Mié", "", "Vie", ""],
  formatDate: (d: number, m: string, y: number) => `${d} ${m} ${y}`,

  // Menú
  mainMenu: "Menú principal",
  countStudies: (n: number) => `${n} formaciones`,
  countProjects: (n: number) => `${n} proyectos`,
  countSkills: (n: number) => `${n} habilidades`,
  countChannels: (n: number) => `${n} canales`,

  // Cabeceras
  back: "ATRÁS",
  backToMenu: "ATRÁS AL MENÚ",
  goBack: "REGRESAR",
  studiesTitle: "Estudios",
  projectsTitle: "Log de Proyectos",
  projectsBadge: "PROYECTOS Y DESARROLLOS",
  skillsTitle: "Arsenal Técnico",
  socialBadge: "CONTACTEMOS",

  // Estudios / proyectos
  logoOf: (name: string) => `Logo de ${name}`,
  backgroundOf: (name: string) => `Fondo de ${name}`,
  iconOf: (name: string) => `Icono de ${name}`,
  seeProject: "▶ VER PROYECTO",

  // Pigmentum
  gameArea: "Zona de juego",
  playTitle: "Jugar Pigmentum",
  startGame: "▶ INICIAR INFILTRACIÓN",
  closeGame: "✖ CERRAR",
  fullscreen: "⛶ AMPLIAR",

  // Backlog
  viewRepo: "▶ VER REPOSITORIO EN GITHUB",
  whatItDoes: "Qué hace",
  howToUse: "Cómo se usa",
  techDesign: "Diseño técnico",

  // App Video
  inDev: "EN DESARROLLO",
  devAlertTitle: "En desarrollo",
  devAlertText:
    "Es un proyecto activo: añado funciones de forma continua y algunas partes aún son experimentales.",
  featuresToday: "Qué puede hacer hoy",
  archDecisions: "Decisiones de arquitectura",
  nextSteps: "Próximos pasos",

  // Social
  contact: "CONTACTAR",

  // Carta
  downloadPdf: "DESCARGAR PDF ORIGINAL",
  letterNote: "",

  // Errores
  retry: "↻ REINTENTAR",
  home: "VOLVER AL INICIO",
  menu: "// MENÚ",
  notFoundTitle: "Página no encontrada",
  notFoundMessage: "La ruta que buscas no existe o se ha movido. Vuelve al inicio o entra directamente al menú.",
  errorTitle: "Algo ha fallado",
  errorMessage: "No se ha podido cargar esta página. Prueba a reintentarlo o vuelve al inicio.",
  globalErrorMessage: "No se ha podido cargar el portfolio. Prueba a reintentarlo en unos segundos.",
};

export type Strings = typeof es;

const en: Strings = {
  themeLabel: "Dark mode",
  toLight: "Switch to light mode",
  toDark: "Switch to dark mode",
  langLabel: "Language: Spanish / English",
  toOtherLang: "Cambiar a español",

  studying: "Studying AI & Big Data",
  graduated: "Multiplatform App Dev graduate",
  enter: "Enter Portfolio",
  enterShort: "ENTER",
  viewSkills: "View skills",
  viewStudies: "View education",
  viewProject: (title) => `View project ${title}`,

  contributionsTitle: "contributions in the last year",
  contributionsAria: (n) => `${n} GitHub contributions in the last year`,
  viewProfile: "View profile ↗",
  activeDays: "Active days",
  longestStreak: "Longest streak",
  streakDays: (n) => `${n} ${n === 1 ? "day" : "days"} in a row`,
  bestDay: "Most active day",
  contributions: (n) => `${n} ${n === 1 ? "contribution" : "contributions"}`,
  less: "Less",
  more: "More",
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  weekdays: ["", "Mon", "", "Wed", "", "Fri", ""],
  formatDate: (d, m, y) => `${m} ${d}, ${y}`,

  mainMenu: "Main menu",
  countStudies: (n) => `${n} qualifications`,
  countProjects: (n) => `${n} projects`,
  countSkills: (n) => `${n} skills`,
  countChannels: (n) => `${n} channels`,

  back: "BACK",
  backToMenu: "BACK TO MENU",
  goBack: "GO BACK",
  studiesTitle: "Education",
  projectsTitle: "Project Log",
  projectsBadge: "PROJECTS & DEVELOPMENT",
  skillsTitle: "Technical Arsenal",
  socialBadge: "LET'S TALK",

  logoOf: (name) => `${name} logo`,
  backgroundOf: (name) => `${name} background`,
  iconOf: (name) => `${name} icon`,
  seeProject: "▶ VIEW PROJECT",

  gameArea: "Game area",
  playTitle: "Play Pigmentum",
  startGame: "▶ START INFILTRATION",
  closeGame: "✖ CLOSE",
  fullscreen: "⛶ FULLSCREEN",

  viewRepo: "▶ VIEW REPOSITORY ON GITHUB",
  whatItDoes: "What it does",
  howToUse: "How it's used",
  techDesign: "Technical design",

  inDev: "IN DEVELOPMENT",
  devAlertTitle: "In development",
  devAlertText: "This is an active project: I keep adding features and some parts are still experimental.",
  featuresToday: "What it can do today",
  archDecisions: "Architecture decisions",
  nextSteps: "Next steps",

  contact: "CONTACT",

  downloadPdf: "DOWNLOAD ORIGINAL PDF",
  letterNote: "Original letter in Spanish, shown exactly as signed.",

  retry: "↻ RETRY",
  home: "BACK TO HOME",
  menu: "// MENU",
  notFoundTitle: "Page not found",
  notFoundMessage: "The page you're looking for doesn't exist or has moved. Go back home or jump straight to the menu.",
  errorTitle: "Something went wrong",
  errorMessage: "This page couldn't be loaded. Try again or go back home.",
  globalErrorMessage: "The portfolio couldn't be loaded. Please try again in a few seconds.",
};

const dictionaries: Record<Lang, Strings> = { es, en };

export function useStrings(): Strings {
  return dictionaries[useLang()];
}
