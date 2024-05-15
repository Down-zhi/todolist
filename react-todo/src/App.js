import { useReducer,useEffect ,useState} from 'react';
import{ AddTask} from './AddTask.js';
import { Filter } from './Filter.js'; 
import { Remain } from './TasksRemain.js';
import { Page } from './paging.js';
import { fetchDataFromServer,createTask,deleteTask,updateTask } from './Request.js';//发送请求的组件
import'./App.css'
import{TasksContext, TasksDispatchContext} from './TaskContext.js'
//目前，tasks 状态和 dispatch 函数仅在顶级 TaskApp 组件中可用。要让其他组件读取任务列表或更改它，你必须显式 传递 当前状态和事件处理程序，将其作为 props。
//比起通过 props 传递它们，你可能想把 tasks 状态和 dispatch 函数都 放入 context。这样，所有的在 TaskApp 组件树之下的组件都不必一直往下传 props 而可以直接读取 tasks 和 dispatch 函数。
//如何结合使用 reducer 和 context ？
// 1.创建 context。(在TaskContext中)
// 2.将 state 和 dispatch 放入 context。将所有的 context 导入 TaskApp 组件。获取 useReducer() 返回的 tasks 和 dispatch 并将它们 提供 给整个组件树：
// 3.在组件树的任何地方 使用 context。现在你不需要将 tasks 和事件处理程序在组件树中传递：任何需要 tasks 的组件都可以从 TaskContext 中读取它,TaskApp 组件不会向下传递任何事件处理程序，TaskList 也不会。每个组件都会读取它需要的 context：
export default function App() {               //主组件
    const [tasks, dispatch] = useReducer(tasksReducer ,[]);
    useEffect(() => {
      fetchDataFromServer(dispatch);     //服务器请求
    }, [dispatch]);
    return (
      <TasksContext.Provider value={tasks}>  {/* 不需要再向子组件传递props，让tasks 的组件都可以从 TaskContext 中读取它： */}
        <TasksDispatchContext.Provider value={dispatch}>
         <h1> TodoList</h1>
         <h2>What needs to be done ?</h2>
         <AddTask />  
         <Filter /> 
         <Remain/>
         <Page/>
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    );
  }
  function tasksReducer(tasks, action) {
    switch (action.type) {
      case'geted':{
        const tododata=Object.values(action.data)
        return tododata.map(item => ({
          id: item.id,
          title: item.title, 
          status:item.status
        }));
      }
        case 'added': {
          const newTask = {
            id:action.id,
            title: action.title,
            status:0
          };
          createTask(newTask);
          return [...tasks,newTask];
        }
        case 'changed': {
          const updatedTasks = tasks.map((t) => {
            if (t.id === action.task.id) {
              updateTask(action.task);
              return action.task;
            } else {
              return t;
            }
          });
          return updatedTasks;
        }
        case 'deleted': {
          deleteTask(action.id);
          return tasks.filter((t) => t.id !== action.id);
        }case 'all':{
          return tasks;
        }
        case 'active':{
          let activetodo=tasks.filter((t)=>t.status===0);
          return  activetodo
        }
        case 'completed':{
          let completedtodo=tasks.filter((t)=>t.status===1);
          return  completedtodo
        }
        //这样写是错误的因为当触发active事件后task筛选成status===0，再次点击其他事件不会有结果出现因为不是从数据库中的筛选
        // 在点击改变type时从新获取数据让tasks是全部的数据 ，而不是筛选过的
        default: {
          throw Error('Unknown action: ' + action.type);
        }
      }
  }


