"use client"

import { Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Project } from "../types/project"

interface ProjectCardProps {
  project: Project
  onViewDetails: (project: Project) => void
  onEnroll?: (project: Project) => void
}

export function ProjectCard({ project, onViewDetails, onEnroll }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "finished":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
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
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold leading-tight">{project.name}</CardTitle>
          <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          {project.area}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{project.coordinator}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(project.startDate).toLocaleDateString("pt-BR")} -{" "}
              {new Date(project.endDate).toLocaleDateString("pt-BR")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {project.totalHours}h total • {project.weeklyHours}h/semana
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Participantes</span>
            <span className="font-medium">
              {project.currentParticipants}/{project.maxParticipants}
            </span>
          </div>
          <Progress value={participationPercentage} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-1">
          {project.courses.slice(0, 2).map((course) => (
            <Badge key={course} variant="secondary" className="text-xs">
              {course}
            </Badge>
          ))}
          {project.courses.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{project.courses.length - 2} mais
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" onClick={() => onViewDetails(project)} className="flex-1">
          Ver Detalhes
        </Button>
        {project.status === "open" && onEnroll && (
          <Button onClick={() => onEnroll(project)} className="flex-1">
            Inscrever-se
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
