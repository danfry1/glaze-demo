# Task Tracker

A simple task management library built with TypeScript.

## Features

- Create, update, and delete tasks
- Filter tasks by status
- Track task priorities and completion dates
- Get task statistics

## Usage

```typescript
import { TaskManager } from "./task";

const manager = new TaskManager();
const task = manager.create("Build something cool", "high");
manager.update(task.id, { status: "in-progress" });
console.log(manager.stats());
```
