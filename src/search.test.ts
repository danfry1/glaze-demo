import { describe, it } from "node:test";
import assert from "node:assert";
import { TaskManager } from "./task";
import { searchTasks } from "./search";

describe("searchTasks", () => {
  it("should find tasks matching query", () => {
    const manager = new TaskManager();
    manager.create("Fix login bug");
    manager.create("Add search feature");
    manager.create("Update docs");

    const results = searchTasks(manager.list(), "search");
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].task.title, "Add search feature");
  });

  it("should rank results by relevance", () => {
    const manager = new TaskManager();
    manager.create("Fix the bug");
    manager.create("Bug report system");

    const results = searchTasks(manager.list(), "bug");
    assert.strictEqual(results.length, 2);
  });

  it("should return empty for no matches", () => {
    const manager = new TaskManager();
    manager.create("Something else");

    const results = searchTasks(manager.list(), "xyz");
    assert.strictEqual(results.length, 0);
  });
});
