import { describe, it } from "node:test";
import assert from "node:assert";
import { TaskManager } from "./task";

describe("TaskManager", () => {
  it("should create a task", () => {
    const manager = new TaskManager();
    const task = manager.create("Test task");
    assert.strictEqual(task.title, "Test task");
    assert.strictEqual(task.status, "todo");
    assert.strictEqual(task.priority, "medium");
  });

  it("should list tasks by status", () => {
    const manager = new TaskManager();
    manager.create("Task 1");
    manager.create("Task 2");
    manager.update("task-1", { status: "done" });

    assert.strictEqual(manager.list("done").length, 1);
    assert.strictEqual(manager.list("todo").length, 1);
  });

  it("should update task properties", () => {
    const manager = new TaskManager();
    manager.create("Original title", "low");
    manager.update("task-1", { title: "Updated title", priority: "high" });

    const task = manager.get("task-1");
    assert.strictEqual(task?.title, "Updated title");
    assert.strictEqual(task?.priority, "high");
  });

  it("should delete a task", () => {
    const manager = new TaskManager();
    manager.create("To delete");
    assert.strictEqual(manager.delete("task-1"), true);
    assert.strictEqual(manager.get("task-1"), undefined);
  });

  it("should track completion date", () => {
    const manager = new TaskManager();
    manager.create("Complete me");
    manager.update("task-1", { status: "done" });
    const task = manager.get("task-1");
    assert.ok(task?.completedAt);
  });

  it("should return stats", () => {
    const manager = new TaskManager();
    manager.create("A");
    manager.create("B");
    manager.create("C");
    manager.update("task-1", { status: "done" });
    manager.update("task-2", { status: "in-progress" });

    const stats = manager.stats();
    assert.strictEqual(stats.total, 3);
    assert.strictEqual(stats.done, 1);
    assert.strictEqual(stats.inProgress, 1);
    assert.strictEqual(stats.todo, 1);
  });

  it("should throw on invalid task id", () => {
    const manager = new TaskManager();
    assert.throws(() => manager.update("nonexistent", { title: "x" }), /not found/);
  });
});
