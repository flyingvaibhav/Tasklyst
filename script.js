const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Utility: apply a temporary class with automatic cleanup
function flashClass(el, cls, ms = 600){
    el.classList.add(cls);
    setTimeout(()=> el.classList.remove(cls), ms);
}

// Enh: create element builder to centralize structure + animation
function createTodoElement(text){
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text; // using textContent (safer)
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn","editBtn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn","deleteBtn");
    li.appendChild(deleteBtn);

    // entry animation already defined by CSS (todoEnter) on first paint
    return li;
}

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        // highlight change
        editTodo.target.previousElementSibling.textContent = inputText;
        const li = editTodo.target.parentElement;
        flashClass(li,'editing',1200);
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {
        const li = createTodoElement(inputText);
        // slight stagger effect if many items are added quickly
        li.style.animationDelay = Math.min(todoList.children.length * 30, 300) + 'ms';
        todoList.appendChild(li);
        inputBox.value = "";
        saveLocalTodos(inputText);
    }
}

// Function to update : (Edit/Delete) todo
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        const li = e.target.parentElement;
        // add exit animation then remove
        li.classList.add('removing');
        const duration = 320; // sync with CSS
        setTimeout(()=>{
            if(li.parentElement){
                todoList.removeChild(li);
                deleteLocalTodos(li);
            }
        }, duration);
        return; // avoid falling through
    }

    if (e.target.innerHTML === "Edit") {
        // remove existing editing class from others
        [...todoList.querySelectorAll('li.editing')].forEach(n=> n.classList.remove('editing'));
        const li = e.target.parentElement;
        li.classList.add('editing');
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

// Function to save local todo
const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todo
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo, idx) => {
            const li = createTodoElement(todo);
            // gentle cascade on load
            li.style.animationDelay = Math.min(idx * 40, 400) + 'ms';
            todoList.appendChild(li);
        });
    }
}

// Function to delete local todo (unchanged logic except using textContent)
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].textContent;
    let todoIndex = todos.indexOf(todoText);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    console.log(todoIndex);
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    if (todoIndex > -1){
        todos[todoIndex] = inputBox.value;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);