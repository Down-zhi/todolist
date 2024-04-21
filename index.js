// 定义接口api
//   获取先全部数据
const getTodos = () => {
  return fetch("http://127.0.1:4000/todo", { method: "GET" }).then((res) =>
    res.json()
  );
};

// 新增todo
const createTodo = (data) => {
  return fetch("http://127.0.1:4000/todo", { method: "POST", data: data });
};

// 新增数据
const addTodoDomToHtml = (title) => {
  const todoListDom = document.getElementById("todo-list");
  const todoItemDom = document.createElement("li");
  todoItemDom.innerText = title;
  todoListDom.appendChild(todoItemDom);
};

// 1、拉取数据,渲染数据
const getTodosAndRender = () => {
  getTodos()
    .then((res) => {
      const todoDatas = res["data"] || [];
      todoDatas.forEach((item) => {
        addTodoDomToHtml(item.title);
      });
    })
    .catch((error) => {
      console.error(error.message);
    });
};

// 执行
function main() {
  getTodosAndRender();
}

// 浏览器资源加载完成执行
window.onload = () => {
  main();
};
