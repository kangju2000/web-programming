const listInput = document.querySelector(".text-input");
const listForm = document.querySelector(".input-form");
const listBody = document.querySelector(".list-body");

let toDoList = [];

// 로컬스토리지에 저장하는 함수
function saveList(toDo) {
  const cnt = parseInt(localStorage.getItem('count'));
  const data = {
    toDo: toDo,
    id: cnt + 1,
  }

  toDoList.push(data);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  localStorage.setItem('count', cnt + 1);

  showList(toDo, data.id);
}

// 화면에 리스트 띄우는 함수
function showList(toDo, id) {
  const div = document.createElement('div');
  div.setAttribute('class', 'list-div');
  div.setAttribute('id', id);  // id를 심어줘서 나중에 삭제 시 찾을수 있게 하고 싶음
  // const input = document.createElement('input');
  // input.setAttribute('type', 'checkbox');
  // input.setAttribute('class', 'btn-chk');
  const p = document.createElement('p');
  p.innerHTML = toDo;
  // const td2 = document.createElement('td');
  // td2.appendChild(input);
  div.appendChild(p);
  // div.appendChild(td2);
  listBody.appendChild(div);
}

// 리스트 추가 함수
function createList(e) {
  e.preventDefault();
  const toDo = listInput.value;

  if (toDo == "") {
    alert("할 일을 입력해주세요!");
  }
  else {
    saveList(toDo);
    listInput.value = "";
  }
}

function deleteList(e) {
  const t_list = e.target.parentNode;
  const id = t_list.getAttribute('id');
  for (let i = 0; i < toDoList.length; i++) {
    if (toDoList[i].id == id) {
      toDoList.splice(i, 1);
    }
  }
  console.log(toDoList);

  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  listBody.removeChild(t_list);
}

// 리스트를 로컬스토리지에서 받아오는 함수
function getList() {
  const getData = localStorage.getItem('toDoList');

  if (getData != null && getData != []) {
    const lists = JSON.parse(getData);
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      toDoList.push(list);
      showList(list.toDo, list.id);
    };
  }
  else {
    localStorage.setItem('count', 0);
  }
}

function init() {
  getList();
  listForm.addEventListener("submit", createList);
  listBody.addEventListener("click", deleteList);
}

init();