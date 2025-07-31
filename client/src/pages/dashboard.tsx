import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { courses, getCourseDisplayName } from "@/lib/courses";
import type { Tag } from "@shared/schema";
import { 
  Tag as CertificateIcon, 
  Calendar, 
  Book, 
  Users,
  Search,
  Download,
  RotateCcw,
  Trash2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch certificates with filters
  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ["/api/certificates", searchQuery, courseFilter, dateFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (courseFilter) params.set("course", courseFilter);
      
      const response = await fetch(`/api/certificates?${params}`);
      if (!response.ok) throw new Error("Failed to fetch certificates");
      return response.json();
    },
  });

  // Fetch statistics
  const { data: stats } = useQuery({
    queryKey: ["/api/certificates/stats/summary"],
    queryFn: async () => {
      const response = await fetch("/api/certificates/stats/summary");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  // Delete certificate mutation
  const deleteCertificateMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/certificates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/certificates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/certificates/stats/summary"] });
      toast({
        title: "Certificado eliminado",
        description: "El certificado se ha eliminado exitosamente.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo eliminar el certificado",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (certificate: Tag) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el certificado de ${certificate.studentName}?`)) {
      deleteCertificateMutation.mutate(certificate.id);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Función en desarrollo",
      description: "La descarga de certificados se implementará próximamente.",
    });
  };

  const handleRegenerate = () => {
    toast({
      title: "Función en desarrollo", 
      description: "La regeneración de certificados se implementará próximamente.",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  // Filter certificates by date if dateFilter is set
  const filteredCertificates = dateFilter 
    ? certificates.filter((cert: Tag) => 
        cert.completionDate === dateFilter
      )
    : certificates;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Panel de Control de Certificados
        </h1>
        <p className="text-slate-600">
          Gestiona todos los certificados generados en el sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Certificados</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats?.totalCertificates || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CertificateIcon className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Este Mes</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats?.thisMonth || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Cursos Activos</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats?.activeCourses || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Book className="h-6 w-6 text-indigo-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Estudiantes</p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats?.students || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre, curso, ID de certificado..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="lg:w-48">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los cursos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los cursos</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:w-48">
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="Filtrar por fecha"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificados Generados</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p>Cargando certificados...</p>
            </div>
          ) : filteredCertificates.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <CertificateIcon className="mx-auto h-12 w-12 mb-4" />
              <p>No se encontraron certificados</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Comisión</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>ID Certificado</TableHead>
                  <TableHead>Discord</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertificates.map((certificate: Tag) => (
                  <TableRow key={certificate.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(certificate.studentName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{certificate.studentName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCourseDisplayName(certificate.courseName)}
                    </TableCell>
                    <TableCell>{certificate.commission}</TableCell>
                    <TableCell>{formatDate(certificate.completionDate)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {certificate.certificateId}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {certificate.discordHandle || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={handleDownload}
                          title="Descargar PDF"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={handleRegenerate}
                          title="Regenerar"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(certificate)}
                          disabled={deleteCertificateMutation.isPending}
                          title="Eliminar"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
