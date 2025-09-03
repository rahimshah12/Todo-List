let inputTodo = document.getElementById("todo");
let addBtn = document.getElementById("addtask");
let taskList = document.getElementById("task-list");
let msg = document.getElementById("empty-msg");

let arr = [];

addBtn.addEventListener("click", function(event) {
     event.preventDefault();
    if (inputTodo.value === "") {
        alert("Please enter a task");
    }else {
        arr.push(inputTodo.value);
        inputTodo.value = "";
    
        // create a new list item
        let li = document.createElement("li");
        // checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "task1";
        // lable
        let label = document.createElement("label");
        label.htmlFor = "task1";
        label.innerText = arr[arr.length - 1];
        // update button
        let updateBtn = document.createElement("button");
        updateBtn.className = "update";
        updateBtn.innerText = "Update";
        // delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.innerText = "Delete";
        // append all elements to li
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(updateBtn);
        li.appendChild(deleteBtn);
        // append li to task list
        taskList.appendChild(li);
        // delete functionality
    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(li);
        if (taskList.children.length > 0) {
            msg.style.display = "none";
        }else{
            msg.style.display = "block";
        }   
    });
    // update functionality
    updateBtn.addEventListener("click", function() {
        let newTask = prompt("Enter the updated task:", label.innerText);
        if (newTask !== null && newTask.trim() !== "") {
            label.innerText = newTask;
        }else{
            alert("Task cannot be empty.");
        }
    });

    }
    if (taskList.children.length > 0) {
        msg.style.display = "none";
    }else{
        msg.style.display = "block";
    }
    



});