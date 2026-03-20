import { Task } from "./task";

export interface DueDate {
  taskId: string;
  dueAt: Date;
  reminder?: Date;
}

export class DueDateTracker {
  private dueDates: Map<string, DueDate> = new Map();

  setDueDate(taskId: string, dueAt: Date, reminder?: Date): DueDate {
    const entry: DueDate = { taskId, dueAt, reminder };
    this.dueDates.set(taskId, entry);
    return entry;
  }

  getDueDate(taskId: string): DueDate | undefined {
    return this.dueDates.get(taskId);
  }

  getOverdue(tasks: Task[]): Task[] {
    const now = new Date();
    return tasks.filter((task) => {
      if (task.status === "done") return false;
      const due = this.dueDates.get(task.id);
      return due && due.dueAt < now;
    });
  }

  getUpcoming(tasks: Task[], withinHours: number = 24): Task[] {
    const now = new Date();
    const cutoff = new Date(now.getTime() + withinHours * 60 * 60 * 1000);
    return tasks.filter((task) => {
      if (task.status === "done") return false;
      const due = this.dueDates.get(task.id);
      return due && due.dueAt >= now && due.dueAt <= cutoff;
    });
  }

  removeDueDate(taskId: string): boolean {
    return this.dueDates.delete(taskId);
  }
}
