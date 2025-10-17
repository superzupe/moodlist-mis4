const btnAddTask = document.getElementById("btnAddTask");
const addTaskForm = document.getElementById("addTaskForm");

const showAddTaskForm = () => {
  btnAddTask.style.display = "none";
  addTaskForm.style.display = "flex";
};

const closeTaskForm = () => {
  btnAddTask.style.display = "flex";
  addTaskForm.style.display = "none";
  task.value = "";
  deadline.value = "";
  priority.value = "";
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

let currentTab = "my";

const checkOverdue = () => {
  const today = new Date();

  //cek overdue
  tasksItem.forEach((item) => {
    if (item.deadline) {
      const deadlineDate = new Date(item.deadline);
      item.isOverdue = !item.done && deadlineDate < today;
    } else {
      item.isOverdue = false;
    }
  });
};

const showTasksList = () => {
  //ini adalah fungsi utama untuk penampilan datanya
  checkOverdue();
  tasksListContent.innerHTML = "";

  //tampilkan pesan default saat empty
  let tasksToShow = [];
  if (currentTab === "my") {
    tasksToShow = tasksItem
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => !item.done && !item.isOverdue);
    emptyMyTaskTab.style.display = tasksToShow.length === 0 ? "flex" : "none";
  } else if (currentTab === "done") {
    tasksToShow = tasksItem
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => item.done);
    emptyDoneTaskTab.style.display = tasksToShow.length === 0 ? "flex" : "none";
  } else if (currentTab === "overdue") {
    tasksToShow = tasksItem
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => !item.done && item.isOverdue);
    emptyOverdueTaskTab.style.display =
      tasksToShow.length === 0 ? "flex" : "none";
  }

  //loop task
  for (const item of tasksToShow) {
    const idx = item.originalIndex;
    const doneStyle = item.done ? "line-through" : "none";
    const checkIconClass = item.done ? "check-icon_active" : "check-icon";

    let priorityClass = "";
    if (item.priority === "high") priorityClass = "high";
    else if (item.priority === "medium") priorityClass = "med";
    else priorityClass = "low";

      tasksListContent.innerHTML += `
    <div class="task-card">
    <div class="task-card-item">
        <p class="text-base" id="taskText-${idx}" style="text-decoration: ${doneStyle}">${
        item.task
      }</p>
        <p class="text-medium">Created on ${item.createdOn}</p>
            ${
              item.deadline
                ? `<p class="text-medium">Due on ${item.deadline}</p>`
                : ""
            }
        <p class="text-medium level-priority ${priorityClass}">${
        item.priority
      }</p>
    </div>
    <div class="task-card-action">
        <button class="btn-check" onclick="checkTask(${idx})"><i class="fa-solid fa-check ${checkIconClass}" id="checkIcon-${idx}"></i></button>
        <button class="btn-delete-card" onclick="deleteCard(${idx})"><i class="fa-solid fa-trash"></i></button>
    </div>
</div>
    `;
    
  }

  btnDeleteAll.disabled = tasksItem.length === 0;
  btnDeleteAll.classList.toggle("btn-delete-all_active", tasksItem.length > 0);
};

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
  if (deadlineValue) {
    const deadlineValueDate = new Date(deadlineValue);
    deadlineValueDateFormated = deadlineValueDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  tasksItem = [
    ...tasksItem,
    {
      task: taskValue,
      createdOn: dateFormated,
      deadline: deadlineValueDateFormated,
      priority: priorityValue,
      done: false,
      isOverdue: false,
    },
  ];
  checkOverdue();
  showTasksList();
  closeTaskForm();
};

//tombol save
const addTask = () => {
  if (!task.value) {
    alert("Give your task a name!");
    task.focus();
    return;
  }
  if (!priority.value) {
    alert("Pick a priority, please!");
    priority.focus();
    return;
  }
  createTask();
};

//tombol del all
const deleteAll = () => {
  tasksItem.length = 0;
  showTasksList();
};

//tombol delete per card
const deleteCard = (idx) => {
  tasksItem.splice(idx, 1);
  showTasksList();
};

//tombol ceklis
const checkTask = (idx) => {
  tasksItem[idx].done = !tasksItem[idx].done;
  checkOverdue();
  showTasksList();
};

//tab control
myTaskTab.style.display = "flex";
doneTaskTab.style.display = "none";
overdueTaskTab.style.display = "none";

const showMyTask = () => {
  currentTab = "my";
  showTasksList();
  myTaskTab.style.display = "flex";
  doneTaskTab.style.display = "none";
  overdueTaskTab.style.display = "none";
};

const showDoneTask = () => {
  currentTab = "done";
  showTasksList();
  myTaskTab.style.display = "none";
  doneTaskTab.style.display = "flex";
  overdueTaskTab.style.display = "none";
};

const showOverdueTask = () => {
  currentTab = "overdue";
  showTasksList();
  myTaskTab.style.display = "none";
  doneTaskTab.style.display = "none";
  overdueTaskTab.style.display = "flex";
};

// INIT
showTasksList();
