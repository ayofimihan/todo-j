import "./App.css";
import Tasks from "./Tasks";

function App() {
	return (
		<div>
			<div className="banner-con">
				<div className="banner">
					<header className="">
						<h1>TODOIST</h1>
					</header>

					<Tasks />
				</div>
			</div>
		</div>
	);
}

export default App;
