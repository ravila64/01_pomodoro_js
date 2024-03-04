// programa principal en javascript
const tasks = [];
let time = 0;
let timer = null;
let timeBreak = null;
let current = null;
let statusApp = "stop";

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

form.addEventListener('submit', e => {
  e.preventDefault(); // no se ejecute todavia, anula funcion nativo ebviar form
  if (itTask.value!=='') {
    createTask(itTask.value);
    itTask.value = '';
    renderTasks(); 
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };
  tasks.unshift(newTask);
}

function renderTasks() {
  const html = tasks.map((task) => {
    return `
          <div class="task">
          <div class="completed">${
            task.completed
              ? "<span class='done'>Done</span>"
              : `<button class="start-button" data-id="${task.id}">Start</button></div>`
          }
              <div class="title">${task.title}</div>
          </div>`;
  });
  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");
  startButtons.forEach((startButton) => {
    startButton.addEventListener("click", () => {
      if (!timer) {
        startButtonHandler(startButton.getAttribute("data-id"));
        startButton.textContent = "In progress...";
      }
    });
  });
}

function startButtonHandler(id) {
  time = 5;   // 24 * 60;  // 25 MIN X 60
  current = id;
  const taskIndex = tasks.findIndex((task) => task.id === id); 
  taskName.textContent = tasks[taskIndex].title;
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
  //  document.querySelector("#time #taskName").textContent = tasks[taskId].title;
}

function timerHandler(id = null) {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timer);
    markComplete(id);
    current=null;  //
    taskName.textContent=''; //
    renderTasks();
    startBreak(); // 
  }
}

function renderTime() { 
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60); // pasa enteros
  const seconds = parseInt(time % 60); // % mudulo div entera
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
  }${seconds}`;
}

function markComplete(id) {
  // buscar tarea actual, completado en true
  const taskId = tasks.findIndex((task) => task.id === id);
  tasks[taskId].completed = true;
} 

function startBreak() {
  time = 4; // 1 * 60;
  document.querySelector("#time #taskName").textContent = "Break";
  timerBreak = setInterval(timerBreakHandler, 1000);
}

function timerBreakHandler() {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    document.querySelector("#time #taskName").textContent = "";
    renderTime();
  }
}
