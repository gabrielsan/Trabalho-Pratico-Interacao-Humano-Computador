"use client"

import { Award, Download, Calendar, Clock, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { mockCertificates } from "../data/mock-data"
import type { Project } from "../types/project"

interface CertificateModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CertificateModal({ project, open, onOpenChange }: CertificateModalProps) {
  if (!project) return null

  // Encontrar o certificado correspondente ao projeto
  const certificate = mockCertificates.find((cert) => cert.projectId === project.id)

  if (!certificate) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Certificado não encontrado</DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">O certificado para este projeto ainda não está disponível.</p>
            <Button onClick={() => onOpenChange(false)} className="mt-4">
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const handleDownload = () => {
    console.log("Downloading certificate:", certificate.id)
    // Implementar download do certificado
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Certificado de Participação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Certificado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Data de Conclusão</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(certificate.completionDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Carga Horária</p>
                <p className="text-sm text-muted-foreground">{certificate.totalHours} horas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Coordenador</p>
                <p className="text-sm text-muted-foreground">{certificate.coordinator}</p>
              </div>
            </div>
          </div>

          {/* Preview do Certificado */}
          <div className="border-2 border-green-600 p-8 bg-gradient-to-br from-green-50 to-white rounded-lg">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                  <Award className="h-10 w-10 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-green-800 mb-2">CERTIFICADO</h1>
                <p className="text-lg text-gray-600">de Participação em Projeto de Extensão</p>
              </div>

              <div className="space-y-4">
                <p className="text-lg">
                  Certificamos que <strong className="text-green-800">{certificate.studentName}</strong>
                </p>

                <p className="text-base leading-relaxed">
                  participou do projeto de extensão <strong>"{certificate.projectName}"</strong>, coordenado por{" "}
                  <strong>{certificate.coordinator}</strong>, com carga horária total de{" "}
                  <strong>{certificate.totalHours} horas</strong>, no período de{" "}
                  <strong>
                    {new Date(project.startDate).toLocaleDateString("pt-BR")} a{" "}
                    {new Date(project.endDate).toLocaleDateString("pt-BR")}
                  </strong>
                  .
                </p>

                <div className="flex justify-center gap-8 text-sm text-gray-600 pt-4">
                  <div>
                    <p>
                      <strong>Data de Conclusão:</strong>
                    </p>
                    <p>{new Date(certificate.completionDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <p>
                      <strong>Data de Emissão:</strong>
                    </p>
                    <p>{new Date(certificate.issueDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="border-t border-gray-300 pt-4">
                  <p className="text-sm text-gray-500">
                    Universidade Federal de Lavras - UFLA
                    <br />
                    Pró-Reitoria de Extensão e Cultura
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Baixar PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
