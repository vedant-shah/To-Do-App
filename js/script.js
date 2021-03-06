console.log("This is a To-Do App");
shownotes();

// if a user adds a task add it to the local storage
let additem = document.getElementById("additem");
additem.addEventListener("click", function (e) {
  if (
    document.getElementById("titletxt").value == "" ||
    document.getElementById("addtxt").value == ""
  ) {
    alert("Missing Parameters");
    return;
  } else {
    let text = document.getElementById("addtxt");
    let title = document.getElementById("titletxt");
    let titles = localStorage.getItem("titles");
    let notes = localStorage.getItem("notes");
    if (titles == null) titlesObj = [];
    else {
      titlesObj = JSON.parse(titles);
    }

    if (notes == null) notesObj = [];
    else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    titlesObj.push(title.value);
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    localStorage.setItem("notes", JSON.stringify(notesObj));
    title.value = "";
    addtxt.value = "";
    shownotes();
  }
});

function shownotes() {
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");

  if (titles == null) titlesObj = [];
  else {
    titlesObj = JSON.parse(titles);
  }

  if (notes == null) notesObj = [];
  else {
    notesObj = JSON.parse(notes);
  }
  let html = "";

  notesObj.forEach(function (element, index) {
    html += `
        <div class="card mx-2 my-2 notecard" style="width: 18rem;">
        <div class="card-body cdbdy" id=${index}>
        <h5 class="card-title">${titlesObj[index]}</h5>
        <p class="card-text">${element}</p>
        <div class="wrap">
        <button id="${index}"onclick="deleteelm(this.id)" class=" cbutton mr2"><span class="button-content">Delete Task </span> </button>
        <button id="${index}"onclick="modify(this.id)" class=" cbutton modify"><span class="button-content">Modify </span></button>
        </div>
        </div>
        </div>
        `;
  });
  let noteselm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteselm.innerHTML = html;
  } else
    noteselm.innerHTML = `<p>No Task to show. Add a task from the section above.</p>`;
}

function deleteelm(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) notesObj = [];
  else {
    notesObj = JSON.parse(notes);
  }
  let titles = localStorage.getItem("titles");

  if (titles == null) titlesObj = [];
  else {
    titlesObj = JSON.parse(titles);
  }

  notesObj.splice(index, 1);
  titlesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  shownotes();
}

search = document.getElementById("search");
search.addEventListener("input", function () {
  let input = search.value;
  let notecard = document.getElementsByClassName("notecard");
  Array.from(notecard).forEach(function (element) {
    let cardtxt = element.getElementsByTagName("p")[0].innerText;
    // console.log("1 "+cardtxt);
    if (cardtxt.includes(input)) element.style.display = "block";
    else element.style.display = "none";
  });
});

function modify(index) {
  console.log("104 " + index);
  let moditxt = document.createElement("input");
  moditxt.className = "form-control my-2";
  moditxt.type = "text";
  moditxt.rows = "3";
  moditxt.id = "modtxt";
  let conf = document.createElement("button");
  conf.className = "btn btn-primary";
  conf.innerText = "Confirm";
  conf.id = "conf";

  let cdbdy = document.getElementsByClassName("cdbdy")[index];
  let mod_buttons = document.getElementsByClassName("modify");
  console.log(mod_buttons);

  Array.from(mod_buttons).forEach((element) => {
    if (element.id == index) {
      // continue;
    } else {
      element.style.display = "none";
    }
  });

  cdbdy.appendChild(moditxt);
  cdbdy.appendChild(conf);

  let notes = localStorage.getItem("notes");
  if (notes == null) notesObj = [];
  else {
    notesObj = JSON.parse(notes);
  }
  let conf1 = document.getElementById("conf");
  conf1.addEventListener("click", function () {
    notesObj[index] = moditxt.value;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
  });
  console.log(index);
}
