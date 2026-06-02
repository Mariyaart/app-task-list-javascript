const taskInput = document.getElementById("task-input");
const taskAddBtn = document.getElementById("task-add-btn");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(text = null, completed = false) {
    const value = text || taskInput.value.trim();
    if (value === "") return;

    const task = document.createElement("div");
    task.className = "task";

    task.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""}>
        <span class="task-text" contenteditable="true">${value}</span>
        <button class="delete">✖</button>
    `;

    task.querySelector(".delete").onclick = () => {
        task.remove();
        saveTasks();
    };

    task.querySelector("input").onchange = saveTasks;
    task.querySelector(".task-text").oninput = saveTasks;

    taskList.appendChild(task);

    taskInput.value = "";
    saveTasks();
}

taskAddBtn.onclick = () => addTask();

taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

function saveTasks() {
    const tasks = [];

    document.querySelectorAll(".task").forEach(t => {
        tasks.push({
            text: t.querySelector(".task-text").innerText,
            completed: t.querySelector("input").checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    data.forEach(t => addTask(t.text, t.completed));
}