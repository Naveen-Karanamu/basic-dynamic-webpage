const taskContainer = document.querySelector(".task_container");
let globalTaskData = [];

const createCard = ({ id, url, name, type, description }) => {
    return `<div class="col-md-6 col-lg-3 d-flex justify-content-center mb-5" id=${id}>
    <div class="card  ">
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-warning"> <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn btn-outline-danger" id=${id} onclick="deleteCard().apply(this,arguments)"> 
            <i id=${id} onclick="deleteCard().apply(this,arguments)"class="fas fa-trash-alt"></i>
            </button>


        </div>
        <img src=${url}class="card-img-top" alt="image.jpg">

        <div class="card-body align-items-start">

            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
            <h6><span class="badge bg-secondary">${type}</span></h6>
        </div>
        <div class="card-footer text-muted">
            <button type="button" class="btn btn-outline-secondary float-end">Open Image</button>
        </div>
    </div>
</div>`;
};

const loadImageData = () => {
    const getImageData = localStorage.getItem("key");
    if (!getImageData)
        return;

    const { cards } = JSON.parse(getImageData);

    cards.map((card) => {
        const createNewCard = createCard(card);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalTaskData.push(card);
    })
}

const addImage = () => {
    const saveChanges = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        name: document.getElementById("imageName").value,
        type: document.getElementById("imageType").value,
        description: document.getElementById("imageDescription").value,

    };

    console.log(saveChanges);
    const createNewCard = createCard(saveChanges);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalTaskData.push(saveChanges);
    localStorage.setItem("key", JSON.stringify({ cards: globalTaskData }));
};

const deleteCard=(event)=>{
    event =window.event;
    targetId=event.target.id;
    const tagname=event.target.tagName;
    const newCard=globalTaskData.filter((card)=>card.id!==targetId)

    if(tagname=="BUTTON"){
        return event.target.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode);
    }

    else
    return event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

}