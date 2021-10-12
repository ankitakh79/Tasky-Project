//parent element to store cards
const taskContainer = document.querySelector(".task_container");

//global store
let globalStore = [];

const newCard = ({id, imageUrl,taskTitle,taskType,taskDesc}) => `
    <div class="col-md-6 col-lg-4" id=${id}>
          <div class="card text-center">
            <div class="card-header d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-outline-success" id=${id} onclick="editCard.apply(this,arguments)">
              <i class="fas fa-pencil-alt" id=${id} onclick="editCard.apply(this,arguments)"></i></button>
              <button type="button" class="btn btn-outline-danger" id=${id} onclick="deleteCard.apply(this,arguments)">
              <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this,arguments)"></i></button>
            </div>
            <img src=${imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${taskTitle}</h5>
              <p class="card-text">${taskDesc}</p>
              <span class="badge bg-primary">${taskType}</span>
            </div>
            <div class="card-footer text-muted">
              <button type="button" class="btn btn-outline-primary float-end" >Open Task</button>
            </div>
          </div>
        </div>

  `;

const loadInitialTaskCards = () => {
    //access localstorage
    const getInitialData = localStorage.tasky;
    if(!getInitialData) return;
    //convert string to object
    const { cards } = JSON.parse(getInitialData);

    //map aroud to the array
    cards.map((cardObject) => {
        const createNewCard = newCard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObject);
    })
}

const updateStore = () =>localStorage.setItem("tasky",JSON.stringify({cards:globalStore})); 
  
const saveChanges = () =>{
    const taskData = {
        id:`${Date.now()}`, //unique number for card id
        imageUrl:document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktitle").value,
        taskType:document.getElementById("tasktype").value,
        taskDesc:document.getElementById("taskdescription").value
    };
    const createNewCard = newCard(taskData);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(taskData);

    //add to localstorage
        updateStore();
}
const deleteCard = (event) => {
        //id
        event = window.event;
         const targetID = event.target.id;
         const tagname = event.target.tagName;
        //search the globalstorage, remove the object which matches the id
         const  newArrayUpdate= globalStore.filter((cardObject) => cardObject.id !==targetID);
         globalStore = newArrayUpdate;
        //add to localstorage
        updateStore();
         if(tagname === "BUTTON"){
           return taskContainer.removeChild(
           event.target.parentNode.parentNode.parentNode
           );
          }
        return  taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode);
}

// const editCard = (event) => {
//     //id
//     event = window.event;
//     const targetID = event.target.id;
//     const tagname = event.target.tagName;
   
//     let parentElement;

//     if(tagname === "BUTTON"){
//       parentElement = event.target.parentNode.parentNode;
//     }else{
//       parentElement = event.target.parentNode.parentNode.parentNode;
//     }

//     let taskTitle = parentElement.childNode[5].childNode[1];
//     let taskDesc = parentElement.childNode[5].childNode[3];
//     let taskType = parentElement.childNode[5].childNode[5];
//     let submitButton = parentElement.childNode[7].childNode[1];


//     taskTitle.setAttribute("contenteditable","true");
//     taskDesc.setAttribute("contenteditable","true");
//     taskType.setAttribute("contenteditable","true");
//     submitButton.setAttribute("onclick","saveEditChanges.apply(this,arguments)")
//     submitButton.innerHTML = "Save Changes";

// }

// const saveEditChanges = (event) => {
//   //id
//   event = window.event;
//   const targetID = event.target.id;
//   const tagname = event.target.tagName;
 
//   let parentElement;

//   if(tagname === "BUTTON"){
//     parentElement = event.target.parentNode.parentNode;
//   }else{
//     parentElement = event.target.parentNode.parentNode.parentNode;
//   }

//   let taskTitle = parentElement.childNode[5].childNode[1];
//   let taskDesc = parentElement.childNode[5].childNode[3];
//   let taskType = parentElement.childNode[5].childNode[5];
//   let submitButton = parentElement.childNode[7].childNode[1];

//   const updatedData = {
//     taskTitle: taskTitle.innerHTML,
//     taskType: taskType.innerHTML,
//     taskDesc: taskDesc.innerHTML
//   }
// console.log(saveEditChanges);
//   globalStore = globalStore.map((task) => {
//     if(task.id === targetID){
//     return{
//      id:task.id,
//      imageUrl:task.imageUrl,
//      taskTitle : updatedData.taskTitle,
//      taskType : updatedData.taskType,  
//      taskDesc : updatedData.taskDesc,  
    
//     };
//   }
//   return task;
//   });
//   console.log(globalStore)
//   //updateStore();
// }



  
