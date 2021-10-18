console.log('This is a To-Do App')
shownotes();

// if a user adds a task add it to the local storage
let additem = document.getElementById('additem');
additem.addEventListener('click', function (e) {
    let text = document.getElementById('addtxt');
    let title = document.getElementById('titletxt');
    let titles = localStorage.getItem('titles')
    let notes = localStorage.getItem('notes');
    if (titles == null)
        titlesObj = [];
    else {
        titlesObj = JSON.parse(titles);
    }

    if (notes == null)
        notesObj = [];
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    titlesObj.push(title.value);
    localStorage.setItem('titles', JSON.stringify(titlesObj));
    localStorage.setItem('notes', JSON.stringify(notesObj));
    title.value = "";
    addtxt.value = "";
    shownotes();
});

function shownotes() {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');

    if (titles == null)
        titlesObj = [];
    else {
        titlesObj = JSON.parse(titles);
    }

    if (notes == null)
        notesObj = [];
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";

    notesObj.forEach(function (element, index) {
        html += `
        <div class="card mx-2 my-2 notecard" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${titlesObj[index]}</h5>
        <p class="card-text">${element}</p>
        <button id="${index}"onclick="deleteelm(this.id)" class="btn btn-primary">Delete Task</button>
        </div>
        </div>
        `;
    });
    let noteselm = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteselm.innerHTML = html;
    } else
        noteselm.innerHTML = `No Task to show. Add a task from the section above.`
}

function deleteelm(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null)
        notesObj = [];
    else {
        notesObj = JSON.parse(notes);
    }
    let titles = localStorage.getItem('titles');

    if (titles == null)
        titlesObj = [];
    else {
        titlesObj = JSON.parse(titles);
    }

    notesObj.splice(index, 1);
    titlesObj.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titlesObj));
    shownotes();
}

search = document.getElementById('search');
search.addEventListener('input', function () {
    let input = search.value;
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        // console.log("1 "+cardtxt);
        if (cardtxt.includes(input))
            element.style.display = "block";
        else
            element.style.display = "none";
    })
})