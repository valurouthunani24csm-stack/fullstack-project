const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const statusText = document.getElementById("status");

let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

async function checkServer() {
    try {
        const response = await fetch("/api/status");
        const data = await response.json();
        statusText.textContent = data.message;
    } catch (error) {
        statusText.textContent = "Could not connect to server.";
    }
}

function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function displayTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const item = document.createElement("li");
        const taskText = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        taskText.textContent = task.text;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        completeButton.textContent =
            task.completed ? "Undo" : "Complete";

        completeButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        item.append(taskText, completeButton, deleteButton);
        list.appendChild(item);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = input.value.trim();

    if (!task) return;

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();
    displayTasks();

    input.value = "";
    input.focus();
});

displayTasks();
checkServer();