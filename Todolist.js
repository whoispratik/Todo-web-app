let taskInput=document.getElementById('taskInput');
let addBtn=document.getElementById('addBtn');
let todoList=document.getElementById('todoList');
let searchInput=document.getElementById('searchInput');
let editModal=document.getElementById('editModal');
let saveBtn=document.getElementById('saveBtn');
let deleteBtn=document.getElementById('deleteBtn');
let closeBtns=document.querySelectorAll('.closedBtn');
let alertBox=document.getElementById('alert');
let noTaskMessage=document.getElementById('noTaskMessage');
let editInput=document.getElementById('editInput');
let deleteModal=document.getElementById('deleteModal');

let tasks=[];
let currentEditIndex=-1;
let currentDeleteIndex=-1;

function renderTasks(taskArray){
    todoList.innerHTML="";
    if(taskArray.length===0){
        noTaskMessage.style.display="block";   
   // alert(noTaskMessage.innerText);
    }
    else{
        noTaskMessage.style.display="none";
        taskArray.forEach((task,index)=>{
        const li=document.createElement('li');
        li.innerHTML=`
        <span>${index+1}. ${task}</span>
        <div>
        <button class="btn" onclick="openEditModal(${index})">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn" onclick="openDeleteModal(${index})">
        <i class="fa-solid fa-trash"></i>   
        </button>
        </div>
        `;
        todoList.appendChild(li);
        })
    }
}

function searchTasks(){
    let searchTerm=searchInput.value.toLowerCase();
    const filteredTasks=tasks.filter((task)=>{
        return task.toLowerCase().includes(searchTerm);
    }
    )
    renderTasks(filteredTasks);
}

//showalertmethod.
function showAlert(type,message){
    
    alertBox.classList.add(type);
    alertBox.innerHTML=message;
    alertBox.style.display="block";

    //timing 
    setTimeout(()=>{
   alertBox.style.display="none";
   alertBox.classList.remove(type);
    },3000)
}



function openEditModal(index){
    currentEditIndex=index;
    editInput.value=tasks[index];
    editModal.style.display="block";
}

function openDeleteModal(index){
    currentDeleteIndex=index;
    deleteModal.style.display="block";
}

function closeModal(modal){
    modal.style.display="none";
}

addBtn.addEventListener('click',()=>{
  let taskToAdd=taskInput.value.trim();
  if(taskToAdd!=""){
    tasks.push(taskToAdd);
    taskInput.value="";
    renderTasks(tasks);
    showAlert('success','Task Added sucessfully'); 
  }
  else{
    showAlert('error','cannot add an empty task');  
  }  
})

saveBtn.addEventListener('click',function(){
tasks[currentEditIndex]=editInput.value;
closeModal(editModal);
renderTasks(tasks);
showAlert('success','Task updated Successfully');
})

deleteBtn.addEventListener('click',()=>{
    tasks.splice(currentDeleteIndex,1);
    closeModal(deleteModal);
    renderTasks(tasks);
    showAlert('error','task deleted Successfully');  
})

searchInput.addEventListener('input',searchTasks);

Array.from(closeBtns).forEach((closeBtn)=>{
    closeBtn.addEventListener('click',function(event){
        closeModal(event.target.closest('.modal'));
     } )  
    })

//window object

//

renderTasks(tasks);
