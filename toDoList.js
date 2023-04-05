// Variables
let input = document.getElementById("input");
let submit = document.getElementById("submit");

let tasksContainer = document.getElementById("tasksContainer");

// Create empty Array
let tasksArray = [];

// get Tasks Array from Local Storage if exist

if (window.localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(window.localStorage.getItem("tasks"));
  // console.log(`${tasksArray}`);

  // update page tasks
  AddTasksArray(tasksArray);
}

// when Add task btn is clicked
submit.addEventListener("click", () => {
  if (input.value != "") {
    // create task from the input
    CreateNewTask(input.value);

    // empty the input
    input.value = "";
  }
});

function CreateNewTask(inputTaskValue) {
  // create the task
  const task = {
    id: Date.now(),
    title: inputTaskValue,
    done: false,
  };
  // Add task to tasks Array
  tasksArray.push(task);

  // Add tasks Array to tasks Container
  AddTasksArray(tasksArray);

  //   console.log(tasksArray);
}

function AddTasksArray(array) {
  // empty tasks container
  tasksContainer.innerHTML = "";
  array.forEach((task) => {
    // create div
    let div = document.createElement("div");
    div.className = "task";
    if (task.done) {
      div.className = "task done";
    }
    // create text node for task
    div.appendChild(document.createTextNode(task.title));

    // set task id
    div.setAttribute("data-id", task.id);
    // create delete btn
    let del = document.createElement("span");
    del.innerHTML = "delete";
    del.className = "del";

    //Add del btn to the task
    div.appendChild(del);

    // Add div to tasksContanier
    tasksContainer.appendChild(div);
  });
  // Add Tasks array to local storage

  window.localStorage.setItem("tasks", JSON.stringify(array));
}

// if delete btn is clicked
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // get task data-id
    console.log(e.target.parentElement.getAttribute("data-id"));

    // delete the task from tasks Array
    //using filter to create a new tasks Array contain only all but the one with the id
    tasksArray = tasksArray.filter(
      (task) => task.id != e.target.parentElement.getAttribute("data-id")
    );
    // console.log(tasksArray);

    // update the Tasks Container and Local storage
    AddTasksArray(tasksArray);
  }
  // if task is toggle
  else if (e.target.classList.contains("task")) {
    let taskID = e.target.getAttribute("data-id");

    TaskToggle(taskID);
    AddTasksArray(tasksArray);
  }
});

function TaskToggle(taskID) {
  tasksArray.forEach((task) => {
    if (task.id == taskID) {
      console.log(task.done);
      if (task.done == false) {
        task.done = true;
      } else if (task.done == true) {
        task.done = false;
      }
    }
  });
}
