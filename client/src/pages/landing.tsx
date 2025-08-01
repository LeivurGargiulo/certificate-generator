import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Wand2, 
  Cloud, 
  Smartphone, 
  Download, 
  Settings,
  Plus,
  FileText
} from "lucide-react";
import { courses } from "@/lib/courses";

const Landing = () => {
  const features = [
    {
      icon: Wand2,
      title: "Generación Automática",
      description: "Crea certificados profesionales con plantillas personalizadas en segundos.",
      color: "bg-blue-100 text-blue-500",
    },
    {
      icon: FileText,
      title: "Vista Previa en Tiempo Real",
      description: "Ve cómo quedará tu certificado antes de descargarlo.",
      color: "bg-emerald-100 text-emerald-500",
    },
    {
      icon: Smartphone,
      title: "Totalmente Responsive",
      description: "Funciona perfectamente en móviles, tablets y escritorio.",
      color: "bg-amber-100 text-amber-500",
    },
    {
      icon: Download,
      title: "Descarga en PDF",
      description: "Genera certificados en formato PDF de alta calidad para imprimir.",
      color: "bg-rose-100 text-rose-500",
    },
    {
      icon: Settings,
      title: "Personalizable",
      description: "Adapta las plantillas y el contenido según tus necesidades.",
      color: "bg-purple-100 text-purple-500",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Sistema de Certificados{" "}
            <span className="text-primary">Académicos</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Genera certificados profesionales personalizados para tus estudiantes de manera rápida y sencilla. 
            Gestiona, almacena y distribuye certificaciones con un sistema completo y moderno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generar">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-5 w-5" />
                Generar Certificado
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Características Principales
          </h2>
          <p className="text-lg text-slate-600">
           Todo lo que necesitas para generar certificados académicos profesionales
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Available Courses Section */}
      <section>
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Cursos Disponibles
            </h2>
            <p className="text-lg text-slate-600">
              Genera certificados para cualquiera de estos cursos especializados
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {course.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    {course.description}
                  </p>
                  <span className={`inline-block ${course.color} text-xs px-2 py-1 rounded`}>
                    {course.level}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Landing;
