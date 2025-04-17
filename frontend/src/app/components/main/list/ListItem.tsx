"use client";
import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/app/types/Task";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import Play from "@/app/play.jpeg";
import { jwtDecode }  from "jwt-decode";

const convertToLocalDateTime = (utcTimestamp: string | null) => {
  if (!utcTimestamp) return null;
  const parsedDate = parseISO(utcTimestamp);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(parsedDate, timeZone);
  return (
    <>
      {format(localDate, "dd-MM-yyyy")}
      <br />
      {format(localDate, "HH:mm")}
    </>
  );
};

const ListItem = (
{ task, 
  setCurrentTask, 
  setIsModalOpen, 
  onExecutorClick, 
  onRemoveClicked,
}: { 
  task: Task, 
  setCurrentTask: (currenTask: Task) => void, 
  setIsModalOpen: (open: boolean) => void, 
  onExecutorClick: (task: Task) => void, 
  onRemoveClicked: (task: Task)=>void,
}) => {

  const handleDoubleClick = () => {
    setCurrentTask(task);
    setIsModalOpen(true);
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
 
  const isExecutor = task.executor && currentUserEmail === task.executor.email ;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="relative p-2 rounded mb-2 text-white text-center group bg-gray-500 ml-4 mr-4"
      onDoubleClick={()=>handleDoubleClick()}
    >
      <div className="flex items-center justify-between group">
        <div className="flex flex-col gap-1 w-50 break-words whitespace-normal">
          <label className="block text-sm select-none">Description</label>
          <h1 className="select-none">{task.description}</h1>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm select-none">Status</label>
          <h1 className="select-none">{task.status}</h1>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm select-none">Owner</label>
          <h1 className="select-none">{task.owner.email}</h1>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm select-none">Executor</label>
          {task.executor?
            <div className="select-none">
              {task.executor.email}

              {isExecutor && (
                <span onClick={()=>onRemoveClicked(task)} className="text-red-500 hover:text-red-700 select-none cursor-pointer ml-2">
                  ❌
                </span>
              )}
            </div>
            :<h1  onClick={()=>onExecutorClick(task)} className="text-white cursor-pointer hover:text-blue-400 transition-colors select-none">Take this task</h1>
          }
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm select-none">Created At</label>
          <h1  className="select-none break-words whitespace-normal">
            {convertToLocalDateTime(task.createdAt)}
          </h1>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm select-none">Started At</label>
          <h1  className="select-none break-words whitespace-normal">
            {convertToLocalDateTime(task.startedAt)}
          </h1>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm select-none">Ended At</label>
          <h1  className="select-none break-words whitespace-normal">
            {convertToLocalDateTime(task.endedAt)}
          </h1>
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm select-none">Execute time</label>
          <h1  className="select-none">{task.executeTime}</h1>
          <Image className="select-none" src={Play} alt="Play" width={20} height={20} />
        </div>
        <div className="flex flex-col gap-1 w-32 break-words whitespace-normal">
          <label className="block text-sm select-none">Tags</label>
          <h1  className="select-none">{task.tags.map((t) => t.tag).join(", ")}</h1>
        </div>
        <div
          {...attributes}
          {...listeners}
          className="mr-2 cursor-grab select-none text-xl"
          title="Перетащи"
        >
          ☰
        </div>
      </div>
    </li>
  );
};

export default ListItem;
