import { Task } from "./task";

export interface SearchResult {
  task: Task;
  score: number;
}

export function searchTasks(tasks: Task[], query: string): SearchResult[] {
  const terms = query.toLowerCase().split(/\s+/);

  return tasks
    .map((task) => {
      const title = task.title.toLowerCase();
      let score = 0;

      for (const term of terms) {
        if (title.includes(term)) score += 1;
        if (title.startsWith(term)) score += 0.5;
      }

      return { task, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}
