var taskNameInput = document.getElementById('taskName');
var tasks = JSON.parse(localStorage.getItem('list')) || [];
var editingIndex = -1; // To store the index of the task being edited
addTask();

function getDataTask(){
    if(taskNameInput.value.trim() != ''){
        // Each task will now store both the task name and its completion status
        tasks.push({ name: taskNameInput.value, done: false });
        localStorage.setItem('list', JSON.stringify(tasks));
        addTask();
        clearInput();
    }else{
        window.alert('Please enter a valid task!');
    }
}

function addTask(){
    var taskStructure = '';
    for(var i = 0; i < tasks.length; i++){
        taskStructure += 
        `<div class="task rounded text-white d-flex align-items-center justify-content-between p-3 w-75 my-5 mx-auto">
            <div class="${tasks[i].done ? 'completed' : ''}">${tasks[i].name}</div>
            <div>
                <button class="btn btn-info me-2" onclick="toggleTaskDone(${i})">
                    ${tasks[i].done ? 'Undo' : 'Done'}
                </button>
                <button class="btn btn-success me-2" onclick="editData(${i})">
                    <i class="fa-regular fa-pen-to-square" style="color: #fafcff;"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteTask(${i})">
                    <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                </button>
            </div>
        </div>`;
    }
    document.getElementById('taskContainer').innerHTML = taskStructure;
}

function clearInput(){
    taskNameInput.value = '';
}

function deleteTask(index){
    tasks.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(tasks));
    addTask();
}

function editData(index){
    editingIndex = index; // Store the index of the task being edited
    taskNameInput.value = tasks[index].name;
    document.getElementById('editingBtn').classList.remove('d-none');
    document.getElementById('basic-addon2').classList.add('d-none');
}

function saveEditedTask(){
    if(editingIndex > -1){
        tasks[editingIndex].name = taskNameInput.value;
        localStorage.setItem('list', JSON.stringify(tasks));
        addTask();
        clearInput();
        document.getElementById('editingBtn').classList.add('d-none');
        document.getElementById('basic-addon2').classList.remove('d-none');
        editingIndex = -1; // Reset the index
    }
}

function toggleTaskDone(index){
    tasks[index].done = !tasks[index].done; // Toggle between true/false
    localStorage.setItem('list', JSON.stringify(tasks));
    addTask(); // Re-render the list
}

