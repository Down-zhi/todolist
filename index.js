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
  todoItemDom.dataset.id = id;
  addDeleteButtonTodo(todoItemDom,title, id);
  addEditButtonTodo(todoItemDom,title, id);
  const checkbox = document.createElement('input')
  checkbox.classList.add('div1')
  checkbox.type = 'checkbox'
  if (status===1){
    checkbox.checked = true;
    todoItemDom.dataset.status=1
  }else{
    checkbox.checked=false
    todoItemDom.dataset.status=0
  }
  todoItemDom.prepend(checkbox)

  checkbox.addEventListener('click', () => {
    const status = checkbox.checked ? 1 : 0;
    updateTodoStatus(id, status)
      .then(() => {
        // todoItemDom.classList.toggle('status', status === 1);
        todoItemDom.dataset.status = status;
        console.log('Todo updated successfully:');
        let lis = document.querySelectorAll('li');
        console.log(lis.length);
        console.log(initLength);
        // lis.forEach(lis=>{
        //   if(lis.style.display='block'){
        //     Alltodo()
        //   }else if(lis.style.display='none')
        //   {
        //  if(status===0){
        //   completedtodo()
        //  }else if (status===1){
        //   Activetodo()
        //  }
        // }
        // })
        // const ALL=document.getElementById('reset')
        // const expandedButton = document.querySelector('button[aria-expanded="true"]');
        // if (ALL.style.contain(aria-expanded)){
        //   Alltodo()
        // }else
       
    
      })

})

}

// 删除 DOM 中的 todo 项
const removeTodoDomItem = (domElement) => {
  domElement.parentNode.removeChild(domElement);
};

//更新 DOM 中的 todo 标题
const updateTodoDomTitle = (domElement, newTitle) => {
  domElement.innerHTML =`<span>${newTitle}</span>`;
};

let initLength = 0;

//保存数据长度
const getLength = (type) => {
  if (type === 'add') {
    initLength += 1;
  } else if (type === 'delete') {
    initLength -= 1;
  }
  // if(type==='Active'){
  //   initLength-=1
  // }else if (type==='complted'){
  //   initLength-=1
  // }
  const remain = document.getElementById("remain");
  const remains = (`${initLength}tasks remaining`)
  remain.innerHTML = remains

}


// 添加完数据清除 input文本框
const clearInput = () => {
  document.getElementById("todo-input").value = "";
};
let maxId = 0
// 1、拉取数据,渲染数据
const getTodosAndRender = () => {
  getTodos()
    .then((res) => {
      const todoDatas = res["data"] || [];
      initLength = todoDatas.length;
      todoDatas.forEach((item) => {
        addTodoDomToHtml(item.title, item.id,item.status);
        maxId = item.id;
      });

      const remain = document.getElementById("remain");
      const remains = (`${initLength}tasks remaining`)
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
    createTodo({ title, })
      .then((res) => {
        if (res.data && res.data.title) addTodoDomToHtml(res.data.title, ++maxId);
        clearInput();
        getLength('add');
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
};

// 3.添加删除按钮并绑定点击事件
const addDeleteButtonTodo = (todoItemDom,title, id,data) => {
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
      .then(() => removeTodoDomItem(todoItemDom)).then(() => getLength('delete'))
      .catch((error) => console.error(error.message));
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
// 4.添加取消和保存按钮触发时隐藏编辑和删除按钮
const editInput = document.createElement('input');
const cancelButton=document.createElement('button');
const saveButton = document.createElement('button');
const editButton=document.querySelectorAll('edit')
const deleteButton=document.querySelectorAll('delete')
//5.编辑按钮触发事件
const addEditButtonTodo = (todoItemDom,title) => {
  const editButton = document.createElement('button');
  editButton.classList.add('edit');
  editButton.innerText = 'Edit';
  todoItemDom.appendChild(editButton); 
  editButton.addEventListener('click', () => toggleEditMode(todoItemDom)); 
};


//6.编辑功能 
const toggleEditMode = (todoItemDom) => {
  //创建修改文本的文本框
  const titleSpan = todoItemDom.querySelector('span');
  // const editInput = document.createElement('input');
  //把原本的title传入input
  editInput.value = titleSpan.innerText;
  editInput.classList.add('edit-input')
  todoItemDom.replaceChild(editInput, titleSpan);

//创建取消按钮
//  const cancelButton=document.createElement('button');
 cancelButton.innerText='Cancel';
 cancelButton.classList.add('cancel');
 todoItemDom.appendChild(cancelButton);
//创建保存按钮
  // const saveButton = document.createElement('button');
  saveButton.innerText = 'Save';
  saveButton.classList.add('save');
  todoItemDom.appendChild(saveButton);
  const editButton = todoItemDom.querySelector('.edit');
  const deleteButton=todoItemDom.querySelector('.delete')
  //点击编辑按钮后 编辑和删除按钮隐藏
//   if(cancelButton.style.display='block'){
//   editButton.style.display = 'none'
//   deleteButton.style.display='none'
//   editInput.style.display='block'
//   saveButton.style.display='block'
// }else{
//   editButton.style.display='block'
//   deleteButton.style.display='block'
// }

    editButton.style.display = 'none'
  deleteButton.style.display='none'
  //保存按钮 把输入框里的文本替换原本原本的值
  saveButton.addEventListener('click', () => {
    const newTitle = editInput.value.trim();
    if (newTitle !== '') {
      updateTodoTitle(todoItemDom.dataset.id, newTitle)
        .then(() => {
          updateTodoDomTitle(todoItemDom, newTitle);
          editButton.style.display = 'inline-block';
        })
        .catch((error) => console.error(error.message));
    } else {
      alert('Title cannot be empty!');
    }
  })

};
//点击取消按钮后 隐藏输入框和两个两个按钮  编辑和删除按钮恢复
cancelButton.addEventListener('click',()=>{
  editButton.style.display='block'
  deleteButton.style.display='block'
  editInput.style.display='none'
  cancelButton.style.display='none'
  saveButton.style.display='none'
  titleSpan.value=editInput.value
  titleSpan.classList.add('span')
  todoItemDom.appendChild( titleSpan);
})
//7.发送请求更新为新的title
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

const Active = document.getElementById('active');
const completed = document.getElementById('Completed');
const ALL=document.getElementById('reset')
//在进行的
Active.addEventListener('click', Activetodo)

function Activetodo() {
  const remain = document.getElementById("remain");
  const done=document.querySelectorAll('li[data-status="0"]')

  const remains = (`${done.length}tasks activing`)
  remain.innerHTML = remains
  let lis = document.querySelectorAll('li')
  lis.forEach(lis => {
    if (lis.dataset.status === '1') {
      lis.style.display = 'none';
    } else {
      lis.style.display = 'block';

    }
  })
  
}

//完成的
completed.addEventListener('click', completedtodo)
function completedtodo() {
  const remain = document.getElementById("remain");
  const done=document.querySelectorAll('li[data-status="1"]')
  const remains = (`${done.length}tasks Complted`)
  remain.innerHTML = remains
  let lis = document.querySelectorAll('li');
  lis.forEach(lis => {
    if (lis.dataset.status==='1') {

      lis.style.display = 'block';
    } else {
      lis.style.display = 'none';
    }
  })
//   const  checkbox=document.querySelector('.div1')
//   checkbox.addEventListener('click', (id,status) => {
//     const status = checkbox.checked ? 1 : 0;
//     updateTodoStatus(id, status)
//       .then(() => {
//         // todoItemDom.classList.toggle('status', status === 1);
//         todoItemDom.dataset.status = status;
//         console.log('Todo updated successfully:');
//         todoItemDom.remove()
//       })
//       getLength(completed)
// })

}
//全部的 
ALL.addEventListener('click',Alltodo)

function Alltodo(){
  const ALL=document.getElementById('reset')
  ALL.setAttribute('aria-expanded','true')
  let lis = document.querySelectorAll('li');
  lis.forEach(lis => {
    lis.style.display = "block"
})
const remain = document.getElementById("remain");
  const remains = (`${lis.length}tasks remaining`)
  remain.innerHTML = remains
}
// 执行
function main() {
  // 初始化渲染
  getTodosAndRender();
  // 事件添加
  const addButton = document.getElementById("todo-button");
  addButton.addEventListener("click", addTodo, false);



}

// 浏览器资源加载完成执行
window.onload = () => {
  main();
};
