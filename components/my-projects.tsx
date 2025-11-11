"use client"

import { useState } from "react"
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ProjectDetailsModal } from "./project-details-modal"
import { EnrollmentDetailsModal } from "./enrollment-details-modal"
import { CertificateModal } from "./certificate-modal"
import { mockProjects, mockEnrollments } from "../data/mock-data"
import type { Project, Enrollment } from "../types/project"

export function MyProjects() {
  const [enrollments] = useState(mockEnrollments)
  const [projects] = useState(mockProjects)

  // Estados para modais
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false)
  const [enrollmentDetailsOpen, setEnrollmentDetailsOpen] = useState(false)
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)

  const getProjectById = (id: string): Project | undefined => {
    return projects.find((p) => p.id === id)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovado"
      case "pending":
        return "Aguardando"
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

  // Handlers para os modais
  const handleViewProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setProjectDetailsOpen(true)
  }

  const handleViewEnrollmentDetails = (enrollment: Enrollment, project: Project) => {
    setSelectedEnrollment(enrollment)
    setSelectedProject(project)
    setEnrollmentDetailsOpen(true)
  }

  const handleViewCertificate = (project: Project) => {
    setSelectedProject(project)
    setCertificateModalOpen(true)
  }

  const approvedEnrollments = enrollments.filter((e) => e.status === "approved")
  const pendingEnrollments = enrollments.filter((e) => e.status === "pending")

  const ProjectCard = ({ enrollment, project }: { enrollment: Enrollment; project: Project }) => {
    const isActive = project.status === "in-progress"
    const isCompleted = project.status === "finished"
    const isPending = enrollment.status === "pending"

    return (
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold leading-tight">{project.name}</CardTitle>
            <div className="flex gap-2">
              <Badge className={getStatusColor(enrollment.status)}>
                {getStatusIcon(enrollment.status)}
                <span className="ml-1">{getStatusText(enrollment.status)}</span>
              </Badge>
            </div>
          </div>
          <Badge variant="outline" className="w-fit">
            {project.area}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

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

          {isActive && enrollment.status === "approved" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progresso estimado</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewProjectDetails(project)}>
              Ver Detalhes
            </Button>

            {isCompleted && enrollment.status === "approved" && (
              <Button size="sm" className="flex-1" onClick={() => handleViewCertificate(project)}>
                Ver Certificado
              </Button>
            )}

            {isPending && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleViewEnrollmentDetails(enrollment, project)}
              >
                Ver Inscrição
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meus Projetos</h1>
        <p className="text-muted-foreground">Acompanhe seus projetos de extensão</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Projetos Ativos ({approvedEnrollments.length})</TabsTrigger>
          <TabsTrigger value="pending">Aguardando Aprovação ({pendingEnrollments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {approvedEnrollments.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {approvedEnrollments.map((enrollment) => {
                const project = getProjectById(enrollment.projectId)
                if (!project) return null
                return <ProjectCard key={enrollment.id} enrollment={enrollment} project={project} />
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Nenhum projeto ativo</h3>
                  <p className="text-muted-foreground">
                    Você ainda não possui projetos aprovados. Explore os projetos disponíveis!
                  </p>
                  <Button className="mt-4">Explorar Projetos</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingEnrollments.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingEnrollments.map((enrollment) => {
                const project = getProjectById(enrollment.projectId)
                if (!project) return null
                return <ProjectCard key={enrollment.id} enrollment={enrollment} project={project} />
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">Nenhuma inscrição pendente</h3>
                  <p className="text-muted-foreground">Todas suas inscrições foram processadas.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Modais */}
      <ProjectDetailsModal project={selectedProject} open={projectDetailsOpen} onOpenChange={setProjectDetailsOpen} />

      <EnrollmentDetailsModal
        enrollment={selectedEnrollment}
        project={selectedProject}
        open={enrollmentDetailsOpen}
        onOpenChange={setEnrollmentDetailsOpen}
      />

      <CertificateModal project={selectedProject} open={certificateModalOpen} onOpenChange={setCertificateModalOpen} />
    </div>
  )
}
