import {Task} from "./Task"

export type Board = {
    id: string;
    name: string;
    description: string;
    type: "LIST" | "KANBAN" | "WEEK";
    tasks: Task[]
  };