import { useState } from "react"
import {FaTimes} from 'react-icons/fa'

const Task = ({task, onChecked, deleteTask}) => {

    const [style, setStyle] = useState('taskp')
    const [selectedId, setSelectedId] = useState([])

    const updateStyle = (id) => {
              setSelectedId([...selectedId, task.id])


      if (style === 'taskp'){
        console.log(selectedId)
      setStyle('completedp')
      
    }
      else{
        setStyle('taskp')

      }
    }

  return (
    <div className="task">
     <input type="checkbox" className="checkbox-round" onClick={()=>updateStyle(task.id)} />
      <p className={style}>{task.text}</p>
      <FaTimes onClick={()=>deleteTask(task.id)}/>  
    </div>
  )
}

export default Task