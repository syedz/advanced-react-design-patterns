import type { BoardData } from "./types/board";

export const boardData: BoardData = {
  name: "Developers",
  columns: [
    {
      id: "col-1",
      title: "Backlog",
      tasks: [
        { id: "task-1", name: "Update dependencies" },
        { id: "task-2", name: "Add review feature" },
      ],
    },
    {
      id: "col-2",
      title: "Todo",
      tasks: [{ id: "task-3", name: "Fix modal transition" }],
    },
    {
      id: "col-3",
      title: "In progress",
      tasks: [{ id: "task-4", name: "Create task board" }],
    },
    {
      id: "col-4",
      title: "Complete",
      tasks: [],
    },
  ],
};
