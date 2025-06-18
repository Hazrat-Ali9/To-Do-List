// saving on local storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// App js
// function to get tasks from local storage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// function to render tasks
function renderTasks(tasks) {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        // create a new list item
        const li = document.createElement("li");
        li.innerHTML = `<h4>${task.name}</h4> ${task.task}`;
        
        // create a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            // remove the list item from the DOM
            li.remove();
            // removing the task from local storage
            const tasks = getTasksFromLocalStorage();
            tasks.splice(index, 1);
            saveTasksToLocalStorage(tasks);
            renderTasks(tasks);
        });
        
        // Append the delete button to the list item
        li.appendChild(deleteBtn);

        // for random color on li
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF5733', '#33FFF5', '#FF3380', '#FF8C33', '#33FF8C', '#8C33FF'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        li.style.backgroundColor = randomColor;
        
        // Append the list item to the task list
        todoList.appendChild(li);
    });
}

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const tasks = getTasksFromLocalStorage();
    renderTasks(tasks);
});

// Add task form submission event
document.getElementById("todo-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Get the input values
    const input = document.getElementById("todo-input");
    const newTask = input.value.trim();
    const todoName = document.getElementById("todo-name");
    const newTaskName = todoName.value.trim();
    
    if (newTask && newTaskName) {
        // Create a task object
        const task = { name: newTaskName, task: newTask };
        
        // Save the new task to local storage
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        saveTasksToLocalStorage(tasks);
        
        // Render tasks to include the new task
        renderTasks(tasks);
        
        // Clear the input fields
        input.value = "";
        todoName.value = "";
    }
});
