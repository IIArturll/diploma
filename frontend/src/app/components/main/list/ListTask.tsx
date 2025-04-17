"use client";
import React from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "@/app/types/Task";
import ListItem from "./ListItem";

type ListTaskProps = {
  items: string[];
  taskMap:  Record<string, Task>;
  handleDragEnd: (event: DragEndEvent) => void;
  setCurrentTask: (task: Task|null) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onExecutorClick: (task: Task) => void;
  onRemoveClicked: (task: Task) => void;
  onTimerClicked: () => void;
};

const ListTask = ({items,taskMap,handleDragEnd,setCurrentTask, setIsModalOpen, onExecutorClick, onRemoveClicked, onTimerClicked}: ListTaskProps) => {
  return (
    <div className="mt-10">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="overflow-y-auto h-[calc(95vh-150px)] scrollbar-hidden">
            <ul className="relative">
              {items.map((id) => (
                <ListItem 
                  key={id} 
                  task={taskMap[id]}
                  setCurrentTask={setCurrentTask}
                  setIsModalOpen={setIsModalOpen}
                  onExecutorClick={onExecutorClick}
                  onRemoveClicked={onRemoveClicked}
                  onTimerClicked={onTimerClicked}
                />
              ))}
            </ul>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ListTask;
