import { useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TaskContext.js';
export function Remain(){
    const tasks=useContext(TasksContext)
 let remain=tasks.length > 1 ? 'tasks' : 'task'
    return ( <h1 className='remain'>{tasks.length +' '+ remain +' '+ 'remaing'}  </h1>    )
}