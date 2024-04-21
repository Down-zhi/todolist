// //数组存储待办事项
let input = document.getElementById('todo-input');
let form = document.getElementById('input-form');
let ul = document.getElementById('todo-list');
let submit = document.getElementById('todo-button')
const todoAPI = new TodoAPI('http://127.0.0.1:4000/todo');


//读取操作 每此刷新都遍历一遍保存的li标签
const todos = JSON.parse(localStorage.getItem('todos'))
if (todos) {
    todos.forEach(todo => {
        addTodo(todo)
        console.log(todo);
    })
}


submit.addEventListener('click', (e) => {
    e.preventDefault();  //事件阻止
    addTodo()
    document.getElementById('todo-input').value = ''
    update()
})


function addTodo(todo) {
    let inputText = input.value
    if (todo) {
        inputText = todo.text
    }
    if (inputText) {
        const li = document.createElement('li');
        if (todo && todo.completed) {
            li.classList.add('completed')     //完成给它加一个样式
        }
        
        li.innerText = inputText
        li.classList.add('todo-li')
        ul.appendChild(li)            //把li添加到ul中
        update()
        const div=document.createElement('div')
        div.classList.add('div')
        ul.appendChild(div)
      
        //给li加一个按钮 
        const but = document.createElement('button');
        but.classList.add('delete')
        div.appendChild(but)
        but.innerHTML='Delete'
        //给li加一个编辑的按钮
        const edit = document.createElement('button');
        edit.classList.add('edit')
        div.appendChild(edit)
        edit.innerHTML='Edit'
        
        li.addEventListener('click', () => {
            li.classList.toggle('completed')//toggle 类名存在时删除它 不存在时添加它
            div.classList.toggle('done')
            update()
        })
        but.addEventListener('click', () => {
            li.remove()
            update()
        })

        //点击编辑删除文本节点  把编辑好的文本内容传到文本节点中 在添加到li标签里
        let editForm = document.getElementById('editForm');
        let newTextInput = document.getElementById('newTextInput');
        edit.addEventListener('click', (e) => {
            e.preventDefault()
      
            editForm.style.display = 'block';
            newTextInput.value=inputText
          
            editForm.addEventListener('submit', function(event) {
                event.preventDefault(); // 阻止表单默认提交行为
              
                // 获取用户输入的新文本
                var newText = newTextInput.value;
                // 更改原始文本内容
               li.innerHTML = newText;
                // 隐藏编辑表单
                editForm.style.display = 'none';
                update()
              });
           update()
        })
    }

}

//用本地存储下来  在添加和删除li标签时都要执行一次
function update() {
    let lis = document.querySelectorAll('li');
    const todos = []
    lis.forEach(li => {
        todos.push({
            text: li.innerText,
            completed: li.classList.contains('completed') //li包含()返回ture
        })
    })
    localStorage.setItem('todos', JSON.stringify(todos))   //第一个参数是名字  第二个是数组要转换成字符串
};

const Active = document.getElementById('active');
const completed = document.getElementById('Completed');
//在进行的
Active.addEventListener('click', Activetodo)

function Activetodo() {
    let lis = document.querySelectorAll('li');
    let  divs=document.querySelectorAll('.div')
   divs.forEach(divs=>{
    if(divs.classList.contains('done')){
        divs.style.display='none'
    }else{
        divs.style.display='block'
    }
   })
    lis.forEach(lis => {
        if (lis.classList.contains('completed')) {
            lis.style.display = 'none';
        } else {
            lis.style.display = 'block';

        }
    })
}

//完成的
completed.addEventListener('click', completedtodo)
function completedtodo() {
    let lis = document.querySelectorAll('li');
    let  divs=document.querySelectorAll('.div')
    divs.forEach(divs=>{
     if(divs.classList.contains('done')){
        divs.style.display='block'
     }else{
         divs.style.display='none'
         
     }
    })

    lis.forEach(lis => {
        if (lis.classList.contains('completed')) {

            lis.style.display = 'block';
        } else {
            lis.style.display = 'none';
           
        }
    })
}
//全部的 刷新页面就行
const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    location.reload()
})


// function posttodo(todo){
//     const data=`title:${todo}`
//     fetch('http://127.0.0.1:4000/todo',{method:'POST', headers: {
//             'Content-Type': 'application/json'},body:JSON.stringify(data) })
//            .then(res=>{
//             return res.json();
//            })
//            .then(res=>{
//             console.log(res.data);
//            })
// }

class TodoAPI {

    async addTodoItem(todoText) {

           await fetch('http://127.0.0.1:4000/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ text: todoText })
            })
          .then(res=>{
                    return res.json();
                   })
                   .then(res=>{
                    console.log(res.data);
                   })
        }
    

    async deleteTodoItem(todo){
      await fetch(`http://127.0.0.1:4000/todo/${id}`,{method:'DELETE'})

.then(res=>
res.json())
.then(res=>console.log('delete------->',res.message))
    }

    async updateTodoItem(todoId, newText) {
         await fetch(`http://127.0.0.1:4000/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: newText })
            }).then(res=>
                res.json())
                .then(res=>console.log('delete------->',res.message))
      
    }

    async getTodoItems() {
        fetch('http://127.0.0.1:4000/todo', { mode: "cors" })
           .then((res) => res.json()).
           then(res => { console.log(res.data); return res })
           .then((res) => console.log('------>', res, JSON.stringify(res, null, 2)))
    }

}



