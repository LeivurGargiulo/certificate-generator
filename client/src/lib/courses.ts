export interface Course {
  id: string;
  name: string;
  level: "Básico" | "Intermedio" | "Avanzado" | "Experto";
  description: string;
  color: string;
}

export const courses: Course[] = [
  {
    id: "maquetado-web-nivel-1",
    name: "Maquetado Web Nivel 1",
    level: "Básico",
    description: "Fundamentos de HTML y CSS para crear páginas web profesionales.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    level: "Intermedio",
    description: "Framework de CSS utility-first para desarrollo rápido y eficiente.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "react-fundamentals",
    name: "React Fundamentals",
    level: "Avanzado",
    description: "Desarrollo de aplicaciones web modernas con React y JavaScript.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "javascript-es6",
    name: "JavaScript ES6+",
    level: "Intermedio",
    description: "Programación moderna con las últimas características de JavaScript.",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "nodejs-backend",
    name: "Node.js Backend",
    level: "Avanzado",
    description: "Desarrollo de APIs y servidores con Node.js y Express.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "full-stack-development",
    name: "Full Stack Development",
    level: "Experto",
    description: "Desarrollo completo de aplicaciones web frontend y backend.",
    color: "bg-rose-100 text-rose-700",
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};

export const getCourseDisplayName = (courseId: string): string => {
  const course = getCourseById(courseId);
  return course ? course.name : courseId;
};

export const commissions = [
  "2024-A",
  "2024-B", 
  "2024-C",
  "2025-A",
  "2025-B",
  "2025-C",
];

export const pronounsOptions = [
  { value: "el/él", label: "él/él" },
  { value: "ella/ella", label: "ella/ella" },
  { value: "elle/elle", label: "elle/elle" },
];
