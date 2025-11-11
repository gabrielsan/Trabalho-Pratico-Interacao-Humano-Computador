"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

import { AppSidebar } from "./components/app-sidebar"
import { ProjectFilters } from "./components/project-filters"
import { ProjectCard } from "./components/project-card"
import { ProjectDetailsModal } from "./components/project-details-modal"
import { EnrollmentForm } from "./components/enrollment-form"
import { MyProjects } from "./components/my-projects"
import { History } from "./components/history"
import { Certificates } from "./components/certificates"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockProjects } from "./data/mock-data"
import type { Project } from "./types/project"

export default function ExtensionSystem() {
  const [currentPage, setCurrentPage] = useState("projects")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false)
  const [projects, setProjects] = useState(mockProjects)
  const [filters, setFilters] = useState({
    search: "",
    area: "all",
    status: "all",
    course: "all",
  })

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setDetailsModalOpen(true)
  }

  const handleEnroll = (project: Project) => {
    setSelectedProject(project)
    setEnrollmentModalOpen(true)
  }

  const handleEnrollmentSubmit = (data: any) => {
    console.log("Enrollment submitted:", data)
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.search.toLowerCase())

    const matchesArea = filters.area === "all" || project.area.toLowerCase().replace(/\s+/g, "-") === filters.area

    const matchesStatus = filters.status === "all" || project.status === filters.status

    const matchesCourse =
      filters.course === "all" ||
      project.courses.some((course) => course.toLowerCase().replace(/\s+/g, "-") === filters.course)

    return matchesSearch && matchesArea && matchesStatus && matchesCourse
  })

  const getPageTitle = () => {
    switch (currentPage) {
      case "projects":
        return "Projetos Disponíveis"
      case "my-projects":
        return "Meus Projetos"
      case "history":
        return "Histórico"
      case "certificates":
        return "Certificados"
      default:
        return "Projetos de Extensão"
    }
  }

  const renderContent = () => {
    switch (currentPage) {
      case "my-projects":
        return <MyProjects />
      case "history":
        return <History />
      case "certificates":
        return <Certificates />
      default:
        return (
          <div className="space-y-4">
            <Alert>
              <Bell className="h-4 w-4" />
              <AlertDescription>
                <strong>Atenção:</strong> As inscrições para os projetos do semestre 2024/1 encerram em 15 de março.
              </AlertDescription>
            </Alert>

            <ProjectFilters
              onSearchChange={(search) => setFilters({ ...filters, search })}
              onAreaChange={(area) => setFilters({ ...filters, area })}
              onStatusChange={(status) => setFilters({ ...filters, status })}
              onCourseChange={(course) => setFilters({ ...filters, course })}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={handleViewDetails}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum projeto encontrado com os filtros aplicados.</p>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar userType="student" onNavigate={setCurrentPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            {currentPage === "projects" && <Badge variant="secondary">{filteredProjects.length} projetos</Badge>}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{renderContent()}</div>

        <ProjectDetailsModal
          project={selectedProject}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          onEnroll={handleEnroll}
        />

        <EnrollmentForm
          project={selectedProject}
          open={enrollmentModalOpen}
          onOpenChange={setEnrollmentModalOpen}
          onSubmit={handleEnrollmentSubmit}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
