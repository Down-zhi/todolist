import { useState, useContext ,useEffect} from 'react';
import { TasksContext, TasksDispatchContext } from './TaskContext.js';
export function TaskList(){
    // const tasks = useContext(TasksContext);

    //请求的数据该不该在这
    const [todos, setTodos] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://127.0.0.1:4000/todo'); 
          if (!response.ok) {
            throw new Error(`An error occurred: ${response.statusText}`);
          }
          const data = await response.json();
          setTodos(data);
        } catch (error) {
          console.error('Error fetching data on mount:', error);
        }
      }
  
      fetchData();
    }, []); // 空数组作为依赖，确保只在组件挂载时运行一次
    return( <>
           <ul className='todo-list'>
            {todos.map(task=>(<li  className='todo-li' key={task.id}><Task task={task}/></li>))}
            </ul></>)
    //返回什么 把tasks给遍历到Task中
}

function Task({task}){
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TasksDispatchContext);
    let taskContent;
    // 编辑模式taskContent是什么 不是编辑模式内容是 返回什么?
    if(isEditing){
        taskContent=(<> <input className='edit-input ' value={task.text} onFocus={(e)=>e.target.value=''} onChange={(e)=>{ dispatch({ type:'changed',task:{...task,text:e.target.value}}) }}></input>
                    <button className='save' onClick={()=>setIsEditing(false)} >Save</button>
                    <button className='cancel' onClick={()=>setIsEditing(false)}>Cancel</button>
                    </>)
    }else{ taskContent=(<><span>{task.text}</span><button className='edit' onClick={()=>setIsEditing(true)}>Edit</button> 
                       <button className='delete' onClick={() => {dispatch({type: 'deleted',id:task.id})}}>Delete</button></> 
                                //     删除操作本质上只需要知道要删除哪个任务的ID即可，不需要保留任务的其他信息。你只是告诉 reducer 需要删除一个任务，并通过提供id来标识它   
   )
    }
    return ( 
        <>
        <input className='div1' type='checkbox' checked={task.done} onClick={(e)=>{dispatch({type:'changed',task:{...task,done:e.target.checked}})}}></input>
        {/* 你需要保留任务对象原有的所有属性不变，仅更新done属性。这里...task是展开运算符（spread operator）的应用，它将task对象的所有属性复制到一个新的对象中，然后你单独修改done属性的值。这样做避免了直接修改原任务对象，而是创建了一个新的对象来描述任务状态的变化，符合不可变性原则 */}
        {taskContent}
        
      
        </>
    )
}