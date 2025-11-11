"use client"

import type * as React from "react"
import { BookOpen, Calendar, FileText, GraduationCap, Home, Plus, Settings, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const studentNavigation = [
  {
    title: "Início",
    url: "home",
    icon: Home,
  },
  {
    title: "Projetos Disponíveis",
    url: "projects",
    icon: BookOpen,
  },
  {
    title: "Meus Projetos",
    url: "my-projects",
    icon: Users,
  },
  {
    title: "Histórico",
    url: "history",
    icon: Calendar,
  },
  {
    title: "Certificados",
    url: "certificates",
    icon: FileText,
  },
]

const coordinatorNavigation = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Criar Projeto",
    url: "create-project",
    icon: Plus,
  },
  {
    title: "Meus Projetos",
    url: "manage-projects",
    icon: BookOpen,
  },
  {
    title: "Inscrições",
    url: "enrollments",
    icon: Users,
  },
  {
    title: "Relatórios",
    url: "reports",
    icon: FileText,
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userType?: "student" | "coordinator"
  onNavigate?: (page: string) => void
}

export function AppSidebar({ userType = "student", onNavigate, ...props }: AppSidebarProps) {
  const navigation = userType === "student" ? studentNavigation : coordinatorNavigation

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">UFLA Extensão</span>
            <span className="text-xs text-muted-foreground">
              {userType === "student" ? "Portal do Estudante" : "Portal do Coordenador"}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => onNavigate?.(item.url)} className="cursor-pointer">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Ana Carolina</span>
                  <span className="text-xs text-muted-foreground">Ciência da Computação</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => onNavigate?.("settings")} className="cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
