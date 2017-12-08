export interface Task {
  id: string
  title: string
  createdAt: number
  status: 'open' | 'done'
}