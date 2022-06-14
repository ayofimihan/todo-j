import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Task = ({ task, deleteTask, addToSelected, removeFromSelected }) => {
	const [selected, setSelected] = useState(false);

	const handleCheck = (id) => {
		// If task is not selected, select the task and add its id to selectedIds
		// if task is selected, unselect the task and remove the id from selectedIds
		if (!selected) {
			addToSelected(id);
		} else {
			removeFromSelected(id);
		}

		setSelected(!selected);
	};

	return (
		<div className="task">
			<input
				type="checkbox"
				className="checkbox-round"
				onClick={() => handleCheck(task.id)}
			/>
			<p className={task.completed ? "completedp" : "taskp"}>{task.text}</p>
			<FaTimes onClick={() => deleteTask(task.id)} />
		</div>
	);
};

export default Task;
