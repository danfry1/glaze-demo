export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  completedAt?: Date;
}

export class TaskManager {
  private tasks: Map<string, Task> = new Map();
  private nextId = 1;

  create(title: string, priority: Task["priority"] = "medium"): Task {
    const task: Task = {
      id: `task-${this.nextId++}`,
      title,
      status: "todo",
      priority,
      createdAt: new Date(),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  get(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  list(status?: Task["status"]): Task[] {
    const all = Array.from(this.tasks.values());
    if (status) return all.filter((t) => t.status === status);
    return all;
  }

  update(id: string, updates: Partial<Pick<Task, "title" | "status" | "priority">>): Task {
    const task = this.tasks.get(id);
    if (!task) throw new Error(`Task ${id} not found`);

    if (updates.title) task.title = updates.title;
    if (updates.priority) task.priority = updates.priority;
    if (updates.status) {
      task.status = updates.status;
      if (updates.status === "done") {
        task.completedAt = new Date();
      }
    }

    return task;
  }

  delete(id: string): boolean {
    return this.tasks.delete(id);
  }

  stats() {
    const all = this.list();
    return {
      total: all.length,
      todo: all.filter((t) => t.status === "todo").length,
      inProgress: all.filter((t) => t.status === "in-progress").length,
      done: all.filter((t) => t.status === "done").length,
    };
  }
}
