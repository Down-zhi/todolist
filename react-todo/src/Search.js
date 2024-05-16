import { useContext,useState} from "react";
import { TasksContext, TasksDispatchContext } from './TaskContext.js';
import { TaskList } from "./TaskList.js";

export function FilterableList() {
    const[text,setText]=useState('');
    const tasks=useContext(TasksContext)
    const dispatch=useContext(TasksDispatchContext)
    let filters=filterItems(tasks, text);
   
    function filterItems(tasks, text) {
     let task = text.toLowerCase();
    let searchTask= tasks.filter(item =>             
          item.title.split(' ').some(word =>          
            word.toLowerCase().startsWith(task)   
          )
        );
        if(searchTask.length<2){
            return searchTask
        }else{
            return []
        }
      }
       
    function handlequeryChange(e){
     setText(e.target.value)
    }
    let taskContent;
    if(filters.length>0){
        taskContent=( <>  
        <TaskList key={filters.id} tasks={filters}/>
        </>)}else if(text!='') {
     taskContent = (<p className="search-fail">没有找到事件:{text}</p>)
        }

    return (<><SearchBar onChange={handlequeryChange} />
    <div className="search"></div>
     {taskContent}
    <div className="search"></div>
        </> )
    }
    
    function SearchBar({onChange}){
    return (<label className="label"> <input className="search-input" placeholder="Search" onChange={onChange}></input> <span className="search-btn">O</span></label>)
    }