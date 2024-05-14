
export async function fetchDataFromServer(dispatch) {
  try {
    const response = await fetch('http://127.0.0.1:4000/todo');
    if (!response.ok) throw new Error(`An error occurred: ${response.statusText}`);
    const data = await response.json();
    // const tododata=Object.values(data)
    dispatch({ type: 'geted', data:data.data  });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export async function createTask(task,dispatch) {
  try {
    const response = await fetch('http://127.0.0.1:4000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error(`Error creating task: ${response.statusText}`);
    const createdTask = await response.json().data;
    const newTask = {
      id: createdTask.id,
      title: createdTask.title, // 假定title对应数据库中的"title"字段
      done: createdTask.status === 1, // 假定status为1表示任务已完成
    };
    // 直接使用服务器返回的数据来更新状态
    dispatch({ type: 'added', title: newTask.title ,id:newTask.id });
   //实际上传递的是整个原始任务对象到API，并期望使用服务器返回的（可能带有新ID或其他更新信息）数据来更新状态。因此，您应该使用从服务器响应中解构的 createdTask 数据来构造动作对象。
   console.log('任务创建成功');
  //  return createdTask.data; // 直接返回服务器响应的数据
  return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

export async function updateTask(task,dispatch) {
  try {
    const response = await fetch(`http://127.0.0.1:4000/todo/${task.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error(`Error updating task: ${response.statusText}`);
    dispatch({ type: 'changed', task });
    // const updateTasks = await response.json().data;
    // return updateTasks;
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

export async function deleteTask(id,dispatch) {
  try {
    const response = await fetch(`http://127.0.0.1:4000/todo/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Error deleting task: ${response.statusText}`);
    // dispatch({ type: 'deleted', id });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}