import { Task } from "./task";

export function toCSV(tasks: Task[]): string {
  const header = "id,title,status,priority,created_at,completed_at";
  const rows = tasks.map(
    (t) =>
      `${t.id},"${t.title}",${t.status},${t.priority},${t.createdAt.toISOString()},${t.completedAt?.toISOString() ?? ""}`
  );
  return [header, ...rows].join("\n");
}

export function toJSON(tasks: Task[]): string {
  return JSON.stringify(tasks, null, 2);
}

export function toMarkdown(tasks: Task[]): string {
  const lines = [
    "| ID | Title | Status | Priority |",
    "|---|---|---|---|",
    ...tasks.map((t) => `| ${t.id} | ${t.title} | ${t.status} | ${t.priority} |`),
  ];
  return lines.join("\n");
}
