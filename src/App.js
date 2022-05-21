import "./App.css";
import Tasks from "./Tasks";
import { useState } from "react";

function App() {
	const [tasks, setTasks] = useState([
		{ id: 1, text: "my name is ogunsina champion" },
		{ id: 2, text: "task 2" },
		{ id: 3, text: "task 3" },
		{ id: 4, text: "task 4" },
		{ id: 5, text: "task 5" },
	]);
	const [text, setText] = useState("");

	const handleChamp = () => {
		setTasks([
			{ id: 3, text: "task 3" },
			{ id: 4, text: "task 4" },
		]);
	};

	let newUser = { id: tasks.length + 1, text };
	const addTask = (e) => {
		e.preventDefault();

		// setUserArray((prevUserArray) => [...prevUserArray, newUser])
		setTasks([...tasks, newUser]);

		setText("");
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	console.log(text);

	const clearSelected = (idList) => {
		// Remove selected tasks from tasks
		let newTasks = [...tasks]; // Clone tasks
		idList.forEach((id) => {
			// Remove task with this id from newTasks
			newTasks = newTasks.filter((task) => task.id !== id);
		});

		// Tasks is now new tasks
		setTasks(newTasks);
	};

	return (
		<div>
			<header>
				<h1>TODOIST</h1>
			</header>
			<form action="" onSubmit={addTask}>
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

			<Tasks
				tasks={tasks}
				handleXxx={handleChamp}
				deleteTask={deleteTask}
				clearSelected={clearSelected}
			/>
		</div>
	);
}

export default App;
