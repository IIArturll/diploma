"use client";
import { Board } from "@/app/types/Board";
import { Tag } from "@/app/types/Tag";
import { Task } from "@/app/types/Task";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type CreateTaskModalProps = {
    isCreateTaskButtonCliked: boolean;
    description: string;
    setDescription: (description: string) => void;
    status: "PENDING" | "RUNNING" | "COMPLETED";
    setStatus: (status: "PENDING" | "RUNNING" | "COMPLETED") => void;
    tags: Tag[];
    setTags: (tags: Tag[]) => void;
    createTask: () => void;
    updateTask: () => void;
    onCancel: () => void;
    onDelete: () => void;
    task: Task|null;
    board: Board|null
  };

const CreateUpdateTaskModal : React.FC<CreateTaskModalProps> = ({
    isCreateTaskButtonCliked,
    description,
    setDescription,
    status,
    setStatus,
    tags,
    setTags,
    createTask,
    updateTask,
    onCancel,
    onDelete,
    task,
    board
  }) => {
  
  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setStatus(task.status);
      setTags(task.tags);
    }
  }, [task]);

  const mockTags: Tag[] = [
    { id: 1, tag: "Frontend" },
    { id: 2, tag: "Backend" },
    { id: 3, tag: "Database" },
    { id: 4, tag: "Fix" },
    { id: 5, tag: "New" },
    { id: 6, tag: "Doc" },
  ];
  
  if(!isCreateTaskButtonCliked) return
  
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(1px)" }}
    >
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">{task? "Update Task":"Create Task"}</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="desctiption" className="block text-sm mb-2">Description</label>
            <input
              type="description"
              id="description"
              value= {description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border bg-gray-800 rounded text-white"
              placeholder="Desctiption"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm mb-2">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e)=>setStatus(e.target.value as "PENDING" | "RUNNING" | "COMPLETED")}
              className="w-full p-2 bg-gray-800 text-white rounded"
            >
              <option value="PENDING">PENDING</option>
              <option value="RUNNING">RUNNING</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm mb-2">Tags</label>
            <div className="grid grid-cols-2 gap-2 bg-gray-800 p-2 rounded">
              {mockTags.map((tag) => {
                const isChecked = tags.some((t) => t.id === tag.id);
                return (
                  <label
                    key={tag.id}
                    className="flex items-center space-x-2 text-white cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const updatedTags = isChecked
                          ? tags.filter((t) => t.id !== tag.id)
                          : [...tags, tag];
                        setTags(updatedTags);
                      }}
                      className="accent-blue-500"
                    />
                    <span>{tag.tag}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onCancel} className="bg-gray-400 text-white py-2 px-4 rounded">
              Cancel
            </button>
            {task ? 
              <button type="button" onClick={onDelete} className="bg-gray-400 text-white py-2 px-4 rounded">
                Delete
              </button>
              : null
            }
            <button type="button" onClick={task? ()=>updateTask() : ()=>createTask()} className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500">
              {task? "Update":"Create"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateUpdateTaskModal;
