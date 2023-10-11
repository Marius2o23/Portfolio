// Load tasks from local storage when the page loads
window.addEventListener("load", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (const { text, completed } of storedTasks) {
        addTaskToDOM(text, completed);
    }
});

document.getElementById("task").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = document.getElementById("task").value;
    if (taskText) {
        addTaskToDOM(taskText, false);
        saveTasksToLocalStorage();
        document.getElementById("task").value = "";
    }
}

function addTaskToDOM(taskText, completed) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" ${completed ? "checked" : ""} onchange="markCompleted(this)">
        <span ${completed ? 'style="text-decoration: line-through;"' : ''}>${taskText}</span>
        <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);
}

function removeTask(element) {
    const taskList = document.getElementById("taskList");
    taskList.removeChild(element.parentElement);
    saveTasksToLocalStorage();
}

function markCompleted(checkbox) {
    const taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
    } else {
        taskText.style.textDecoration = "none";
    }
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const taskElements = document.querySelectorAll("#taskList li");
    const tasks = Array.from(taskElements).map(li => ({
        text: li.querySelector("span").textContent,
        completed: li.querySelector("input[type=checkbox]").checked
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
