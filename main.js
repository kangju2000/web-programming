const listInput = document.querySelector(".text-input");
const listForm = document.querySelector(".input-form");
const listBody = document.querySelector(".list-body");

let toDoList = [];

function saveList(toDo) {
  const data = {
    toDo: toDo,
    id: toDoList.length + 1,
  }
  toDoList.push(data);
  localStorage.setItem('ToDoList', JSON.stringify(toDoList));
}

function getList() {
  const getData = localStorage.getItem('ToDoList');
  
  if (getData != null) {
    const lists = JSON.parse(getData);
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      showList(list.toDo);
      saveList(list.toDo);
    };
  }
}

function showList(toDo) {
  const tr = document.createElement('tr');
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'btn-chk');
  const td1 = document.createElement('td');
  td1.innerHTML = toDo;
  const td2 = document.createElement('td');
  td2.appendChild(input);
  tr.appendChild(td1);
  tr.appendChild(td2);
  listBody.appendChild(tr);
}

function createList(e) {
  e.preventDefault();
  const toDo = listInput.value;
  showList(toDo);
  saveList(toDo);
  listInput.value = "";
}

function init() {
  getList();
  listForm.addEventListener("submit", createList);
}
init();