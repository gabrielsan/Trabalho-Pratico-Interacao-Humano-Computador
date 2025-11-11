"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { areas, courses } from "../data/mock-data"

interface ProjectFiltersProps {
  onSearchChange: (search: string) => void
  onAreaChange: (area: string) => void
  onStatusChange: (status: string) => void
  onCourseChange: (course: string) => void
}

export function ProjectFilters({ onSearchChange, onAreaChange, onStatusChange, onCourseChange }: ProjectFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar projetos..." className="pl-10" onChange={(e) => onSearchChange(e.target.value)} />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filtros Avançados
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Select onValueChange={onAreaChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Área de interesse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as áreas</SelectItem>
            {areas.map((area) => (
              <SelectItem key={area} value={area.toLowerCase().replace(/\s+/g, "-")}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="open">Aberto para inscrição</SelectItem>
            <SelectItem value="in-progress">Em andamento</SelectItem>
            <SelectItem value="finished">Finalizado</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onCourseChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os cursos</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course} value={course.toLowerCase().replace(/\s+/g, "-")}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
