export interface Project {
  id: string
  name: string
  area: string
  description: string
  totalHours: number
  weeklyHours: number
  startDate: string
  endDate: string
  courses: string[]
  coordinator: string
  status: "open" | "in-progress" | "finished"
  maxParticipants: number
  currentParticipants: number
}

export interface Student {
  id: string
  name: string
  email: string
  course: string
  period: number
  phone: string
}

export interface Enrollment {
  id: string
  projectId: string
  studentId: string
  status: "pending" | "approved" | "rejected"
  enrollmentDate: string
  motivation: string
}
