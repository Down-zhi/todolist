import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TaskContext.js';
import { createTask } from './Request.js';
export  function AddTask(){
    const [title, setTitle] = useState('');
    const dispatch = useContext(TasksDispatchContext);
    //返回什么  点击添加task的 dispatch函数 type是added,逻辑在appjs的reducer函数里
    const handleAddTask = async () => {
        if (title.trim()) { // 确保标题不为空
            try {
                // 发送请求并将响应用于更新状态
                const createdTask = await createTask( {title} ); 
                dispatch({ type: 'added', title: createdTask });
                setTitle(''); // 清空输入框
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };
    return(
        <>
        <input className='todo-input' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Add tasks'></input><br/>
        {/* <button className='todo-button' onClick={() => {createTask({title},dispatch)}}>Add</button>  */}
        <button className='todo-button' onClick={handleAddTask}>Add</button> 
        {/* <button onClick={() => {setTitle('');dispatch({type: 'added',title:title }); }}>Add</button> */}
        {/* dispatch函数中的type是reducer函数的 case 'addad',title,id是action的属性 */}
        </>
    )
}