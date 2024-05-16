import { useContext,useState} from "react";
import { TasksContext, TasksDispatchContext } from './TaskContext.js';
import { fetchDataFromServer } from "./Request.js";

export function Filter() {
  const dispatch = useContext(TasksDispatchContext);
 const [now,setnow]=useState('all')
  const handleFilter = async (filterType) => {
      try {
        await fetchDataFromServer(dispatch); 
          dispatch({ type: filterType  }); 
          setnow(filterType) 
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }
  return (
      <div className="buts">
          <button id="reset" className="button"    disabled={now==='all'}  onClick={() => handleFilter('all')} >All</button>
          {/* 1、“==”只判断数值不判断数据类型，而“===”判断数值也判断数据类型；
         2、用“==”作比较时可以自动转换数据的类型，而“===”不可以自动转换数据的类型； */}
          <button id="active" className="button2"     onClick={() => handleFilter('active')}>Active</button>
          <button id="completed" className="button3" disabled={now==='completed'} onClick={() => handleFilter('completed')}>Completed</button>
      </div>
  );
}
