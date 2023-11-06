function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("No se puede agregar una tarea vacía");
    return;
  }
  // Verificar si la tarea ya existe en la lista
  if (isTaskDuplicate(taskInput.value)) {
    alert("La tarea ya existe en la lista");
    return;
  }

  var li = document.createElement("li");
  var taskText = document.createElement("p");
  var deleteButton = document.createElement("button");
  var markerimg = document.createElement("img");
  taskText.innerHTML = taskInput.value;
  taskText.className = "tasktext";
  markerimg.src = "assets/images/flecha_derecha.png";
  markerimg.alt = "marker";
  markerimg.className = "markerlist";
  deleteButton.className = "delete-button";
  deleteButton.innerHTML =
    "<img src='assets/images/eliminar.png' alt='Delete' />";
  deleteButton.onclick = function () {
    var taskTextValue = this.parentNode.querySelector(".tasktext").innerHTML;
    var parentLi = this.parentNode;
    parentLi.classList.add("delete-animation");
    setTimeout(function () {
      parentLi.remove();
      removeTaskStorage(taskTextValue);
    }, 800);
  };
  li.className = "task";

  li.appendChild(markerimg);
  li.appendChild(taskText);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}
//Guarda las tareas en el local storage
function saveTasks() {
  var tasks = [];
  var taskElements = document.querySelectorAll(".task");
  taskElements.forEach(function (taskElement) {
    tasks.push(taskElement.querySelector(".tasktext").innerHTML);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Carga las tareas guardadas
function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach(function (task) {
      var li = document.createElement("li");
      var taskText = document.createElement("p");
      var deleteButton = document.createElement("button");
      var markerimg = document.createElement("img");
      taskText.innerHTML = task;
      taskText.className = "tasktext";
      markerimg.src = "assets/images/flecha_derecha.png";
      markerimg.alt = "marker";
      markerimg.className = "markerlist";
      deleteButton.className = "delete-button";
      deleteButton.innerHTML =
        "<img src='assets/images/eliminar.png' alt='Delete' />";
      deleteButton.onclick = function () {
        var taskTextValue =
          this.parentNode.querySelector(".tasktext").innerHTML;
        var parentLi = this.parentNode;
        parentLi.classList.add("delete-animation");
        setTimeout(function () {
          parentLi.remove();
          removeTaskStorage(taskTextValue);
        }, 800);
      };
      li.className = "task";

      li.appendChild(markerimg);
      li.appendChild(taskText);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }
}
//Escucha para cargar las tareas guardadas
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});
//Escucha para el boton de agregar tarea
var taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
//Remueve la tarea del local storage
function removeTaskStorage(taskValue) {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  var updatedTasks = tasks.filter(function (task) {
    return task !== taskValue;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
//Compreba si la tarea ya existe en la lista
function isTaskDuplicate(task) {
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    return tasks.some(function (savedTask) {
      return savedTask === task;
    });
  }
  return false;
}
