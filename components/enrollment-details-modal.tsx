"use client"

import { Calendar, Clock, User, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project, Enrollment } from "../types/project"

interface EnrollmentDetailsModalProps {
  enrollment: Enrollment | null
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EnrollmentDetailsModal({ enrollment, project, open, onOpenChange }: EnrollmentDetailsModalProps) {
  if (!enrollment || !project) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovado"
      case "pending":
        return "Aguardando Análise"
      case "rejected":
        return "Rejeitado"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "approved":
        return "Sua inscrição foi aprovada pelo coordenador. Você pode participar do projeto."
      case "pending":
        return "Sua inscrição está sendo analisada pelo coordenador do projeto."
      case "rejected":
        return "Sua inscrição não foi aprovada. Entre em contato com o coordenador para mais informações."
      default:
        return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detalhes da Inscrição
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status da Inscrição */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {getStatusIcon(enrollment.status)}
                Status da Inscrição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(enrollment.status)}>{getStatusText(enrollment.status)}</Badge>
                <span className="text-sm text-muted-foreground">
                  Inscrito em {new Date(enrollment.enrollmentDate).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{getStatusDescription(enrollment.status)}</p>
            </CardContent>
          </Card>

          <Separator />

          {/* Informações do Projeto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informações do Projeto</h3>
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <Badge variant="outline">{project.area}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{project.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Coordenador</p>
                        <p className="text-sm text-muted-foreground">{project.coordinator}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Período</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(project.startDate).toLocaleDateString("pt-BR")} -{" "}
                          {new Date(project.endDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Carga Horária</p>
                        <p className="text-sm text-muted-foreground">
                          {project.totalHours}h total • {project.weeklyHours}h por semana
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Cursos Relacionados</p>
                    <div className="flex flex-wrap gap-1">
                      {project.courses.map((course) => (
                        <Badge key={course} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Motivação */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sua Motivação</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed">{enrollment.motivation}</p>
              </CardContent>
            </Card>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            {enrollment.status === "approved" && project.status === "finished" && <Button>Ver Certificado</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
