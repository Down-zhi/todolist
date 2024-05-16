import { createContext } from "react";
// TasksContext 提供当前的 tasks 列表。
// TasksDispatchContext 提供了一个函数可以让组件分发动作
export const TasksContext = createContext([]);          
export const TasksDispatchContext = createContext(null);
