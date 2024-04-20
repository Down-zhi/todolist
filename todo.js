// //数组存储待办事项
let input = document.getElementById('todo-input');
let form = document.getElementById('input-form');
let ul = document.getElementById('todo-list');
let submit = document.getElementById('todo-button')


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

        //给li加一个按钮 
        const but = document.createElement('button');
        but.classList.add('delete')
        li.appendChild(but)
        //给li加一个编辑的按钮
        const edit = document.createElement('button');
        edit.classList.add('edit')
        li.appendChild(edit)
        li.addEventListener('click', () => {
            li.classList.toggle('completed')//toggle 类名存在时删除它 不存在时添加它
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
            // const userinput=document.createElement('input');
            // userinput.classList.add('newinput')
            // const userText=document.getElementsByClassName('newinput').value;
            // li.appendChild(userinput)
            // userinput.addEventListener('click',(e)=>{
            //     e.preventDefault;
            //     li.innerText = userText;
            // })
            e.preventDefault()
            editForm.style.display = 'block';
            newTextInput.value=inputText
          
            editForm.addEventListener('submit', function(event) {
                event.preventDefault(); // 阻止表单默认提交行为
              
                // 获取用户输入的新文本
                var newText = newTextInput.value;//为什么未定义
                console.log(newTextInput.value);
                // 更改原始文本内容
               li.innerHTML = newText;
           //------------------------------------因为li的内容修改后没有两个编辑按钮了---------------------怎么改进      
            
                //给li加一个按钮 
        const but = document.createElement('button');
        but.classList.add('delete')
        li.appendChild(but)
        //给li加一个编辑的按钮
        const edit = document.createElement('button');
        edit.classList.add('edit')
        li.appendChild(edit)
        li.addEventListener('click', () => {
            li.classList.toggle('completed')//toggle 类名存在时删除它 不存在时添加它
            update()
        })
        but.addEventListener('click', () => {
            li.remove()
            update()
        })
                // 隐藏编辑表单
                editForm.style.display = 'none';
                update()
              });
           update()
        })
        //编辑li中的文本

    //     function edit() {
    //         let todoText = document.querySelector('li')
    //         const newText = prompt('请输入新的任务内容：', todoText.innerText);
    //         if (newText !== null) {
    //             todoText.innerText = newText;
    //             update()
    //         }
    //     }
    //     update()
    }

}
function editdelete(){
   //给li加一个按钮 
   const li = document.createElement('li');
   const but = document.createElement('button');
   but.classList.add('delete')
   li.appendChild(but)
   //给li加一个编辑的按钮
   const edit = document.createElement('button');
   edit.classList.add('edit')
   li.appendChild(edit)
   li.addEventListener('click', () => {
       li.classList.toggle('completed')//toggle 类名存在时删除它 不存在时添加它
       update()
   })
   but.addEventListener('click', () => {
       li.remove()
       update()
   })
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

