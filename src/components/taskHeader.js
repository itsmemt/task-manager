import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { SelectBox } from "./button";
import AddTaskForm from "./addTaskForm";
import { updateFilterStatus,searchTaskByTitle,toggleSortOrder } from "../store/slices/taskSlice";
import { CiFilter } from 'react-icons/ci';
import { HiSortDescending } from 'react-icons/hi';
import { HiOutlineSearch } from 'react-icons/hi';
import TaskItem from "./taskItem";
import "../styles/taskHeader.css";
function TaskHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.task.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const [toggleSortIcon,setToggleSortIcon]=useState('rotate-180');
  const dispatch = useDispatch();
  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };
  const handleSearch = (e) => {
    const searchedTask = e.target.value;
    dispatch(searchTaskByTitle(searchedTask));
  };
  const handleToggleSort = () => {
    setToggleSortIcon(toggleSortIcon==="rotate-0" ? "rotate-180" :"rotate-0")
    dispatch(toggleSortOrder());
  };
  const taskList = useSelector((state) => state.task.taskList);
  const sortedtaskList = [...taskList];  
  const filteredtaskList = sortedtaskList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

const style="bg-gray-300 flex justify-center items-center text-3xl m-5 px-[15px] py-1 rounded-md "
  return (
    <div className="relative">
      <div className="w-[100%] flex justify-between taskHeaderContainer">
        <div>
          <p className="text-3xl bg-gray-200 p-[10px] m-5">Task List</p>
        </div>
        <div className="taskListHeader">
        <div className={style}>
          <HiOutlineSearch/> &nbsp;
          <input 
          className={`${style} outline-0 m-0 `}
          type="search"
          placeholder="Search" 
          onKeyDown ={(e)=>handleSearch(e)}
          />
          </div>
          <div className={`${style} cursor-pointer`}onClick={handleToggleSort}>
          <HiSortDescending className={toggleSortIcon}/> Sort &nbsp;
          </div>
          <div className={style}>
            <CiFilter/> Filter &nbsp;
            <SelectBox
              id="status"
              onChange={(e) => updateFilter(e)}
              value={filterStatus}
            >
              <option value="all">All</option>
              <option value="To Do">To do</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Testing">Testing</option>
            </SelectBox>
          </div>
          <div className="m-5 flex justify-center items-center">
            <Button
              variant="primary"
              type="button"
              onClick={() => setModalOpen(true)}
            >
              Add Task
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[100%] absolute">
        {filteredtaskList && filteredtaskList.length > 0 ? (
          <TaskItem task={filteredtaskList} />
        ) : (
          <p className="text-lg bg-gray-300 text-center p-[10px]">
            No tasks to Show.
          </p>
        )}
      </div>
      <div className="absolute w-[100%]">
        <AddTaskForm
          type="add"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
}

export default TaskHeader;
