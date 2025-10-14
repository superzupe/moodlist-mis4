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

const showTasksList = () => {   //ini adalah fungsi utama untuk penampilan datanya
  tasksListContent.innerHTML = "";

  if (tasksItem == 0) {
    emptyMyTaskTab.style.display = "flex";
  } else {
    emptyMyTaskTab.style.display = "none";
  }

  for (const [idx, item] of tasksItem.entries()) {
    
    const doneStyle = item.done ? "line-through" : "none";
    const checkIconClass = item.done ? "check-icon_active" : "check-icon";

    let priorityClass = "";
    if (item.priority === "high") priorityClass = "high";
    else if (item.priority === "medium") priorityClass = "med";
    else priorityClass = "low";

    tasksListContent.innerHTML += `
    <div class="task-card">
    <div class="task-card-item">
        <p class="text-base" id="taskText-${idx}" style="text-decoration: ${doneStyle}">${item.task}</p>
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

  tasksItem = [...tasksItem, {
    task: taskValue,
    createdOn: dateFormated,
    deadline: deadlineValueDateFormated,
    priority: priorityValue,
    done: false,
  },]; 
  showTasksList();

};

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
  closeTaskForm();

  task.value = "";
  deadline.value = "";
  priority.value = "";
  console.log(tasksItem);
};

const deleteAll = () => {
  tasksItem.length = 0;
  showTasksList();
  console.log("btn hapus aktif");
};

const deleteCard = (idx) => {
  tasksItem.splice(idx, 1);
  showTasksList();
};


//tombol ceklis
const checkTask = (idx) => {
   tasksItem[idx].done = !tasksItem[idx].done;
  
  const taskText = document.getElementById(`taskText-${idx}`);
  const checkIcon = document.getElementById(`checkIcon-${idx}`);

if (tasksItem[idx].done) {
  // kalau udah dicheck, tampilkan tab DONE
  showDoneTask();
} else {
  // kalau di-uncheck, balik ke tab My Task
  showMyTask();
}

  //toggle decoration
  if (tasksItem[idx].done) {
   taskText.style.textDecoration = "line-through";
   checkIcon.classList.remove("check-icon");
   checkIcon.classList.add("check-icon_active");
  } else {
     taskText.style.textDecoration = "none";
     checkIcon.classList.remove("check-icon_active");
     checkIcon.classList.add("check-icon");
  }

  console.log(tasksItem[idx])
};

//tab control
myTaskTab.style.display = "flex";
doneTaskTab.style.display = "none";
overdueTaskTab.style.display = "none";

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
