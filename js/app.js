console.log("Welcome to the notes app. This is app.js");
showNotes();
//if user add a note, add it to the localstorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let notesObj = {};
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  // console.log(notes);
  showNotes();
});
//function to show elements from the local Storage
function showNotes(){
  let notes = localStorage.getItem('notes');
  let notesObj = {};
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = ""; 
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard mx-2 my-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id = "${index}" onclick = deleteNode(this.id) class="btn btn-primary">Delete</button>
        </div>
      </div>`;
  });
  let notesElm = document.getElementById('notes');
  if(notesObj.length!=0)
  {
    notesElm.innerHTML = html;
  }
  else{
     notesElm.innerHTML= `<h3>Nothing to show! Use "Add a Note" section above in the notes,<\h3>`;
  }
}
//function to delete a Node
function deleteNode(index)
{
  // console.log(`${index+1} node is getting delete`);
  let notes = localStorage.getItem('notes');
  notesObj={};
  if(notes==null)
  {
    notesObj = [];
  }
  else
  {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  showNotes();
}

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input',function() {
  let inputVal = searchTxt.value.toLowerCase();//inputVal has the text which we typed in the search box
  // console.log('Input event fired!',inputVal);
  let noteCard = document.getElementsByClassName('noteCard');//noteCard will have the all the Element with noteCardClass in the form of Array
  Array.from(noteCard).forEach(function(ele)
  {
    let cardTxt = ele.getElementsByTagName("p")[0].innerText;//cardTxt will have the paragraph
    //this will be in the form of string of size 1 that is why we take [0];
    // console.log(cardTxt);
    if(cardTxt.includes(inputVal))
    {
      ele.style.display = "block";
    }
    else
    ele.style.display="none";
  })
})