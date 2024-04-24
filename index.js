let tab = 'all';
// 定义接口api
//   获取先全部数据
const getTodos = () => {
  return fetch("http://127.0.1:4000/todo", { method: "GET" }).then((res) =>
    res.json()
  );
};

// fetch POST请求新增todo
const createTodo = (data) => {
  return fetch("http://127.0.1:4000/todo", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) =>
    res.json()
  );
};
//delete请求删除todo 删数据要用id删除
const deleteTodo = (id) => {
  return fetch(`http://127.0.1:4000/todo/${id}`, {
    method: 'DELETe'
  }).then((res) => {
    res.json()
  });
};
// 更新指定 todo
const updateTodo = (id, data) => {
  return fetch(`http://127.0.1:4000/todo/${id}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) =>
    res.json()
  );
};

// 文本框新增数据
const addTodoDomToHtml = (title, id, status) => {
  const todoListDom = document.getElementById("todo-list");
  const todoItemDom = document.createElement("li");
  const liWithSpan = `<span>${title}</span>`;
  todoItemDom.innerHTML = liWithSpan;
  todoListDom.appendChild(todoItemDom);
  todoItemDom.classList.add('todo-li');
  todoItemDom.setAttribute('id', 'li')
  todoItemDom.dataset.id = id;
  addDeleteButtonTodo(todoItemDom, title, id);
  addEditButtonTodo(todoItemDom, title, id);
  const checkbox = document.createElement('input')
  checkbox.classList.add('div1')
  checkbox.type = 'checkbox'
  if (status === 1) {
    checkbox.checked = true;
    todoItemDom.dataset.status = 1
  } else {
    checkbox.checked = false
    todoItemDom.dataset.status = 0
  }
  todoItemDom.prepend(checkbox)
  checkbox.addEventListener('click', () => {
    const status = checkbox.checked ? 1 : 0;
    updateTodoStatus(id, status)
      .then(() => {

        todoItemDom.dataset.status = status;
        console.log('Todo updated successfully:');
        getTodosAndRender(tab)
      })

  })

}

// 删除 DOM 中的 todo 项
const removeTodoDomItem = (domElement) => {
  domElement.parentNode.removeChild(domElement);
};

//更新 DOM 中的 todo 标题
const updateTodoDomTitle = (domElement, newTitle) => {
  domElement.innerHTML = `<span>${newTitle}</span>`;
};

// 添加完数据清除 input文本框
const clearInput = () => {
  document.getElementById("todo-input").value = "";
};
// 1、拉取数据,渲染数据
const getTodosAndRender = (type = 'all') => {
  getTodos()
    .then((res) => {
      const todoDatas = res["data"] || [];
      const tasks = todoDatas.filter((i) => {
        switch (type) {
          case 'all':
            return todoDatas;
          case 'active':
            return i.status == 0
          case 'completed':
            return i.status == 1;
          default:
            return todoDatas;
        }
      });
      const todoListDom = document.getElementById("todo-list");
      todoListDom.innerHTML = '';
      tasks.forEach((item) => {
        addTodoDomToHtml(item.title, item.id, item.status);

      });
      const remain = document.getElementById("remain");
      const maxlength = tasks.length;
      const tasksortask = maxlength > 1 ? 'tasks' : 'task'
      const remains = (`${tasks.length}${tasksortask} ${tab === 'active' ? "activing" : tab === 'completed' ? 'completed' : 'remaining'}`)
      remain.innerHTML = remains

    })
    .catch((error) => {
      console.error(error.message);
    });

};

// 2、添加 todo
const addTodo = () => {
  const title = (document.getElementById("todo-input").value || "").trim();
  if (title !== "") {
    getTodosAndRender(tab)
    createTodo({ title, })
      .then((res) => {
        if (res.data && res.data.title) addTodoDomToHtml(res.data.title, ++maxId);
        clearInput();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
};

// 3.添加删除按钮并绑定点击事件
const addDeleteButtonTodo = (todoItemDom, title, id, data) => {
  const deleteButton = document.createElement('button');
  //增加div标签用来包含编辑和删除按钮
  const delandedit = document.createElement('div')
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete')
  todoItemDom.appendChild(delandedit)
  delandedit.classList.add('div2')
  delandedit.setAttribute('id', 'div2')
  delandedit.appendChild(deleteButton)
  //通过id删除数据
  deleteButton.addEventListener('click', () => {
    deleteTodo(id)
    .then(() => removeTodoDomItem(todoItemDom))
    .catch((error) => console.error(error.message));
    getTodosAndRender(tab)
  });

};

// 4.checkbox的点击status状态更新
const updateTodoStatus = (id, status) => {
  return updateTodo(id, { status })
      .then((res) => {
      if (status === 1) {
        console.log(`Todo with ID ${id} is completed.`);
      }
      return res.data;
      })
    .catch((error) => {
      console.error(error.message);
    });
};
// 添加取消和保存按钮触发时隐藏编辑和删除按钮
const editInput = document.createElement('input');
const cancelButton = document.createElement('button');
const saveButton = document.createElement('button');
//5.编辑按钮触发事件
const addEditButtonTodo = (todoItemDom, title) => {
  const editButton = document.createElement('button');
  editButton.classList.add('edit');
  editButton.innerText = 'Edit';
  todoItemDom.appendChild(editButton);
  const titleSpan = todoItemDom.querySelector('span');
  editButton.addEventListener('click', () => toggleEditMode(todoItemDom, titleSpan));
};

//6.编辑功能 
const toggleEditMode = (todoItemDom, titleSpan) => {
  //创建修改文本的文本框
  const deleteButton = todoItemDom.querySelector('.delete')
  const editButton = todoItemDom.querySelector('.edit');
  // 把原本的title传入input
  const originalTitle = titleSpan.innerText;
  titleSpan.style.visibility = 'hidden'
  editInput.style.visibility = "visible"
  editInput.value = `New name for--->${originalTitle}`;
  editInput.classList.add('edit-input')
  todoItemDom.appendChild(editInput)
  //创建取消按钮
  cancelButton.innerText = 'Cancel';
  cancelButton.classList.add('cancel');
  todoItemDom.appendChild(cancelButton);
  //创建保存按钮
  saveButton.innerText = 'Save';
  saveButton.classList.add('save');
  todoItemDom.appendChild(saveButton);
  cancelButton.style.display = 'block'
  saveButton.style.display = 'block'
  //隐藏编辑按钮
  editButton.style.display = 'none'
  deleteButton.style.display = 'none'
  //保存按钮绑定事件
  saveButton.addEventListener('click', () => {
    const newTitle = editInput.value.trim();
    if (newTitle !== '') {
      updateTodoTitle(todoItemDom.dataset.id, newTitle)
        .then(() => {
          updateTodoDomTitle(todoItemDom, newTitle);
          editButton.style.display = 'inline-block';
          toggleEditModeOff(originalTitle);
        })
        .catch((error) => console.error(error.message));
    } else {
      alert('Title cannot be empty!');
    } location.reload()
  })

};
//点击取消按钮后 进入取消编辑模式
cancelButton.addEventListener('click', (event) => {
  toggleEditModeOff(event);
})
//7.取消编辑模式，恢复文本和eidt，delete按钮
const toggleEditModeOff = (event) => {
  const clickedButton = event.target;
  const parentLi = clickedButton.closest('li');
  const deleteButton = parentLi.querySelector('.delete');
  const editButton = parentLi.querySelector('.edit');
  const titleSpan = parentLi.querySelector('span');
  titleSpan.style.visibility = "visible";
  editInput.style.visibility = "hidden";
  cancelButton.style.display = 'none';
  saveButton.style.display = 'none';
  // 显示编辑和删除按钮
  editButton.style.display = 'inline-block';
  deleteButton.style.display = 'inline-block';
};

const Active = document.getElementById('active');
const completed = document.getElementById('Completed');
const ALL = document.getElementById('reset');

//8.发送请求更新为新的title
const updateTodoTitle = (id, newTitle) => {
  return updateTodo(id, { title: newTitle })
    .then((res) => {
      console.log(`Todo with ID ${id} updated successfully.`);
      return res.data;
    })
    .catch((error) => {
      console.error(error.message);
    });
};
//9.查询代办事项和已经完成的事项
//在进行的
Active.addEventListener('click', Activetodo)
function Activetodo() {
  tab = 'active';
  getTodosAndRender(tab)
}
//完成的
completed.addEventListener('click', completedtodo)
function completedtodo(status) {
  tab = 'completed'
  getTodosAndRender(tab)
}
//全部的 
ALL.addEventListener('click', Alltodo)
function Alltodo() {
  tab = 'all';
  getTodosAndRender(tab)
}
// 执行
function main() {
  // 初始化渲染
  getTodosAndRender();
  // 事件添加
  const addButton = document.getElementById("todo-button");
  addButton.addEventListener("click", addTodo, false);
  //如果把事件都写在这代码简洁又精练，但能力不够只能先按照自己的写 
}

// 浏览器资源加载完成执行
window.onload = () => {
  main();
};
