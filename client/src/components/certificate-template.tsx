import { forwardRef } from "react";
import { Tag as CertificateIcon } from "lucide-react";
import type { Tag } from "@shared/schema";

interface CertificateTemplateProps {
  data: Partial<Tag & { generatedDate?: string }>;
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ data }, ref) => {
    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div
        ref={ref}
        className="w-[800px] h-[600px] bg-white p-12 relative certificate-template"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Tag Border */}
        <div className="absolute inset-4 border-4 border-primary rounded-lg"></div>
        <div className="absolute inset-6 border-2 border-primary/30 rounded-lg"></div>
        
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-bold text-primary mb-2">
            CERTIFICADO DE FINALIZACIÓN
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Este documento certifica que</p>
        </div>
        
        {/* Student Name */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 border-b-2 border-slate-300 pb-2 inline-block min-w-[300px]">
            {data.studentName || "[Nombre del Estudiante]"}
          </h2>
        </div>
        
        {/* Course Info */}
        <div className="text-center mb-8">
          <p className="text-lg text-slate-600 mb-2">
            ha completado exitosamente el curso de
          </p>
          <h3 className="text-2xl font-semibold text-primary mb-4">
            {data.courseName || "[Nombre del Curso]"}
          </h3>
          <div className="flex justify-center space-x-8 text-sm text-slate-600">
            <div>
              <span className="font-medium">Comisión: </span>
              <span>{data.commission || "[Comisión]"}</span>
            </div>
            <div>
              <span className="font-medium">Fecha: </span>
              <span>{data.completionDate || "[Fecha]"}</span>
            </div>
          </div>
        </div>
        
        {/* Personal Message */}
        {data.personalMessage && (
          <div className="text-center mb-8 text-slate-600 italic min-h-[2rem]">
            "{data.personalMessage}"
          </div>
        )}
        
        {/* Footer */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
          <div className="text-center">
            <div className="w-48 border-t border-slate-400 mb-2"></div>
            <p className="text-sm text-slate-600">Instructor</p>
            <p className="text-sm font-medium text-slate-800">Academia CertifiApp</p>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">
              <p>ID: <span>{data.certificateId || "[CERT-ID]"}</span></p>
              <p>Generado el: <span>{data.generatedDate || currentDate}</span></p>
            </div>
          </div>
        </div>
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <CertificateIcon size={200} className="text-primary" />
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = "CertificateTemplate";

export default CertificateTemplate;
