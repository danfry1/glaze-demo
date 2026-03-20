import { TaskManager } from "./task";
import { formatTask, formatStats } from "./formatter";
import { sortByPriority } from "./filter";

const manager = new TaskManager();

manager.create("Set up project structure", "high");
manager.create("Add CI/CD pipeline", "high");
manager.create("Write unit tests", "medium");
manager.create("Add documentation", "low");
manager.create("Configure linting", "medium");

manager.update("task-1", { status: "done" });
manager.update("task-2", { status: "in-progress" });

console.log("Task Tracker v1.1.0");
console.log("====================");
console.log(formatStats(manager.stats()));
console.log("\nTasks (by priority):");
sortByPriority(manager.list()).forEach((t) => {
  console.log(`  ${formatTask(t)}`);
});
