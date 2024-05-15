import { useState, useContext ,useEffect} from 'react';
import { TasksContext, TasksDispatchContext } from './TaskContext.js';
export function TaskList({tasks=[]}){
    //  const tasks = useContext(TasksContext);
     const dispatch=useContext(TasksDispatchContext)
    // useEffect(() => {
    //   fetchDataFromServer(dispatch);    // 在组件加载时获取数据
    // }, [dispatch]);
    // const filteredTasks = tasks.filter(task => {
    //     if (filterStatus === 'active') return task.status === 0;
    //     if (filterStatus === 'completed') return task.status === 1;
    //     return true; // 显示所有
    // });
    return( <>
           <ul className='todo-list'>
            {tasks.map(task=>(<li  key={task.id} id={task.id} data-status={task.status} className='todo-li' >
            <input className='div1' type='checkbox'  checked={task.status === 1} onChange={()=>{ const newState = task.status === 1 ? 0 : 1;  dispatch({type:'changed',task:{...task, status:newState}})}  }></input>
            <Task  dispatch={dispatch} task={task}/></li>))}
            </ul></>)
    //返回什么 把tasks给遍历到Task中
}

function Task({task}){
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TasksDispatchContext);
    let taskContent;
    // 编辑模式taskContent是什么 不是编辑模式内容是 返回什么?
    if(isEditing){
        taskContent=(<> 
                   <input className='edit-input ' value={task.title} onFocus={(e)=>e.target.value=''} onChange={(e)=>{ dispatch({ type:'changed',task:{...task,title:e.target.value}}) }}></input>
                    <button className='save' onClick={()=>setIsEditing(false)}  >Save</button>
                    <button className='cancel' onClick={()=>setIsEditing(false)}>Cancel</button>
                    </>)
    }else{ taskContent=(<>
                       <span>{task.title}</span><button className='edit' onClick={()=>setIsEditing(true)}>Edit</button> 
                       <button className='delete' onClick={() => {dispatch({type: 'deleted',id:task.id})}}>Delete</button></> 
                      // 删除操作本质上只需要知道要删除哪个任务的ID即可，不需要保留任务的其他信息。你只是告诉 reducer 需要删除一个任务，并通过提供id来标识它   
   )
    }
    return ( 
        <>
        {taskContent} 
        </>
    )
}