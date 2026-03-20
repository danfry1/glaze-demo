import { Task } from "./task";

export type FilterCriteria = {
  status?: Task["status"];
  priority?: Task["priority"];
  search?: string;
};

export function filterTasks(tasks: Task[], criteria: FilterCriteria): Task[] {
  return tasks.filter((task) => {
    if (criteria.status && task.status !== criteria.status) return false;
    if (criteria.priority && task.priority !== criteria.priority) return false;
    if (criteria.search && !task.title.toLowerCase().includes(criteria.search.toLowerCase())) return false;
    return true;
  });
}

export function sortByPriority(tasks: Task[]): Task[] {
  const order = { high: 0, medium: 1, low: 2 };
  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
}
