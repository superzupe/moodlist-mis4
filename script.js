const btnAddTask = document.getElementById("btnAddTask");
const addTaskForm = document.getElementById("addTaskForm");

const showAddTaskForm = () => {
  btnAddTask.style.display = "none";
  addTaskForm.style.display = "flex";
};

const closeTaskForm = () => {
  btnAddTask.style.display = "flex";
  addTaskForm.style.display = "none";
};

let tasksItem = [];

const btnDeleteAll = document.getElementById("btnDeleteAll");

const myTaskTab = document.getElementById("myTaskTab");
const doneTaskTab = document.getElementById("doneTaskTab");
const overdueTaskTab = document.getElementById("overdueTaskTab");

const emptyMyTaskTab = document.getElementById("emptyMyTaskTab");
const emptyDoneTaskTab = document.getElementById("emptyDoneTaskTab");
const emptyOverdueTaskTab = document.getElementById("emptyOverdueTaskTab");

const tasksListContent = document.getElementById("tasksListContent");

const task = document.getElementById("task");
const deadline = document.getElementById("deadline");
const priority = document.getElementById("priority");

const createTask = () => {
  let taskValue = task.value; //ambil value dalam fungsi
  let deadlineValue = deadline.value;
  let priorityValue = priority.value;

  const date = new Date();
  const dateFormated = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  let deadlineValueDateFormated = "";
  const deadlineValueDate = new Date(deadlineValue);
  deadlineValueDateFormated = deadlineValueDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  let tasksItemAdded = [
    ...tasksItem,
    {
      task: taskValue,
      createdOn: dateFormated,
      deadline: deadlineValueDateFormated,
      priority: priorityValue,
    },
  ];

  tasksListContent.innerHTML = "";

  for (const [idx, item] of Object.entries(tasksItemAdded)) {
    tasksListContent.innerHTML += `
    <div class="task-card">
    <div class="task-card-item">
        <p class="text-base">${item.task}</p>
        <p class="text-medium">Created on ${item.createdOn}</p>
            <p class="text-medium" id="showDeadline">Due on ${item.deadline}</p>
        <p id="labelPriority" class="text-medium level-priority">${item.priority}</p>
    </div>
    <div class="task-card-action">
        <button class="btn-check"><i class="fa-solid fa-check"></i></button>
        <button class="btn-delete-card"><i class="fa-solid fa-trash"></i></button>
    </div>
</div>
    `;

    const showDeadline = document.getElementById("showDeadline");
    if (deadlineValueDateFormated === 0) {
      showDeadline.style.display = "none";
    }
  }
};

myTaskTab.style.display = "flex";
doneTaskTab.style.display = "none";
overdueTaskTab.style.display = "none";

// if (tasksItem.length === 0) {
//   emptyMyTaskTab.style.display = "flex";
// } else {
//     emptyDoneTaskTab.style.display = "none";
// }

const showMyTask = () => {
  myTaskTab.style.display = "flex";
  doneTaskTab.style.display = "none";
  overdueTaskTab.style.display = "none";
};

const showDoneTask = () => {
  myTaskTab.style.display = "none";
  doneTaskTab.style.display = "flex";
  overdueTaskTab.style.display = "none";
};

const showOverdueTask = () => {
  myTaskTab.style.display = "none";
  doneTaskTab.style.display = "none";
  overdueTaskTab.style.display = "flex";
};

const addTask = () => {
  createTask();

  if (!task.value && !priority.value) {
    if (!task.value) {
      alert("Give your task a name!");
    }
    if (!priority.value) {
      alert("Pick a priority, please!");
    }
  } else {
    closeTaskForm();
  }

  btnDeleteAll.classList.add("btn-delete-all_active");

  task.value = "";
  deadline.value = "";
  priority.value = "";

  showTaskList();
};

const deleteAll = () => {
  tasksItem = [];
  btnDeleteAll.classList.remove("btn-delete-all_active");
};
