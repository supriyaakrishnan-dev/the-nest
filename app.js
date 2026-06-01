const API_URL =
"https://script.google.com/macros/s/AKfycbw4WNWBMzCa61cBp0cHgfoiT7beFl8NEr3XUB1DhFKQ0arsSFy2q4PNT21BhAZrHoQXoA/exec";

const PIN = "2026";

/* ---------------------------
LOGIN
---------------------------- */

function login() {

const enteredPin =
document.getElementById("pin").value;

if (enteredPin === PIN) {


document.getElementById(
  "login-screen"
).style.display = "none";

document.getElementById(
  "app"
).style.display = "block";

initializeDashboard();


} else {


alert("Incorrect PIN");


}

}

/* ---------------------------
DASHBOARD
---------------------------- */

async function initializeDashboard() {

await loadHealth();
await loadTasks();
await loadMaidTasks();
await loadGrocery();
await loadCalendar();
await loadMaintenance();

}

/* ---------------------------
HEALTH
---------------------------- */

async function loadHealth() {

try {


const response =
  await fetch(
    API_URL + "?action=health"
  );

const data =
  await response.json();

document.getElementById(
  "health-score"
).innerHTML =
  "<div class='health-score'>" +
  data.healthScore +
  "%</div>";


} catch (error) {


console.error(error);


}

}

/* ---------------------------
TASKS
---------------------------- */

async function loadTasks() {

try {


const response =
  await fetch(
    API_URL + "?action=tasks"
  );

const data =
  await response.json();

const list =
  document.getElementById(
    "tasks-list"
  );

if (!list) return;

list.innerHTML = "";

data.tasks
  .slice(1)
  .forEach(task => {

    const li =
      document.createElement("li");

    li.innerText =
      task[1] +
      " • " +
      task[2];

    list.appendChild(li);

  });


} catch (error) {


console.error(error);


}

}

/* ---------------------------
MAID TASKS
---------------------------- */

async function loadMaidTasks() {

try {

```
const response =
  await fetch(
    API_URL + "?action=maid"
  );

const data =
  await response.json();

const list =
  document.getElementById(
    "maid-tasks"
  );

if (!list) return;

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
```

} catch (error) {

```
console.error(error);
```

}

}

/* ---------------------------
GROCERY
---------------------------- */

async function loadGrocery() {

const list =
document.getElementById(
"grocery-list"
);

if (!list) return;

try {

```
const response =
  await fetch(
    API_URL + "?action=grocery"
  );

const data =
  await response.json();

list.innerHTML = "";

data.grocery
  .slice(1)
  .forEach(item => {

    const li =
      document.createElement("li");

    li.innerText =
      item[0] +
      " (" +
      item[2] +
      ")";

    list.appendChild(li);

  });
```

} catch (error) {

```
console.error(error);
```

}

}

/* ---------------------------
CALENDAR
---------------------------- */

async function loadCalendar() {

const list =
document.getElementById(
"calendar-list"
);

if (!list) return;

try {

```
const response =
  await fetch(
    API_URL + "?action=calendar"
  );

const data =
  await response.json();

list.innerHTML = "";

data.events
  .slice(1)
  .forEach(event => {

    const li =
      document.createElement("li");

    li.innerText =
      event[1];

    list.appendChild(li);

  });
```

} catch (error) {

```
console.error(error);
```

}

}

/* ---------------------------
MAINTENANCE
---------------------------- */

async function loadMaintenance() {

const list =
document.getElementById(
"maintenance-list"
);

if (!list) return;

try {

```
const response =
  await fetch(
    API_URL + "?action=maintenance"
  );

const data =
  await response.json();

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
```

} catch (error) {

```
console.error(error);
```

}

}

/* ---------------------------
BRAIN DUMP
---------------------------- */

async function captureBrainDump() {

const note =
document.getElementById(
"brain-input"
).value;

if (!note) {

```
alert(
  "Please enter a note"
);

return;
```

}

try {

```
const response =
  await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type":
        "application/json"
    },

    body: JSON.stringify({

      action:
        "addBrainDump",

      note: note,

      category:
        "Inbox"

    })

  });

const data =
  await response.json();

if (data.success) {

  alert(
    "Saved successfully"
  );

  document.getElementById(
    "brain-input"
  ).value = "";

}

} catch (error) {


console.error(error);

alert(
  "Unable to save"
);


}

}
