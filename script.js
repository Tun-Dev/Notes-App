const savebtn = document.getElementById('savebtn');
let notes = "";
init();

function init(){
    let out = "";
    let noteArray = JSON.parse(localStorage.getItem('noteData'));

    if(noteArray != null && noteArray != ""){
        noteArray = JSON.parse(localStorage.getItem('noteData'));

        for(let x = 0; x < noteArray.length; x++){
            out += "<option value=" +x + ">";
            out += noteArray[x].title;
            out += "</option>";

            document.getElementById('noteMaster').innerHTML = out;
        }

        document.getElementById('writebtn').addEventListener('click', function(e){
            writeNote();
        });
    
        document.getElementById('noteMaster').addEventListener('click', function(e){
            displayNote(e.target.value);
        });
        
        readNotes();
    }

    else{
        writeNote();
    }
}

function writeNote(){
    document.getElementById('read').style.display = "none";
    document.getElementById('input').style.display = "block";
    document.getElementById('noteTitle').value = "";
    document.getElementById('noteBody').value = "";
}

function readNotes(){
    document.getElementById('read').style.display = "block";
    document.getElementById('input').style.display = "none";
}

function displayNote(note){
    let noteArray= JSON.parse(localStorage.getItem('noteData'));
    let out = "<h2>" + noteArray[note].title + "</h2>";
    out += "<h4>Date: " + new Date(noteArray[note].date).toDateString() + "</h4>";
    out += "<h6>" + noteArray[note].body + "</h6>";
    out += "<button id='deletebtn'>Delete</button>";
    document.getElementById('noteDisplay').innerHTML = out;
    document.getElementById('deletebtn').onclick = function(){
        noteArray.splice(note,1);
        localStorage.setItem('noteData', JSON.stringify(noteArray));
        init();
    }
}

savebtn.onclick = function(){
    const noteDate = new Date();
    const noteTitle = document.getElementById('noteTitle').value;
    const noteBody = document.getElementById('noteBody').value;
    const theNote = new Note(noteDate, noteTitle, noteBody);
    if(noteTitle == "" || noteBody == "" ){
        window.alert("type something in!");
        init();
    }
    
    saveNotes(theNote);
}

function saveNotes(note){
    let noteArray = JSON.parse(localStorage.getItem('noteData'));
    if(noteArray == null){
        noteArray = new Array();
        noteArray.push(note);
    }
    else{
        noteArray.push(note);
    }
    localStorage.setItem('noteData', JSON.stringify(noteArray));
    readNotes();
    init();
}
