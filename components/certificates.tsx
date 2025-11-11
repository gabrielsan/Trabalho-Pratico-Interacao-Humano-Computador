"use client"

import { useState } from "react"
import { Download, Eye, Award, Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { mockCertificates } from "../data/mock-data"

export function Certificates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [yearFilter, setYearFilter] = useState("all")
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const certificates = mockCertificates

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.coordinator.toLowerCase().includes(searchTerm.toLowerCase())
    const certYear = new Date(cert.completionDate).getFullYear().toString()
    const matchesYear = yearFilter === "all" || certYear === yearFilter

    return matchesSearch && matchesYear
  })

  const handlePreview = (certificate: any) => {
    setSelectedCertificate(certificate)
    setPreviewOpen(true)
  }

  const handleDownload = (certificate: any) => {
    // Simular download do certificado
    console.log("Downloading certificate:", certificate.id)
  }

  const CertificatePreview = () => (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualizar Certificado</DialogTitle>
        </DialogHeader>

        {selectedCertificate && (
          <div className="space-y-6">
            {/* Certificado mockado */}
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
                    Certificamos que <strong className="text-green-800">{selectedCertificate.studentName}</strong>
                  </p>

                  <p className="text-base">
                    participou do projeto de extensão <strong>"{selectedCertificate.projectName}"</strong>, coordenado
                    por <strong>{selectedCertificate.coordinator}</strong>, com carga horária total de{" "}
                    <strong>{selectedCertificate.totalHours} horas</strong>.
                  </p>

                  <div className="flex justify-center gap-8 text-sm text-gray-600">
                    <div>
                      <p>
                        <strong>Data de Conclusão:</strong>
                      </p>
                      <p>{new Date(selectedCertificate.completionDate).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div>
                      <p>
                        <strong>Data de Emissão:</strong>
                      </p>
                      <p>{new Date(selectedCertificate.issueDate).toLocaleDateString("pt-BR")}</p>
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

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                Fechar
              </Button>
              <Button onClick={() => handleDownload(selectedCertificate)}>
                <Download className="mr-2 h-4 w-4" />
                Baixar PDF
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Certificados</h1>
        <p className="text-muted-foreground">Visualize e baixe seus certificados de participação</p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados Disponíveis</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-muted-foreground">Prontos para download</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Horas Certificadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.reduce((total, cert) => total + cert.totalHours, 0)}h
            </div>
            <p className="text-xs text-muted-foreground">Em projetos concluídos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Certificado</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.length > 0
                ? new Date(Math.max(...certificates.map((c) => new Date(c.issueDate).getTime()))).toLocaleDateString(
                    "pt-BR",
                  )
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Data de emissão</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Certificados</CardTitle>
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

      {/* Lista de Certificados */}
      <div className="space-y-4">
        {filteredCertificates.length > 0 ? (
          filteredCertificates.map((certificate) => (
            <Card key={certificate.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold">{certificate.projectName}</h3>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>
                        <strong>Coordenador:</strong> {certificate.coordinator}
                      </p>
                      <p>
                        <strong>Carga Horária:</strong> {certificate.totalHours} horas
                      </p>
                      <p>
                        <strong>Concluído em:</strong>{" "}
                        {new Date(certificate.completionDate).toLocaleDateString("pt-BR")}
                      </p>
                      <p>
                        <strong>Emitido em:</strong> {new Date(certificate.issueDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handlePreview(certificate)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </Button>
                    <Button onClick={() => handleDownload(certificate)}>
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Nenhum certificado disponível</h3>
                <p className="text-muted-foreground">
                  {certificates.length === 0
                    ? "Complete projetos de extensão para receber certificados."
                    : "Nenhum certificado encontrado com os filtros aplicados."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <CertificatePreview />
    </div>
  )
}
