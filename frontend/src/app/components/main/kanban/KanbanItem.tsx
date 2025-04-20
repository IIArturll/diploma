
import { Task } from "@/app/types/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toZonedTime } from "date-fns-tz";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Play from "@/app/play.jpeg"
const convertToLocalDateTime = (utcTimestamp: string | null) => {
  if (!utcTimestamp) return null;
  const parsedDate = parseISO(utcTimestamp);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(parsedDate, timeZone);
  return (
    <>
      {format(localDate, "dd-MM-yyyy HH:mm")}
    </>
  );
};

const formatTime = (seconds: number) => {
  const d = Math.floor(seconds / (60 * 60 * 24));
  const h = Math.floor((seconds % (60 * 60 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (seconds < 60) {
    return `${s} sec`;
  } else if (seconds < 3600) {
    return `${m}:${s.toString().padStart(2, '0')} min`;
  } else if (seconds < 86400) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} hour`;
  } else {
    return `${d}d ${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}

type KanbanItemProps = {
  task: Task;
  setCurrentTask: (currenTask: Task) => void, 
  setIsModalOpen: (open: boolean) => void, 
  onExecutorClick: (task: Task) => void, 
  onRemoveClicked: (task: Task)=>void,
  onTimerClicked: ()=> void,
  expandedTaskId: string | null;
  setExpandedTaskId: React.Dispatch<React.SetStateAction<string | null>>
};

export  function KanbanItem(
  { task,
    setCurrentTask, 
    setIsModalOpen, 
    onExecutorClick, 
    onRemoveClicked,
    onTimerClicked,
    expandedTaskId,
    setExpandedTaskId
  }: KanbanItemProps

) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isExpanded = expandedTaskId === task.id;

  const toggleExpand = () => {
    if (isExpanded) {
      setExpandedTaskId(null);
    } else {
      setExpandedTaskId(task.id);
    }
  };

  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    type jwt = { sub: string };
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<jwt>(token);
        setCurrentUserEmail(decoded.sub);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);
  const isExecutor = task.executor && currentUserEmail === task.executor.email ;

  const onDoubleClick = () => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const timerClick = () => {
    setCurrentTask(task)
    onTimerClicked()
  }
      

  return (
      <div
      ref={setNodeRef}
      style={style}
      onDoubleClick={onDoubleClick}
      onClick={toggleExpand}
      className={`bg-gray-600 p-3 rounded-lg shadow transition-all duration-300 ease-in-out 
        ${isDragging ? "ring-2 ring-blue-400" : ""}
        ${isExpanded ? "bg-gray-500" : "hover:bg-gray-500"}
        cursor-pointer select-none`}
      >
      <div className="flex justify-between">
        <p className={`${isExpanded ? `text-xm` : `text-sm`} font-medium`}>{task.description}</p>
        <div
          {...attributes}
          {...listeners}
          className="mr-2 cursor-grab select-none text-xl"
          title=""
        >
          ☰
        </div>
      </div>
      {isExpanded && (

        <div className="text-xm space-y-1 text-gray-200">
          <div className="flex flex-row gap-4">
          <label className="block select-none">Owner:</label>
          <h1 className="select-none">{task.owner.email}</h1>
        </div>

        <div className="flex flex-row gap-4">
          <label className="block text-xm select-none">Executor:</label>
          {task.executor?
            <div className="select-none">
              {task.executor.email}

              {isExecutor && (
                <span onClick={(e) => {
                  e.stopPropagation();
                  onRemoveClicked(task);
                }} 
                className="text-red-500 hover:text-red-700 select-none cursor-pointer ml-2">
                  ❌
                </span>
              )}
            </div>
            :<h1  onClick={(e) => {
              e.stopPropagation();
              onExecutorClick(task);
            }} 
            className="text-white cursor-pointer hover:text-blue-400 transition-colors select-none">Take this task</h1>
          }
        </div>
        <div className="flex flex-row gap-4">
          <label className="block text-xm select-none">Created At:</label>
          <h1  className="select-none break-words whitespace-normal">
            {convertToLocalDateTime(task.createdAt)}
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          <label className="block text-xm select-none">Started At:</label>
          <h1  className="select-none break-words whitespace-normal">
            {convertToLocalDateTime(task.startedAt)}
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          <label className="block text-xm select-none">Ended At:</label>
          <h1  className="select-none break-words whitespace-normal">
            {convertToLocalDateTime(task.endedAt)}
          </h1>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <label className="block text-xm select-none">Execute time:</label>
            <h1  className="select-none">{task.executeTime && formatTime(task.executeTime)}</h1>
            <Image className="select-none" src={Play} alt="Play" width={20} height={20} 
              onClick={(e) => {
                e.stopPropagation();
                timerClick();
              }}
            />
        </div>
        <div className="flex flex-row gap-4 break-words whitespace-normal">
          <label className="block text-xm select-none">Tags:</label>
          <h1  className="select-none ">{task.tags.map((t) => t.tag).join(", ")}</h1>
        </div>
        <div className="border-t border-gray-400 pt-2 cursor-pointer hover:text-red-400 transition-colors flex justify-center text-xl"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedTaskId(null);
            }}
            title=""
          >
            ^
        </div>
        </div>
      )}

    </div>
  );
}
