import React, { useState, useEffect } from 'react';
import { TaskList } from './TaskList';

export function Gettodos() {
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
};

