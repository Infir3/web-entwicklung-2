import { Entity } from '../models/entity';

export interface Task extends Entity {
  title: string
  status: 'open' | 'done'
}