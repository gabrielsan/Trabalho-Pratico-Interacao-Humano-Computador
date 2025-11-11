"use client"

import { useState } from "react"
import { Calendar, Clock, User, Download, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockProjects, mockEnrollments } from "../data/mock-data"
import { EnrollmentDetailsModal } from "./enrollment-details-modal"

export function History() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")

  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)

  const enrollments = mockEnrollments
  const projects = mockProjects

  const getProjectById = (id: string) => {
    return projects.find((p) => p.id === id)
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

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const project = getProjectById(enrollment.projectId)
    if (!project) return false

    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter
    const enrollmentYear = new Date(enrollment.enrollmentDate).getFullYear().toString()
    const matchesYear = yearFilter === "all" || enrollmentYear === yearFilter

    return matchesSearch && matchesStatus && matchesYear
  })

  const totalHours = enrollments
    .filter((e) => e.status === "approved")
    .reduce((total, enrollment) => {
      const project = getProjectById(enrollment.projectId)
      return total + (project?.totalHours || 0)
    }, 0)

  const completedProjects = enrollments.filter((e) => {
    const project = getProjectById(e.projectId)
    return e.status === "approved" && project?.status === "finished"
  }).length

  const handleViewDetails = (enrollment: any) => {
    const project = getProjectById(enrollment.projectId)
    setSelectedEnrollment(enrollment)
    setSelectedProject(project)
    setDetailsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Histórico de Participação</h1>
        <p className="text-muted-foreground">Visualize todo seu histórico de projetos de extensão</p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Horas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">Em projetos aprovados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Concluídos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">Certificados disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Inscrições</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrollments.length}</div>
            <p className="text-xs text-muted-foreground">Desde o início</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Histórico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                placeholder="Buscar por projeto ou coordenador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="approved">Aprovado</SelectItem>
                <SelectItem value="pending">Aguardando</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os anos</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Histórico */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histórico Detalhado</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Coordenador</TableHead>
                <TableHead>Data de Inscrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Carga Horária</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.map((enrollment) => {
                const project = getProjectById(enrollment.projectId)
                if (!project) return null

                return (
                  <TableRow key={enrollment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.area}</div>
                      </div>
                    </TableCell>
                    <TableCell>{project.coordinator}</TableCell>
                    <TableCell>{new Date(enrollment.enrollmentDate).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(enrollment.status)}>{getStatusText(enrollment.status)}</Badge>
                    </TableCell>
                    <TableCell>{project.totalHours}h</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(enrollment)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {enrollment.status === "approved" && project.status === "finished" && (
                          <Button size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {filteredEnrollments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum registro encontrado com os filtros aplicados.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <EnrollmentDetailsModal
        enrollment={selectedEnrollment}
        project={selectedProject}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
      />
    </div>
  )
}
