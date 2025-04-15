export type BoardCreate = {
    id: string;
    name: string;
    description: string;
    type: "LIST" | "KANBAN" | "WEEK";
  };