import { describe, it } from "node:test";
import assert from "node:assert";
import { TaskManager } from "./task";
import { NotificationService } from "./notifications";

describe("NotificationService", () => {
  it("should notify subscribers", () => {
    const service = new NotificationService();
    const manager = new TaskManager();
    const task = manager.create("Test task");
    const received: string[] = [];

    service.subscribe((n) => received.push(n.message));
    service.notify("created", task);

    assert.strictEqual(received.length, 1);
    assert.strictEqual(received[0], "New task: Test task");
  });

  it("should unsubscribe", () => {
    const service = new NotificationService();
    const manager = new TaskManager();
    const task = manager.create("Test");
    const received: string[] = [];

    const unsub = service.subscribe((n) => received.push(n.message));
    unsub();
    service.notify("created", task);

    assert.strictEqual(received.length, 0);
  });

  it("should track notification history", () => {
    const service = new NotificationService();
    const manager = new TaskManager();
    const task = manager.create("Test");

    service.notify("created", task);
    service.notify("completed", task);

    // BUG: wrong expected count - this will fail CI
    assert.strictEqual(service.getHistory().length, 3);
  });
});
