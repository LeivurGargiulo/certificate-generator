import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertCertificateSchema } from "@shared/schema";
import { courses, commissions, pronounsOptions, getCourseDisplayName } from "@/lib/courses";
import CertificateTemplate from "@/components/certificate-template";
import LoadingModal from "@/components/loading-modal";
import { generateCertificatePDF, downloadPDF, generateCertificateId } from "@/lib/certificate-generator";
import { Tag, RefreshCw, Download, Eye } from "lucide-react";
import { z } from "zod";

const formSchema = insertCertificateSchema.extend({
  studentName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  courseName: z.string().min(1, "Debe seleccionar un curso"),
  commission: z.string().min(1, "Debe seleccionar una comisión"),
  completionDate: z.string().min(1, "Debe seleccionar una fecha"),
});

type FormData = z.infer<typeof formSchema>;

const GenerateCertificate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      courseName: "",
      commission: "",
      completionDate: "",
      discordHandle: "",
      personalMessage: "",
      pronouns: "",
      certificateId: "",
      fileUrl: "",
    },
  });

  const updatePreview = () => {
    const formData = form.getValues();
    if (formData.studentName && formData.courseName) {
      setPreviewData({
        ...formData,
        courseName: getCourseDisplayName(formData.courseName),
        certificateId: generateCertificateId(),
        generatedDate: new Date().toLocaleDateString('es-ES'),
      });
    } else {
      setPreviewData(null);
    }
  };

  const handleDownloadPreview = async () => {
    if (!certificateRef.current || !previewData) return;

    try {
      setIsGenerating(true);
      const blob = await generateCertificatePDF(certificateRef.current);
      downloadPDF(blob, `certificado-${previewData.studentName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      toast({
        title: "PDF descargado",
        description: "El certificado se ha descargado exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el PDF del certificado",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!previewData) {
      toast({
        title: "Error",
        description: "Debe generar una vista previa antes de descargar el certificado",
        variant: "destructive",
      });
      return;
    }

    // Generate and download the PDF directly
    try {
      setIsGenerating(true);
      if (certificateRef.current) {
        const blob = await generateCertificatePDF(certificateRef.current);
        downloadPDF(blob, `certificado-${previewData.studentName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
        toast({
          title: "¡Certificado generado exitosamente!",
          description: "El certificado se ha descargado correctamente.",
        });
        form.reset();
        setPreviewData(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el certificado PDF",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Generar Nuevo Certificado
        </h1>
        <p className="text-slate-600">
          Completa la información del estudiante para generar su certificado personalizado
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Certificado</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo del Estudiante *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ej: María José García López" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curso Completado *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un curso" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="commission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comisión *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {commissions.map((commission) => (
                              <SelectItem key={commission} value={commission}>
                                {commission}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="completionDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Finalización *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="discordHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discord Handle (Opcional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                            @
                          </span>
                          <Input 
                            placeholder="usuario#1234" 
                            className="pl-8"
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje Personal (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mensaje adicional para el certificado (máx. 200 caracteres)"
                          maxLength={200}
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pronouns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pronombres (Opcional)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || "none"}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="No especificar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">No especificar</SelectItem>
                          {pronounsOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isGenerating || !previewData}
                >
                  <Tag className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generando..." : "Generar y Descargar Certificado"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa del Certificado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {previewData ? (
              <div className="space-y-4">
                <div className="transform scale-50 origin-top-left">
                  <CertificateTemplate ref={certificateRef} data={previewData} />
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center text-slate-500">
                <Eye className="mx-auto h-12 w-12 mb-4" />
                <p>La vista previa aparecerá aquí cuando completes el formulario</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={updatePreview}
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualizar Vista Previa
              </Button>
              <Button 
                onClick={handleDownloadPreview}
                disabled={!previewData || isGenerating}
                className="flex-1"
              >
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "Generando..." : "Descargar PDF"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <LoadingModal 
        isOpen={isGenerating}
        title="Generando Certificado"
        message="Creando el archivo PDF del certificado..."
      />
    </div>
  );
};

export default GenerateCertificate;
