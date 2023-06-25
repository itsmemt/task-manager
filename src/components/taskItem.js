import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/slices/taskSlice";
import AddTaskForm from "./addTaskForm";
import toast from "react-hot-toast";
import "../styles/taskItem.css";

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateTask,setUpdateTask]=useState("");

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast.success("Task Deleted Successfully");
  };

  const handleUpdate = (task) => {
    setUpdateTask(task)
    setUpdateModalOpen(true);
  };

  return (
    <>
    <div className="item">
        <table className="w-[100%] table-auto overflow-scroll">
          <tr className="bg-gray-300">
            <th>Date</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {task.map((task) => (
            <tr key={task.id} className="text-center">
              <td><p className="date">{task.date}</p></td>
              <td><p className="taskTitle">{task.title}</p></td>
              <td><p >{task.description}</p></td>
              <td className={ task.status==="Completed" ? 
              "text-teal-500" : task.status==="To Do" ? 
              "text-pink-500" : task.status==="In Progress" ? 
              "text-yellow-500" : "text-blue-500" 
            }><p className="w-[fit-content] p-[5px] rounded-md bg-gray-300" 
            >{task.status}</p></td>
              <td className="flex gap-2">
                  <div
                    className="icon"
                    onClick={() => handleDelete(task.id)}
                    onKeyDown={() => handleDelete(task.id)}
                  >
                  <MdDelete />
                  </div>
                  <div
                    className="icon"
                    onClick={() => handleUpdate(task)}
                    onKeyDown={() => handleUpdate(task)}
                  >
                    <MdEdit />
                  </div>
              </td>
            </tr>
          ))}
        </table>
        </div>
      <AddTaskForm
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        task={updateTask}
      />
    </>
  );
}

export default TaskItem;
