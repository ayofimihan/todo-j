import { useState, useEffect } from "react";
import Task from "./Task";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [text, setText] = useState("");
	const [selectedIds, setSelectedIds] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};
		getTasks();
	}, []);

	//fetch tasks
	const fetchTasks = async () => {
		const res = await fetch("http://localhost:5000/tasks");
		const data = await res.json();
		if (res.ok) {
			return data;
		} else {
			console.error(data);
			return [];
		}
	};

	// Adding task
	const addTask = async (e) => {
		e.preventDefault();
		if (!text) return;
		let task = { text, completed: false };
		const res = await fetch("http://localhost:5000/tasks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(task),
		});

		let newTask = await res.json();
		setTasks([...tasks, newTask]);
		setText("");
	};

	const deleteTask = async (id) => {
		const response = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "DELETE",
		});

		if (response.ok) {
			let newTasks = tasks.filter((task) => task.id !== id);
			setTasks(newTasks);
		}
	};

	const clearSelected = async (idList) => {
		// Remove selected tasks from tasks
		for (let i = 0; i < idList.length; i++) {
			const del = async (id) => {
				await fetch(`http://localhost:5000/tasks/${id}`, {
					method: "DELETE",
				});
			};
			del([idList[i]]);
		}
		let newTasks = await fetchTasks();
		setTasks(newTasks);
		setSelectedIds([]);
	};

	// const showCompleted = (idList) => {
	// 	let newTaskss = [...tasks];
	// 	idList.forEach((id) => {
	// 		newTaskss = newTaskss.filter((task) => task.id === id);
	// 	});
	// 	setTasks(newTaskss);
	// };

	const addToSelected = (id) => {
		setSelectedIds((prevState) => [...prevState, id]); // Previous selectedIds plus the new Id
		console.log(selectedIds);
	};

	const removeFromSelected = (id) => {
		let newSelected = selectedIds.filter((item) => item !== id); // Previous selectedIds minus the Id we passed in

		setSelectedIds(newSelected);
		console.log(selectedIds);
	};

	const handleClearSelected = () => {
		if (selectedIds.length === 0) return; // Do nothing if no task is selected

		clearSelected(selectedIds);
		setSelectedIds([]); // reset selected ids state
	};

	// const handleShowCompleted = () => {
	//   if (selectedIds.length === 0) return // Do nothing if no task is selected

	//   showCompleted(selectedIds)
	//   // setSelectedIds([]) // reset selected ids state
	// }

	return (
		<>
			<form onSubmit={addTask}>
				<input
					type="text"
					placeholder="Create a new Todo..."
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
				/>
				<input type="submit" className="btn" />
			</form>
			<section className="tasks">
				{tasks.map((task) => (
					<Task
						key={task.id}
						task={task}
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
					<p onClick={handleClearSelected} className="hov">
						clear completed
					</p>
				</div>
			</section>
		</>
	);
};

export default Tasks;
