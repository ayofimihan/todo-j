import './App.css'
import Tasks from './Tasks'
import { useEffect, useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Adding task
  const addTask = async (task) => {
    let newTask = { id: tasks.length + 1, text }
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

     newTask = await res.json()
  console.log(newTask);  }

  // let newTask = { id: tasks.length + 1, text }
  // const addTask = (e) => {
  //   e.preventDefault()

  //   setTasks([...tasks, newTask])

  //   setText('')
  // }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  console.log(text)

  const clearSelected = (idList) => {
    // Remove selected tasks from tasks
    let newTasks = [...tasks] // Clone tasks
    idList.forEach((id) => {
      // Remove task with this id from newTasks
      deleteTask(id)
      newTasks = newTasks.filter((task) => task.id !== id)
  
    })

    // Tasks is now new tasks
    setTasks(newTasks)
  }

  const showCompleted = (idList) => {
    let newTaskss = [...tasks]
    idList.forEach((id) => {
      newTaskss = newTaskss.filter((task) => task.id === id)
    })
    console.log(newTaskss)
    setTasks(newTaskss)
  }

  //onsubmit
  // const onSubmit = (e)=>{
  //   e.preventDefault()
  //   if (!text){
  //     alert('please enter a task')
  //     return
  //   }
  // }

  return (
    <div>
      <div className='banner-con'>
        <div className='banner'>
          <header className=''>
            <h1>TODOIST</h1>
          </header>
          <form action='' onSubmit={addTask} >
            <input
              type='text'
              placeholder='Create a new Todo...'
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
            />
            <input type='submit' className='btn' />
          </form>

          <Tasks
            tasks={tasks}
            deleteTask={deleteTask}
            clearSelected={clearSelected}
            showCompleted={showCompleted}
          />
        </div>
      </div>
    </div>
  )
}

export default App
