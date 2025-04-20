import { Task } from "@/app/types/Task";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanItem } from "./KanbanItem";

type KanbanColumnProps = {
  title: string;
  tasks: Task[];
  setCurrentTask: (task: Task|null) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onExecutorClick: (task: Task) => void;
  onRemoveClicked: (task: Task) => void;
  onTimerClicked: () => void;
  expandedTaskId: string | null;
  setExpandedTaskId: React.Dispatch<React.SetStateAction<string | null>>
};

export function KanbanColumn(
  { title, tasks, setCurrentTask, setIsModalOpen, 
    onExecutorClick, onRemoveClicked, onTimerClicked,
     expandedTaskId, setExpandedTaskId}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
    
  
  return (
    <div  ref={setNodeRef} className="w-full md:w-1/3 p-2 bg-gray-500 rounded-xl shadow-sm ">
      <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
      <div className="overflow-y-auto h-[calc(95vh-150px)] scrollbar-hidden">
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <KanbanItem
                key={task.id}
                task={task}
                setCurrentTask={setCurrentTask} 
                setIsModalOpen={setIsModalOpen}
                onExecutorClick={onExecutorClick}
                onRemoveClicked={onRemoveClicked}
                onTimerClicked={onTimerClicked}
                expandedTaskId={expandedTaskId}
                setExpandedTaskId={setExpandedTaskId}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}