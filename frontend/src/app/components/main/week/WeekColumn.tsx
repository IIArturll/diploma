import { Task } from "@/app/types/Task";
import { useDroppable } from "@dnd-kit/core";
import { WeekItem } from "./WeekItem";

type WeekColumnProps = {
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

export function WeekColumn(
  { title, tasks, setCurrentTask, setIsModalOpen, 
    onExecutorClick, onRemoveClicked, onTimerClicked,
     expandedTaskId, setExpandedTaskId}: WeekColumnProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
    
  
  return (
    <div  ref={setNodeRef} className="w-full  p-2 bg-gray-500 rounded-xl shadow-sm ">
      <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
      <div className="overflow-y-auto h-[calc(48vh-150px)] scrollbar-hidden">
        <div className="flex flex-col gap-2">
          {tasks.map((task) => (
            <WeekItem
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
      </div>
    </div>
  );
}