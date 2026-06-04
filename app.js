const API_URL =
"https://script.google.com/macros/s/AKfycbw4WNWBMzCa61cBp0cHgfoiT7beFl8NEr3XUB1DhFKQ0arsSFy2q4PNT21BhAZrHoQXoA/exec";

const PIN = "2026";

/* =========================
LOGIN
========================= */

function login() {

const pin =
document.getElementById("pin").value;

if(pin !== PIN) {

alert("Incorrect PIN");

return;

}

document.getElementById(
"login-screen"
).style.display = "none";

document.getElementById(
"app"
).style.display = "block";

initializeDashboard();

}

/* =========================
DASHBOARD
========================= */

async function initializeDashboard() {

await loadHealth();
await loadTasks();
await loadMaidTasks();
await loadGrocery();
await loadCalendar();
await loadMaintenance();

}

/* =========================
HEALTH
========================= */

async function loadHealth() {

const response =
await fetch(
API_URL +
"?action=health"
);

const data =
await response.json();

const el =
document.getElementById(
"health-score"
);

if(el){


el.innerHTML =
  "<div class='health-score'>" +
  data.healthScore +
  "%</div>";
 

}

}

/* =========================
TASKS
========================= */

async function loadTasks() {

const response =
await fetch(
API_URL +
"?action=tasks"
);

const data =
await response.json();

const list =
document.getElementById(
"tasks-list"
);

if(!list) return;

list.innerHTML = "";

data.tasks
.slice(1)
.forEach(task => {

 
  const li =
    document.createElement("li");

  li.innerHTML =

  "<label>" +
  "<input type='checkbox' " +
  "onchange=\"completeTask('" +
  task[0] +
  "')\">" +
  task[1] +
  " (" +
  task[2] +
  ")" +
  "</label>";

  list.appendChild(li);

});
 

}

async function completeTask(taskId){

await fetch(API_URL,{

 
method:"POST",

headers:{
  "Content-Type":
    "application/json"
},

body:JSON.stringify({

  action:
    "completeTask",

  taskId:
    taskId

})
 

});

alert("Task completed");

}

/* =========================
MAID TASKS
========================= */

async function loadMaidTasks() {

const response =
await fetch(
API_URL +
"?action=maid"
);

const data =
await response.json();

const list =
document.getElementById(
"maid-tasks"
);

if(!list) return;

list.innerHTML = "";

data.maidTasks
.slice(1)
.forEach(task => {

 
  const li =
    document.createElement("li");

  li.innerText =
    task[1];

  list.appendChild(li);

});
 

}

/* =========================
GROCERY
========================= */

async function loadGrocery() {

const response =
await fetch(
API_URL +
"?action=grocery"
);

const data =
await response.json();

const list =
document.getElementById(
"grocery-list"
);

if(!list) return;

list.innerHTML = "";

data.grocery
.slice(1)
.forEach(item => {

 
  const li =
    document.createElement("li");

  li.innerHTML =

  item[0] +
  " (" +
  item[2] +
  ") " +

  "<button onclick=\"purchaseItem('" +
  item[0] +
  "')\">✓</button>";

  list.appendChild(li);

});
 

}

async function addGrocery(){

const item =
document.getElementById(
"grocery-item"
).value;

if(!item) return;

await fetch(API_URL,{

 
method:"POST",

headers:{
  "Content-Type":
  "application/json"
},

body:JSON.stringify({

  action:"addGrocery",

  item:item,

  qty:1,

  category:"General",

  priority:"Medium"

})
 

});

loadGrocery();

}

async function purchaseItem(item){

await fetch(API_URL,{

 
method:"POST",

headers:{
  "Content-Type":
  "application/json"
},

body:JSON.stringify({

  action:
    "purchaseGrocery",

  item:
    item

})
 

});

loadGrocery();

}

/* =========================
CALENDAR
========================= */

async function loadCalendar() {

const response =
await fetch(
API_URL +
"?action=calendar"
);

const data =
await response.json();

const list =
document.getElementById(
"calendar-list"
);

if(!list) return;

list.innerHTML = "";

data.events
.slice(1)
.forEach(event => {

 
  const li =
    document.createElement("li");

  li.innerText =
    event[0] +
    " - " +
    event[1];

  list.appendChild(li);

});
 

}

async function addEvent(){

const date =
document.getElementById(
"event-date"
).value;

const event =
document.getElementById(
"event-name"
).value;

await fetch(API_URL,{

 
method:"POST",

headers:{
  "Content-Type":
  "application/json"
},

body:JSON.stringify({

  action:
    "addCalendarEvent",

  date:
    date,

  event:
    event,

  type:
    "Family"

})
 

});

loadCalendar();

}

/* =========================
MAINTENANCE
========================= */

async function loadMaintenance() {

const response =
await fetch(
API_URL +
"?action=maintenance"
);

const data =
await response.json();

const list =
document.getElementById(
"maintenance-list"
);

if(!list) return;

list.innerHTML = "";

data.maintenance
.slice(1)
.forEach(item => {

 
  const li =
    document.createElement("li");

  li.innerText =
    item[0];

  list.appendChild(li);

});
 

}

/* =========================
BRAIN DUMP
========================= */

async function captureBrainDump() {

const note =
document.getElementById(
"brain-input"
).value;

if(!note) return;

await fetch(API_URL,{

 
method:"POST",

headers:{
  "Content-Type":
  "application/json"
},

body:JSON.stringify({

  action:
    "addBrainDump",

  note:
    note,

  category:
    "Inbox"

})
 

});

alert("Saved");

document.getElementById(
"brain-input"
).value = "";

}
