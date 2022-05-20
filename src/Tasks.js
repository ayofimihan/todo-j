import Task from "./Task"

const Tasks = ({tasks, onChecked, handleXxx, deleteTask}) => {
 
  return (
    <>
      <section className='tasks'>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onChecked={onChecked} deleteTask={deleteTask} />
        ))}
        <div className="task">
          <p>{tasks.length} items left</p>
          <p>All</p>
          <p>Active</p>
          <p>completed</p>
          <p>clear completed</p>
        </div>
        <button onClick={handleXxx}>champion</button>
      </section>
    </>
  )
}

export default Tasks
