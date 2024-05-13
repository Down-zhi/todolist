window.onload = function () {
  window.scrollTo(0, document.body.scrollHeight);
};
const getTodos = () => {
  return $.ajax({
    url: "http://127.0.1:4000/todo", method: "GET", dataType: "json"
  });
};
let currentPage = 1;
const itemsPerPage = 4;

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
document.documentElement.scrollIntoView({ block: 'end' });
function renderPage(page, todoDatas) {
  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let pageData = todoDatas.slice(startIndex, endIndex);
  const activeTodos = todoDatas.filter(item => item.status === 0);
  let activeDate = activeTodos.slice(startIndex, endIndex);    //activetodo 截取四个
  const completedTodos = todoDatas.filter(item => item.status === 1);
  let completedDate = completedTodos.slice(startIndex, endIndex); //完成的截取
  let allStr = '';
  if ($("#active").hasClass("active-filter")) {
    Data = activeDate
  } else if ($("#Completed").hasClass("completed-filter")) {
    Data = completedDate
  } else {
    Data = pageData
  }
  Data.forEach(item => {
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
}

$(function () {
  const toggleFilterClass = (selector, className) => {
    $(selector).addClass(className);
  };
  const load = () => {
    getTodos()
      .then(res => {
        const todoDatas = res["data"] || [];
        renderPage(1, todoDatas);
        let todoitems;
        if ($("#active").hasClass("active-filter")) {
          todoitems = todoDatas.filter(item => item.status === 0);
        } else if ($("#Completed").hasClass("completed-filter")) {
          todoitems = todoDatas.filter(item => item.status === 1);
        } else {
          todoitems = todoDatas
        }
        let tasks = todoitems.length > 1 ? 'tasks' : 'task'
        let remain = `${todoitems.length} ${tasks} remaining`
        $("#remain").html(remain)
        //分页功能
        const nowpage = function (e) {
          $('.page-btn').removeClass('active-page');
          $(`.page-btn[data-page="${e}"]`).addClass('active-page');
        }
        // 计算总页数并创建分页按钮
        const activeTodos = todoDatas.filter(item => item.status === 0);
        const completedTodos = todoDatas.filter(item => item.status === 1);
        let totalPages = 0;
        if ($("#active").hasClass("active-filter")) {
          totalPages = Math.ceil(activeTodos.length / itemsPerPage);
          console.log(totalPages);
        } else if ($("#Completed").hasClass("completed-filter")) {
          totalPages = Math.ceil(completedTodos.length / itemsPerPage);
          console.log(totalPages);
        }
        else {
          totalPages = Math.ceil(todoDatas.length / itemsPerPage);
        }
        // 分页按钮点击事件
        $('#pagination').on('click', '.page-btn', function () {
          currentPage = parseInt($(this).data('page'));
          nowpage(currentPage)
          renderPage(currentPage, todoDatas);
          console.log(currentPage);
        });
        $('.pre').click(function () {
          if (currentPage > 1) {
            currentPage--;
          }
          nowpage(currentPage)
          renderPage(currentPage, todoDatas)
          onload()
        })
        $('.next').on('click', function () {
          if ($("#active").hasClass("active-filter")) {
            totalPages = Math.ceil(activeTodos.length / itemsPerPage);
          } else if ($("#Completed").hasClass("completed-filter")) {
            totalPages = Math.ceil(completedTodos.length / itemsPerPage);
          } else { totalPages = Math.ceil(todoDatas.length / itemsPerPage); }
          if (currentPage < totalPages) {
            currentPage++;
          }
          nowpage(currentPage)
          renderPage(currentPage, todoDatas)
          onload()
        })
        createPaginationButtons(totalPages);
        $(`.page-btn[data-page="1"]`).addClass('active-page');
        // 创建分页按钮
        function createPaginationButtons(totalPages) {
          let paginationHtml = '';
          for (let i = 1; i <= totalPages; i++) {
            paginationHtml += ` <button class="page-btn" data-page="${i}">${i}</button> `;
          }
          $('#pagination').html(paginationHtml);
        }
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
        renderPage(currentPage, todoDatas);
        load()

      })
  })
  $("#Completed").on('click', function () {
    $("#active").removeClass('active-filter')
    toggleFilterClass('#Completed', 'completed-filter');
    getTodos()
      .then(res => {
        const todoDatas = res["data"] || [];
        renderPage(currentPage, todoDatas);
        load()

      })
  })
//   $(document).ready(function() {
//     // 初始化加载动画
//     $('#loading').loading({
//         message: '加载中...', // 自定义加载提示文本
//         dissmissOnComplete: false // 完成后是否自动消失
//     });
 
//     // 触发加载动画
//     $('#loading').loading('start');
 
//     // 模拟加载过程（例如：异步请求数据）
//     setTimeout(function() {
//         // 加载完成，停止加载动画
//         $('#loading').loading('stop');
//     }, 3000); // 假设加载时间为3秒
// });
})