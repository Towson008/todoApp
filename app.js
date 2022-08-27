// Selector
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Events Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener("click", addItem);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo); 

// Functions
function addItem(e){
    //prevent form from submitting/ a page reload
    e.preventDefault();
    //create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo")
    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add("todo-item"); 
    todoDiv.appendChild(newTodo)
    //add todo to localstorage
    saveLocalTodos(todoInput.value)
    // Create Checked button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class=" fas fa-check">';
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);
    // Create trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class=" fas fa-trash">';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // Append this TodoDiv to todolist
    todoList.appendChild(todoDiv);
    //clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //delete Todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation to delete 
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    // check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}


function saveLocalTodos(todo){
    //check if todo exist
    let todos;
    if (localStorage.getItem('todos')=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos')=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item"); 
    todoDiv.appendChild(newTodo)
    // Create Checked button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class=" fas fa-check">';
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);
    // Create trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class=" fas fa-trash">';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // Append this TodoDiv to todolist
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos')=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
}