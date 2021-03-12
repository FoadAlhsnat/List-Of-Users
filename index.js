const studenturl = "https://appleseed-wa.herokuapp.com/api/users/";

//dom element
const input = document.querySelector('input')
let select = document.querySelector('select')
let deleteBtns;
let update;
let checkUpdate=false
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


// feach all the users
async function fetchAll() {
  let studentlist = await fetchUrl(studenturl)
  for (let i = 0; i < studentlist.length; i++) {
    const data = await fetchUrl(studenturl + i);
    //add the data to the arry of object 
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
  localStorage.setItem('users',JSON.stringify(list))
  const tabl = document.querySelector('table');
  let text = ''
  for (let i = 0; i < list.length; i++) {
    text += `<tr data-id="${listOfStudent[i].id}">
    <td>${listOfStudent[i].id}</td>
    <td class="firstName">${listOfStudent[i].firstName}</td>
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
  if(checkUpdate)return
  checkUpdate=true
  //get the id of row was clicked
  let gettablefromrow = e.target.parentElement.parentElement.dataset.id
  console.log(gettablefromrow);
  // change the row to inputs
  let mytbl = document.querySelector(`[data-id='${gettablefromrow}']`)
  mytbl.children[1].innerHTML = `<input class="firstnameinput" type="text"  value="${list[gettablefromrow].firstName}">`
  mytbl.children[2].innerHTML = `<input class="lastNameinput" type="text"  value="${list[gettablefromrow].lastName}">`
  mytbl.children[3].innerHTML = `<input class="ageinput" type="number"  min="20" max="70" value="${list[gettablefromrow].age}">`
  mytbl.children[4].innerHTML = `<input class="genferinput" type="text"  value="${list[gettablefromrow].gender}">`
  mytbl.children[5].innerHTML = `<input class="capsuleinput" type="number" min="1" max="8" value="${list[gettablefromrow].capsule}">`
  mytbl.children[6].innerHTML = `<input class="cityinput" type="text"  value="${list[gettablefromrow].city}">`
  mytbl.children[7].innerHTML = `<input class="hobbyinput" type="text"  value="${list[gettablefromrow].hobby}">`
  mytbl.children[8].innerHTML = `<button class="confirm" >confirm</button><button class="cancel">cancel</button>`



  let confirm = document.querySelector(".confirm")
  let cancel = document.querySelector(".cancel")

  //updatebutton
  confirm.addEventListener('click',  ()=> {
    checkUpdate=false
    mytbl.innerHTML = `<tr data-id="${list[gettablefromrow].id}">
    <td>${list[gettablefromrow].id}</td>
    <td class="firstName">${ document.querySelector(".firstnameinput").value}</td>
    <td class="lastName">${document.querySelector(".lastNameinput").value}</td>
    <td class="age">${document.querySelector(".ageinput").value}</td>
    <td class="gender">${document.querySelector(".genferinput").value}</td>
    <td class="capsuls">${document.querySelector(".capsuleinput").value}</td>
    <td class="city">${document.querySelector(".cityinput").value}</td>
    <td class="hobby">${document.querySelector(".hobbyinput").value}</td>
    <td><button class=update >update</button><button class="delete">Delete</button></td>
  </tr>`
  })



  //cancel botton
  cancel.addEventListener('click',()=>{
    checkUpdate=false
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
  })

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
