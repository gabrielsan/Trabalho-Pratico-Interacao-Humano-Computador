"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Project } from "../types/project"

interface EnrollmentFormProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function EnrollmentForm({ project, open, onOpenChange, onSubmit }: EnrollmentFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "Ana Carolina Silva",
    email: "ana.silva@estudante.ufla.br",
    phone: "(35) 99999-9999",
    course: "Ciência da Computação",
    period: "6",
    motivation: "",
  })

  if (!project) return null

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    onSubmit({ ...formData, projectId: project.id })
    setStep(1)
    onOpenChange(false)
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail Institucional</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="period">Período</Label>
          <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)}>
                  {i + 1}º Período
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="course">Curso</Label>
        <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ciência da Computação">Ciência da Computação</SelectItem>
            <SelectItem value="Engenharia de Software">Engenharia de Software</SelectItem>
            <SelectItem value="Sistemas de Informação">Sistemas de Informação</SelectItem>
            <SelectItem value="Pedagogia">Pedagogia</SelectItem>
            <SelectItem value="Psicologia">Psicologia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">Motivação para participar do projeto</Label>
        <Textarea
          id="motivation"
          placeholder="Descreva sua motivação e interesse em participar deste projeto..."
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{project.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Badge variant="outline">{project.area}</Badge>
            <Badge className="bg-green-100 text-green-800">Aberto para inscrição</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Coordenador:</p>
              <p className="text-muted-foreground">{project.coordinator}</p>
            </div>
            <div>
              <p className="font-medium">Carga Horária:</p>
              <p className="text-muted-foreground">{project.totalHours}h total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Seus Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Nome:</p>
              <p className="text-muted-foreground">{formData.name}</p>
            </div>
            <div>
              <p className="font-medium">E-mail:</p>
              <p className="text-muted-foreground">{formData.email}</p>
            </div>
            <div>
              <p className="font-medium">Curso:</p>
              <p className="text-muted-foreground">{formData.course}</p>
            </div>
            <div>
              <p className="font-medium">Período:</p>
              <p className="text-muted-foreground">{formData.period}º Período</p>
            </div>
          </div>

          {formData.motivation && (
            <div>
              <p className="font-medium">Motivação:</p>
              <p className="text-muted-foreground text-sm">{formData.motivation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="h-8 w-8 text-green-600" />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Inscrição Enviada com Sucesso!</h3>
        <p className="text-muted-foreground">
          Sua inscrição no projeto "{project.name}" foi enviada e está sendo analisada pelo coordenador.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Projeto:</span>
              <span className="font-medium">{project.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Data da inscrição:</span>
              <span className="font-medium">{new Date().toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge variant="outline">Aguardando análise</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Você receberá um e-mail de confirmação e será notificado sobre o resultado da sua inscrição.
      </p>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Inscrição no Projeto"}
            {step === 2 && "Confirmar Inscrição"}
            {step === 3 && "Inscrição Concluída"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Preencha seus dados para se inscrever no projeto"}
            {step === 2 && "Revise suas informações antes de enviar"}
            {step === 3 && "Sua inscrição foi enviada com sucesso"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNumber <= step ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber < step ? <Check className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${stepNumber < step ? "bg-green-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Action buttons */}
          <div className="flex justify-between">
            {step > 1 && step < 3 && (
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
            )}
            {step < 2 && (
              <Button onClick={handleNext} className="ml-auto">
                Próximo
              </Button>
            )}
            {step === 2 && (
              <Button onClick={handleSubmit} className="ml-auto">
                Confirmar Inscrição
              </Button>
            )}
            {step === 3 && (
              <Button onClick={() => onOpenChange(false)} className="ml-auto">
                Fechar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
