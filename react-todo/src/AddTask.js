import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TaskContext.js';
export  function AddTask(){
    const [text, setText] = useState('');
    const dispatch = useContext(TasksDispatchContext);
    //返回什么  点击添加task的 dispatch函数 type是added,逻辑在appjs的reducer函数里
    let nextId = 3;
    return(
        <>
        <input className='todo-input' value={text} onChange={(e)=>setText(e.target.value)} placeholder='Add tasks'></input><br/>
        <button className='todo-button' onClick={() => {setText('');dispatch({type: 'added',id: nextId++,text: text, }); }}>Add</button>
        {/* dispatch函数中的type是reducer函数的 case 'addad',text,id是action的属性 */}
        </>
    )
}