const listInput = document.querySelector(".text-input");
const listForm = document.querySelector(".input-form");
const listBody = document.querySelector(".list-body");

let toDoList = [];

// 로컬스토리지에 저장하는 함수
function saveList(toDo) {
  const cnt = parseInt(localStorage.getItem('count'));
  const list = {
    toDo: toDo,
    checked: false,
    id: cnt + 1,
  }

  toDoList.push(list);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
  localStorage.setItem('count', cnt + 1);

  showList(list);
}

// 화면에 리스트 띄우는 함수
function showList(list) {
  const div = document.createElement('div');
  const input = document.createElement('input');
  const modInput = document.createElement('input');
  const label = document.createElement('label');
  const modifyBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  div.setAttribute('class', 'list-div');
  div.setAttribute('id', list.id);

  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'chk-btn');
  input.setAttribute('id', 'chk' + list.id);
  input.checked = list.checked;
  input.onclick = function (e) {
    list.checked = e.target.checked;
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  };

  deleteBtn.style.display = "none";
  modifyBtn.style.display = "none";
  modInput.style.display = "none";
  modInput.value = list.toDo;
  modInput.setAttribute('class', 'mod-input');
  modifyBtn.setAttribute('class', 'mod-btn');
  modifyBtn.onclick = function (e) {
    if (modInput.style.display == "none") {
      modInput.style.display = "block";
      label.innerHTML = "";
    }
    else {
      modInput.style.display = "none";
      label.innerHTML = modInput.value;
      list.toDo = modInput.value;
      localStorage.setItem('toDoList', JSON.stringify(toDoList));
    }
  };
  modifyBtn.innerHTML = '수정';

  deleteBtn.setAttribute('class', 'del-btn');
  deleteBtn.onclick = function deleteList(e) {
    if (!confirm('삭제하시겠습니까?')) return;

    const t_list = e.target.parentNode;
    const id = t_list.getAttribute('id');
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].id == id) toDoList.splice(i, 1);
    }
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    listBody.removeChild(t_list);
  }

  deleteBtn.innerHTML = '삭제';
  label.innerHTML = list.toDo;
  label.setAttribute('for', 'chk' + list.id);
  div.onmouseover = function () {
    deleteBtn.style.display = "block";
    modifyBtn.style.display = "block";
  }
  div.onmouseout = function () {
    deleteBtn.style.display = "none";
    modifyBtn.style.display = "none";
  }

  div.appendChild(input);
  div.appendChild(modInput);
  div.appendChild(label);
  div.appendChild(modifyBtn);
  div.appendChild(deleteBtn);
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

// 리스트를 로컬스토리지에서 받아오는 함수
function getList() {
  const getData = localStorage.getItem('toDoList');

  if (getData != null && getData != []) {
    const lists = JSON.parse(getData);
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      toDoList.push(list);
      showList(list);
    };
  }
  else {
    localStorage.setItem('count', 0);
  }
}

function init() {
  getList();
  listForm.addEventListener("submit", createList);
}

init();