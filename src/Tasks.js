import { useState } from "react";
import Task from "./Task";

const Tasks = ({ tasks, onChecked, handleXxx, deleteTask, clearSelected }) => {
	const [selectedIds, setSelectedIds] = useState([]);

	const addToSelected = (id) => {
		setSelectedIds([...selectedIds, id]); // Previous selectedIds plus the new Id
	};

	const removeFromSelected = (id) => {
		let newSelected = selectedIds.filter((item) => item !== id); // Previous selectedIds minus the Id we passed in

		setSelectedIds(newSelected);
	};

	const handleClearSelected = () => {
		if (selectedIds.length === 0) return; // Do nothing if no task is selected

		clearSelected(selectedIds);
		setSelectedIds([]); // reset selected ids state
	};

	return (
		<>
			<section className="tasks">
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
				<div className="task">
					<p>{tasks.length} items left</p>
					<p>All</p>
					<p>Active</p>
					<p>completed</p>
					<p>clear completed</p>
				</div>
				<button onClick={handleXxx}>champion</button>
				<button onClick={handleClearSelected}>Clear selected Tasks</button>
			</section>
		</>
	);
};

export default Tasks;
