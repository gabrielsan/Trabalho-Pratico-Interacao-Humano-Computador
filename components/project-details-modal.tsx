"use client"

import { Calendar, Clock, User, Target } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import type { Project } from "../types/project"

interface ProjectDetailsModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEnroll?: (project: Project) => void
}

export function ProjectDetailsModal({ project, open, onOpenChange, onEnroll }: ProjectDetailsModalProps) {
  if (!project) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "finished":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Aberto para inscrição"
      case "in-progress":
        return "Em andamento"
      case "finished":
        return "Finalizado"
      default:
        return status
    }
  }

  const participationPercentage = (project.currentParticipants / project.maxParticipants) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold leading-tight">{project.name}</DialogTitle>
              <div className="flex gap-2">
                <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                <Badge variant="outline">{project.area}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 font-semibold mb-2">
              <Target className="h-4 w-4" />
              Descrição do Projeto
            </h3>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>

          <Separator />

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

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Participantes</p>
                  <span className="text-sm text-muted-foreground">
                    {project.currentParticipants}/{project.maxParticipants}
                  </span>
                </div>
                <Progress value={participationPercentage} className="h-2" />
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
          </div>

          {project.status === "open" && onEnroll && (
            <>
              <Separator />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Fechar
                </Button>
                <Button onClick={() => onEnroll(project)}>Inscrever-se no Projeto</Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
