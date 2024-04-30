const getTodos = () => {
  return $.ajax({
    url: "http://127.0.1:4000/todo", method: "GET", dataType: "json"
  });
};
const createTodo = (data) => {
  return $.ajax({
    url: "http://127.0.0.1:4000/todo", type: "POST", contentType: "application/json", data: JSON.stringify(data), dataType: "json"
  });
};
const deleteTodo = (id) => {
  return $.ajax({
    url: `http://127.0.0.1:4000/todo/${id}`, type: "DELETE", dataType: "json"
  });
};
const updateTodo = (id, data) => {
  return $.ajax({
    url: `http://127.0.0.1:4000/todo/${id}`, type: "POST", contentType: "application/json", data: JSON.stringify(data), dataType: "json"
  });
};
$(function () {
  const renderList = (filteredTodos = []) => {
    let allStr = '';
    filteredTodos.forEach(item => {
      let checked = item.status === 1 ? 'checked' : ''; 
      allStr += `
          <li class='todo-li' data-id='${item.id}' status='${item.status}'>
            <input class='div1' type="checkbox" ${checked}>
            <span>${item.title}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </li>`;
    });
    $('#todo-list').html(allStr);
  };
  const toggleFilterClass = (selector, className) => {
    $(selector).addClass(className);                    
  };
  const load = () => {
    getTodos()
      .then(res => {
        const todoDatas = res["data"] || [];
        renderList(todoDatas);
        let tasks = todoDatas.length > 1 ? 'tasks' : 'task'
        let remain = `${todoDatas.length}${tasks}remaining`
        $("#remain").html(remain)
      })
      .catch(error => console.error(error));
  };
 
  $('#todo-button').click(function () {
    const title = $('#todo-input').val().trim();
    console.log(title);
    if (title) {
      createTodo({ title: title }).then(function () {
        $('#todo-input').val('')         // 清空输入框
        load();                          // 刷新待办事项列表
      })
        .catch(function (error) {
          console.error("添加待办事项失败:", error);
        });
    }
  })
  load()
 
  $("#todo-list").on('click', 'button.delete', function () {
    let id = $(this).closest('li').data('id')
    deleteTodo(id).then((function () {
      $(this).closest('li').remove()
      load()
    })).catch((error) => console.error(error.message));
  })
  load()

  $('#todo-list').on('click', 'input.div1', function () {
    let id = $(this).closest('li').data('id');
    const newstatus = $(this).is(':checked') ? 1 : 0;
    $(this).closest('li').attr('status', newstatus)
    updateTodo(id, { status: newstatus })
      .then(() => {
        // 根据当前显示状态（active或completed）重新获取并渲染列表
        if ($("#active").hasClass("active-filter")) {
          $("#active").trigger("click");   // 重新加载active状态的任务
        } else if ($("#Completed").hasClass("completed-filter")) {
          $("#Completed").trigger("click"); // 重新加载completed状态的任务
        } else {
          load();                            // 全部状态则刷新整个列表
        }
      })
  })
 
  $("#todo-list").on('click', 'button.edit', function () {
    let oldtext = $(this).prev('span').text()
    let editinput = $(this).closest('li')
    let editmodle = ` <input class="edit-input" type="text">
  <button class="cancel">Cancel</button>
  <button class="save">Save</button>`
    $(this).closest('li').html(editmodle);          //直接用新标签覆盖之前的
    $(editinput).find('input').val(`New name for ${oldtext}`)
    $(editinput).find('input').focus(function () {
      $(this).val('')
    })
    $('.cancel').click(function () {
      load()
    })
    $('.save').click(function () {
      let newtitle = $(editinput).find('input').val()
      let id = $(this).closest('li').data('id');
      updateTodo(id, { title: newtitle })
      load()
    })
  })

  $("#reset").click(function () {
    $("#active").removeClass('active-filter')
    $("#Completed").removeClass('completed-filter')
    load()
  })
  $("#active").on('click', function () {
    $("#Completed").removeClass('completed-filter')
    toggleFilterClass('#active', 'active-filter');
    getTodos()
      .then(res => {
        const todoDatas = res["data"] || [];
        const activeTodos = todoDatas.filter(item => item.status === 0);
        renderList(activeTodos);
        let tasks = activeTodos > 1 ? 'tasks' : 'task'
        let remain = `${activeTodos.length}${tasks}remaining`
        $("#remain").html(remain)
      })
  })
  $("#Completed").on('click', function () {
    $("#active").removeClass('active-filter')
    toggleFilterClass('#Completed', 'completed-filter');
    getTodos()
      .then(res => {
        const todoDatas = res["data"] || [];
        const completedTodos = todoDatas.filter(item => item.status === 1);
        renderList(completedTodos);
        let tasks = completedTodos > 1 ? 'tasks' : 'task'
        let remain = `${completedTodos.length}${tasks}remaining`
        $("#remain").html(remain)
      })
  })
})






