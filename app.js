const API_URL = 'https://script.google.com/macros/s/AKfycbw4WNWBMzCa61cBp0cHgfoiT7beFl8NEr3XUB1DhFKQ0arsSFy2q4PNT21BhAZrHoQXoA/exec';

function login() {
  const pin = document.getElementById('pin').value;
  if (pin === '2026') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    loadHealth();
    loadTasks();
    loadMaidTasks();
  } else {
    alert('Incorrect PIN');
  }
}

async function loadHealth() {
  try {
    const response = await fetch(`${API_URL}?action=health`);
    const data = await response.json();
    document.getElementById('health-score').innerText = (data.healthScore || 92) + '%';
  } catch (error) {
    console.error('Error loading health data:', error);
    document.getElementById('health-score').innerText = 'Error';
  }
}

async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}?action=tasks`);
    const data = await response.json();
    const taskList = document.getElementById('tasks-list');
    taskList.innerHTML = ''; // Clear previous tasks
    // Assuming the first element is a header and we want to display the rest
    (data.tasks || []).slice(1).forEach(task => {
      const listItem = document.createElement('li');
      // Assuming task[1] is the main text and task[2] is a sub-detail
      listItem.innerText = `${task[1]} • ${task[2]}`;
      taskList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading tasks:', error);
    document.getElementById('tasks-list').innerHTML = '<li>Error loading tasks</li>';
  }
}

async function loadMaidTasks() {
  try {
    const response = await fetch(`${API_URL}?action=maid`);
    const data = await response.json();
    const maidTaskList = document.getElementById('maid-tasks');
    maidTaskList.innerHTML = ''; // Clear previous tasks
    // Assuming the first element is a header and we want to display the rest
    (data.maidTasks || []).slice(1).forEach(task => {
      const listItem = document.createElement('li');
      // Assuming task[1] is the maid task description
      listItem.innerText = task[1];
      maidTaskList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading maid tasks:', error);
    document.getElementById('maid-tasks').innerHTML = '<li>Error loading maid tasks</li>';
  }
}

function captureBrainDump() {
  alert('Phase 2');
}
