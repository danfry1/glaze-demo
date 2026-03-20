import { Task } from "./task";

export type NotificationType = "created" | "completed" | "overdue";

export interface Notification {
  type: NotificationType;
  task: Task;
  message: string;
  timestamp: Date;
}

export class NotificationService {
  private subscribers: ((notification: Notification) => void)[] = [];
  private history: Notification[] = [];

  subscribe(callback: (notification: Notification) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    };
  }

  notify(type: NotificationType, task: Task): void {
    const notification: Notification = {
      type,
      task,
      message: this.buildMessage(type, task),
      timestamp: new Date(),
    };
    this.history.push(notification);
    this.subscribers.forEach((cb) => cb(notification));
  }

  getHistory(): Notification[] {
    return [...this.history];
  }

  private buildMessage(type: NotificationType, task: Task): string {
    switch (type) {
      case "created":
        return `New task: ${task.title}`;
      case "completed":
        return `Task completed: ${task.title}`;
      case "overdue":
        return `Task overdue: ${task.title}`;
    }
  }
}
