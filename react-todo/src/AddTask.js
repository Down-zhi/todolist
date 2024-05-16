import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TaskContext.js';
export  function AddTask(){
    const [title, setTitle] = useState('');
    const dispatch = useContext(TasksDispatchContext);
    return(
        <>
        <input className='todo-input' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Add tasks'></input><br/>
        <button className='todo-button' onClick={()=> {if(title.trim()){dispatch({ type: 'added', title: title }); setTitle('')} }}>Add</button> 
        {/* dispatch函数中的type是reducer函数的 case 'addad',title,id是action的属性 */}
        </>
    )
}