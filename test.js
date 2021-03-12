const studenturl = "https://appleseed-wa.herokuapp.com/api/users/";

//dom element
const input = document.querySelector('input')
let select = document.querySelector('select')
let deleteBtns;
let update;

let list = []
async function fetchUrl(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


// fea
async function fetchAll() {
  let studentlist = await fetchUrl(studenturl)
  for (let i = 0; i < studentlist.length; i++) {
    const data = await fetchUrl(studenturl + i);
    studentlist[i].age = data.age
    studentlist[i].city = data.city
    studentlist[i].gender = data.gender
    studentlist[i].hobby = data.hobby
  }
  list = studentlist
  creattheDom(list)
}
//creat the table
function creattheDom(listOfStudent) {
  const tabl = document.querySelector('table');
  let text = ''
  for (let i = 0; i < list.length; i++) {
    text += `<tr data-id="${listOfStudent[i].id}">
    <td>${listOfStudent[i].id}</td>
    <td class="firstName "><span>${listOfStudent[i].firstName}<span><input class="FnameInput hidd" type="text" name="text" value="${listOfStudent[i].firstName}"></td>
    <td class="lastName">${listOfStudent[i].lastName}</td>
    <td class="age">${listOfStudent[i].age}</td>
    <td class="gender">${listOfStudent[i].gender}</td>
    <td class="capsuls">${listOfStudent[i].capsule}</td>
    <td class="city">${listOfStudent[i].city}</td>
    <td class="hobby">${listOfStudent[i].hobby}</td>
    <td><button class=update >update</button><button class="delete">Delete</button></td>
  </tr>`
  }
  tabl.insertAdjacentHTML('beforeend', text)
  deleteBtns = document.querySelectorAll('.delete')
  update = document.querySelectorAll('.update')

  update.forEach((btn) => btn.addEventListener('click', updateuser))
  deleteBtns.forEach((btn) => btn.addEventListener('click', deletuser))
}


function updateuser(e) {

  let row = e.target.parentElement.parentElement
  let inputrow=row.querySelector('input');
  inputrow.classList.remove('hidd')
 let spanrow=row.querySelector('span');
 spanrow.classList.add('hidd')
  console.log(inputrow,spanrow);

  /*let gettablefromrow = e.target.parentElement.parentElement.dataset.id
  console.log(gettablefromrow);
  let mytbl = document.querySelector(`[data-id='${gettablefromrow}']`)
  mytbl.children[1].innerHTML = `<input class="firstnameinput" type="text" name="text" id="newtask" value="${list[gettablefromrow].firstName}">`
  mytbl.children[2].innerHTML = `<input class="FNinput" type="text" name="text" id="newtask" value="${list[gettablefromrow].lastName}">`
  mytbl.children[3].innerHTML = `<input class="FNinput" type="text" name="text" id="newtask" value="${list[gettablefromrow].age}">`
  mytbl.children[4].innerHTML = `<input class="FNinput" type="text" name="text" id="newtask" value="${list[gettablefromrow].gender}">`
  mytbl.children[5].innerHTML = `<input class="FNinput" type="text" name="text" id="newtask" value="${list[gettablefromrow].capsule}">`
  mytbl.children[6].innerHTML = `<input class="FNinput" type="text" name="text" id="newtask" value="${list[gettablefromrow].city}">`
  mytbl.children[7].innerHTML = `<input class="FNinput" type="text" name="text" id="newtask" value="${list[gettablefromrow].hobby}">`
  mytbl.children[8].innerHTML = `<button class="confirm" >confirm</button><button class="cancel">cancel</button>`



  let confirm = document.querySelector(".confirm")
  let cancel = document.querySelector(".cancel")
  console.log(list[gettablefromrow].firstName)
  confirm.addEventListener('click', function () {
    const inputfname = document.querySelector(".firstnameinput").value
    list[gettablefromrow].firstName = inputfname
    mytbl.innerHTML = `<tr data-id="${list[gettablefromrow].id}">
    <td>${list[gettablefromrow].id}</td>
    <td class="firstName">${list[gettablefromrow].firstName}</td>
    <td class="lastName">${list[gettablefromrow].lastName}</td>
    <td class="age">${list[gettablefromrow].age}</td>
    <td class="gender">${list[gettablefromrow].gender}</td>
    <td class="capsuls">${list[gettablefromrow].capsule}</td>
    <td class="city">${list[gettablefromrow].city}</td>
    <td class="hobby">${list[gettablefromrow].hobby}</td>
    <td><button class=update >update</button><button class="delete">Delete</button></td>
  </tr>`
  })*/


}

function deletuser(e) {
  let x = e.target
  x.parentElement.parentElement.remove()
}

function usersearch() {
  let inputText = input.value.toLocaleUpperCase()
  let myoption = select.options[select.selectedIndex].value;
  let list = document.querySelectorAll(`.${myoption} `)
  for (i = 0; i < list.length; i++) {
    let flter = list[i].innerText.toLocaleUpperCase()
    if (flter.indexOf(inputText) !== -1) {
      list[i].parentElement.style.display = ""
    }
    else {
      list[i].parentElement.style.display = "none"
    }
  }
}


fetchAll()
input.addEventListener('keyup', usersearch)
