import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get("http://127.0.1:4000/todo")
      .then((response) => {
        const todoDatas = response.data || [];
        setTodos(todoDatas);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createTodo = (data) => {
    axios
      .post("http://127.0.0.1:4000/todo", data)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.error("Failed to add todo:", error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://127.0.0.1:4000/todo/${id}`)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTodo = (id, data) => {
    axios
      .post(`http://127.0.0.1:4000/todo/${id}`, data)
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = todos.slice(startIndex, endIndex);

    return pageData.map((item) => (
      <li key={item.id} className="todo-li" data-id={item.id} status={item.status}>
        <input className="div1" type="checkbox" checked={item.status === 1} onChange={() => handleToggle(item.id)} />
        <span>{item.title}</span>
        <button className="edit" onClick={() => handleEdit(item.id, item.title)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
      </li>
    ));
  };

  const handleToggle = (id) => {
    const todo = todos.find((item) => item.id === id);
    const newStatus = todo.status === 0 ? 1 : 0;

    updateTodo(id, { status: newStatus });
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleEdit = (id, title) => {
    const newTitle = prompt("Enter a new name:", title);

    if (newTitle) {
      updateTodo(id, { title: newTitle });
    }
  };

  const handleAddTodo = () => {
    const title = prompt("Enter a new todo:");

    if (title) {
      createTodo({ title: title });
    }
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(todos.length / itemsPerPage);

    return Array.from({ length: totalPages }, (_, index) => (
      <button key={index + 1} className={currentPage === index + 1 ? "page-btn active-page" : "page-btn"} onClick={() => onPageChange(index + 1)}>
        {index + 1}
      </button>
    ));
  };

  return (
    <div>
      <ul id="todo-list">
        {renderPage()}
      </ul>
      <div id="pagination">
        {renderPaginationButtons()}
      </div>
      <button id="todo-button" onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoList;


