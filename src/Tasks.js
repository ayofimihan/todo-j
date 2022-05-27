import { useState } from "react";
import Task from "./Task";

const Tasks = ({ tasks, onChecked, deleteTask, clearSelected, showCompleted}) => {
	const [selectedIds, setSelectedIds] = useState([]);

	const addToSelected = (id) => {
		setSelectedIds([...selectedIds, id]); // Previous selectedIds plus the new Id
	};

	const removeFromSelected = (id) => {
		let newSelected = selectedIds.filter((item) => item !== id); // Previous selectedIds minus the Id we passed in

		setSelectedIds(newSelected);
	};

	const handleClearSelected = (id) => {
		if (selectedIds.length === 0) return; // Do nothing if no task is selected

		clearSelected(selectedIds);
		setSelectedIds([]); // reset selected ids state
	};

  const handleShowCompleted = () => {
    if (selectedIds.length === 0) return // Do nothing if no task is selected

    showCompleted(selectedIds)
    // setSelectedIds([]) // reset selected ids state
  }

 

	return (
    <>
      <section className='tasks'>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onChecked={onChecked}
            deleteTask={deleteTask}
            addToSelected={addToSelected}
            removeFromSelected={removeFromSelected}
          />
        ))}
        <div className='task'>
          <p>{tasks.length} items left</p>
          <p>All</p>
          <p>Active</p>
          <p onClick={handleShowCompleted}>completed</p>
          <p onClick={handleClearSelected} className='hov'>
            clear completed
          </p>
        </div>
      </section>
    </>
  )
};

export default Tasks;
