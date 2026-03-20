import { Task } from "./task";

export function formatTask(task: Task): string {
  const statusIcon = {
    todo: "[ ]",
    "in-progress": "[~]",
    done: "[x]",
  }[task.status];

  const priorityLabel = {
    low: "LOW",
    medium: "MED",
    high: "HIGH",
  }[task.priority];

  return `${statusIcon} ${task.title} (${priorityLabel})`;
}

export function formatStats(stats: { total: number; todo: number; inProgress: number; done: number }): string {
  const progress = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
  return `Progress: ${progress}% | ${stats.done}/${stats.total} done | ${stats.inProgress} in progress | ${stats.todo} todo`;
}
