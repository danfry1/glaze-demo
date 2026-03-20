import { TaskManager } from "./task";

const manager = new TaskManager();

manager.create("Set up project structure", "high");
manager.create("Add CI/CD pipeline", "high");
manager.create("Write unit tests", "medium");
manager.create("Add documentation", "low");

manager.update("task-1", { status: "done" });
manager.update("task-2", { status: "in-progress" });

console.log("Task Tracker Demo");
console.log("=================");
console.log(`Stats:`, manager.stats());
console.log(`\nAll tasks:`);
manager.list().forEach((t) => {
  console.log(`  [${t.status}] ${t.title} (${t.priority})`);
});
