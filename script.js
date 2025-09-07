// let inputTodo = document.getElementById("todo");
// let addBtn = document.getElementById("addtask");
// let taskList = document.getElementById("task-list");
// let msg = document.getElementById("empty-msg");

// let arr = [];

// addBtn.addEventListener("click", function(event) {
//      event.preventDefault();
//     if (inputTodo.value === "") {
//         alert("Please enter a task");
//     }else {
//         arr.push(inputTodo.value);
//         inputTodo.value = "";
    
//         // create a new list item
//         let li = document.createElement("li");
//         // checkbox
//         let checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.id = "task1";
//         // lable
//         let label = document.createElement("label");
//         label.htmlFor = "task1";
//         label.innerText = arr[arr.length - 1];
//         // update button
//         let updateBtn = document.createElement("button");
//         updateBtn.className = "update";
//         updateBtn.innerText = "Update";
//         // delete button
//         let deleteBtn = document.createElement("button");
//         deleteBtn.className = "delete";
//         deleteBtn.innerText = "Delete";
//         // append all elements to li
//         li.appendChild(checkbox);
//         li.appendChild(label);
//         li.appendChild(updateBtn);
//         li.appendChild(deleteBtn);
//         // append li to task list
//         taskList.appendChild(li);
//         // delete functionality
//         deleteBtn.addEventListener("click", function() {
//         taskList.removeChild(li);
//         if (taskList.children.length > 0) {
//             msg.style.display = "none";
//         }else{
//             msg.style.display = "block";
//         }   
//     });
//         // update functionality
//         updateBtn.addEventListener("click", function() {
//         let newTask = prompt("Enter the updated task:", label.innerText);
//         if (newTask !== null && newTask.trim() !== "") {
//             label.innerText = newTask;
//         }else{
//             alert("Task cannot be empty.");
//         }
//     });

//     }
//     if (taskList.children.length > 0) {
//         msg.style.display = "none";
//     }else{
//         msg.style.display = "block";
//     }    

// });






// Firebase config (your real project config)
const firebaseConfig = {
  apiKey: "AIzaSyB9M0v2utkh6_hcsZdmxvC8lZl7gfKAW3E",
  authDomain: "my-todo-eddd0.firebaseapp.com",
  databaseURL: "https://my-todo-eddd0-default-rtdb.firebaseio.com/",
  projectId: "my-todo-eddd0",
  storageBucket: "my-todo-eddd0.appspot.com",
  messagingSenderId: "25245050210",
  appId: "1:25245050210:web:1a4c6a5113f2c75d7e783b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

// DOM elements
const todoInput = document.getElementById("todo");
const addTaskBtn = document.getElementById("addtask");
const taskList = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");
const signInBtn = document.getElementById("google-signin");
const signOutBtn = document.getElementById("google-signout");
const userInfo = document.getElementById("user-info");

let currentUser = null;

// Sign in with Google
signInBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(err => console.error(err));
});

// Sign out
signOutBtn.addEventListener("click", () => {
  auth.signOut().catch(err => console.error(err));
});

// Track auth state
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    userInfo.textContent = `Hello, ${user.displayName}`;
    signInBtn.style.display = "none";
    signOutBtn.style.display = "block";
    todoInput.disabled = false;
    addTaskBtn.disabled = false;
    loadTasks();
  } else {
    currentUser = null;
    userInfo.textContent = "";
    signInBtn.style.display = "block";
    signOutBtn.style.display = "none";
    todoInput.disabled = true;
    addTaskBtn.disabled = true;
    taskList.innerHTML = "";
    emptyMsg.style.display = "block";
  }
});

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = todoInput.value.trim();
  if (!taskText || !currentUser) return;

  const taskRef = db.ref("tasks/" + currentUser.uid).push();
  taskRef.set({ text: taskText, timestamp: Date.now() });

  todoInput.value = "";
});

// Load Tasks
function loadTasks() {
  if (!currentUser) return;
  const taskRef = db.ref("tasks/" + currentUser.uid);

  taskRef.on("value", snapshot => {
    taskList.innerHTML = "";
    if (snapshot.exists()) {
      emptyMsg.style.display = "none";
      snapshot.forEach(child => {
        const task = child.val();
        const li = document.createElement("li");
        li.textContent = task.text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
          db.ref("tasks/" + currentUser.uid + "/" + child.key).remove();
        });

        li.appendChild(delBtn);
        taskList.appendChild(li);
      });
    } else {
      emptyMsg.style.display = "block";
    }
  });
}
