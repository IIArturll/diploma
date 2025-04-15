import {Tag}  from "./Tag"
import {User} from "./User"
export type Task = {
    id: string;
    description: string;
    status: "PENDING" | "RUNNING" | "COMPLETED";
    owner: User,
    executor: User | null,
    createdAt: string,
    startedAt: string | null;
    endedAt: string | null;
    executeTime: number | null;
    positionY: number; 
    tags: Tag[];
  };