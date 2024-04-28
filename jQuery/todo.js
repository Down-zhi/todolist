//获取数据
const getTodos = () => {
  return $.ajax({
    url: "http://127.0.1:4000/todo",
    method: "GET",
    dataType: "json" 
  });
};
// const getTodos = () => {
//   return fetch("http://127.0.1:4000/todo", { method: "GET" }).then((res) =>
//     res.json()
//   );
// };
 //增加
//  const createTodo = (data) => {
//   return fetch("http://127.0.1:4000/todo", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).then((res) =>
//     res.json()
//   );
// }
  const createTodo = (data) => {
    return $.ajax({
      url: "http://127.0.0.1:4000/todo",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: "json"
    });
  };
//删除
  const deleteTodo = (id) => {
    return $.ajax({
      url: `http://127.0.0.1:4000/todo/${id}`,
      type: "DELETE",
      dataType: "json"
    });
  };
  //更新
  const updateTodo = (id, data) => {
    return $.ajax({
      url: `http://127.0.0.1:4000/todo/${id}`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: "json"
    });
  };
$(function(){
  //测试用例
    let todolist=[
        { title:'ikun',status:1},
        { title:'ikun1',status:1},
        { title:'ikun2',status:0},
        { title:'ikun3',status:0}
      ]
     //加载数据
     load()
     function load(){
     let allStr='';
     let completedStr='';
     let activeStr='';
     getTodos()
     .then(function(res){
        const todoDatas = res["data"] || [];
       todoDatas.forEach(function(item){
        let checked = item.status===1?'checked =ture':''
        allStr+=` <li class='todo-li' data-id=${item.id} status=${item.status}>
        <input class='div1' type="checkbox" ${checked}>
        <span>${item.title}</span>
        <div>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      </li>`
      $('#todo-list').html(allStr);
    })
     })
    } 
   
      //添加数据
     $('#todo-button').click(function(){
      const title=$('#todo-input').val().trim();
      console.log(title);
      if(title){
        createTodo({title :title}).then(function(){
          // POST请求成功后的处理，例如清空输入框、刷新列表等
          $('#todo-input').val('')         // 清空输入框
          load();                          // 刷新待办事项列表
      })
      .catch(function(error){
          console.error("添加待办事项失败:", error);
      });
      }
     })
     load()
      
     //事件代理删除数据
     $("#todo-list").on('click','button.delete',function(){    //click ()属于静态加载，当页面加载完，就不在为新增加的元素添加点击事件。 on ()属于动态加载，当页面加载完，可以为新增加的元素添加事件。
        var i = $(this).parent().parent().index();  //parent取得父元素
        if(todolist.length > 1 && i !== undefined) {
            todolist.splice(i, 1);
        } else if(todolist.length === 0) {
            // 如果只剩一个元素，直接清空数组
            $(this).parent().parent().remove()
        }
         load();
        
     })                                            

})


