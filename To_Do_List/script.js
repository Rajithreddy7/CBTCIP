const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        // Creating li tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        const emoji = getRandomEmoji(); // Get a random emoji
        const number = todoList.children.length + 1; // Get the number for the item

        p.innerHTML = `${number}. ${emoji} ${inputText}`;
        li.appendChild(p);

        // Creating Edit Btn
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Creating Delete Btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(`${number}. ${emoji} ${inputText}`);
    }
}

// Function to update : (Edit/Delete) todo
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
        updateTodoNumbers(); // Update the numbers after removal
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML.split(" ").slice(2).join(" ");
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
    } else {
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
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo, index) => {
            // Creating li tag
            const li = document.createElement("li");
            const p = document.createElement("p");

            p.innerHTML = todo;
            li.appendChild(p);

            // Creating Edit Btn
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            // Creating Delete Btn
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}

// Function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = `${todo.split(" ")[0]} ${todo.split(" ")[1]} ${inputBox.value}`;
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get a random emoji
const getRandomEmoji = () => {
    const emojis = ['😊', '🚀', '🍕', '🎉', '🌟', '🐱', '💡', '📚'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Function to update todo item numbers
const updateTodoNumbers = () => {
    const todos = todoList.children;
    for (let i = 0; i < todos.length; i++) {
        const p = todos[i].querySelector("p");
        const emoji = p.innerHTML.split(" ")[1];
        const text = p.innerHTML.split(" ").slice(2).join(" ");
        p.innerHTML = `${i + 1}. ${emoji} ${text}`;
    }

    // Update local storage with new numbers
    let todosArray = [];
    for (let i = 0; i < todos.length; i++) {
        todosArray.push(todos[i].querySelector("p").innerHTML);
    }
    localStorage.setItem("todos", JSON.stringify(todosArray));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
