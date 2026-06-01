const API_URL =
"https://script.google.com/macros/s/AKfycbw4WNWBMzCa61cBp0cHgfoiT7beFl8NEr3XUB1DhFKQ0arsSFy2q4PNT21BhAZrHoQXoA/exec";

function login(){

const pin =
document.getElementById("pin").value;

if(pin === "2026"){

document.getElementById(
  "login-screen"
).style.display = "none";

document.getElementById(
  "app"
).style.display = "block";

loadHealth();
loadMaidTasks();
loadTasks();

}
else{
alert("Incorrect PIN");
}
}

async function loadHealth(){

const response =
await fetch(API_URL + "?action=health");

const data =
await response.json();

document.getElementById(
"health-score"
).innerText =
data.healthScore + "%";
}

async function loadMaidTasks(){

const response =
await fetch(API_URL + "?action=maid");

const data =
await response.json();

const list =
document.getElementById(
"maid-tasks"
);

list.innerHTML = "";

data.maidTasks
.slice(1)
.forEach(task => {

```
  const li =
    document.createElement("li");

  li.innerText = task[1];

  list.appendChild(li);

});

}

async function loadTasks(){

const response =
await fetch(API_URL + "?action=tasks");

const data =
await response.json();

const list =
document.getElementById(
"tasks-list"
);

list.innerHTML = "";

data.tasks
.slice(1)
.forEach(task => {

  const li =
    document.createElement("li");

  li.innerText =
    task[1] + " • " + task[2];

  list.appendChild(li);

});
```

}
