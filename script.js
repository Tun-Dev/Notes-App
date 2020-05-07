//A reference to the save button
const savebtn = document.getElementById('savebtn');

//a global variable, which is asigned to nothing
let notes = "";

//The main function, to intialize our application
init();

function init(){
    let out = "";
    let noteArray = JSON.parse(localStorage.getItem('noteData'));//where all the notes will be stored "noteData"


    //to test if there is no note or there is note already
    if(noteArray != null && noteArray != ""){
        noteArray = JSON.parse(localStorage.getItem('noteData'));

        //to loop through the saved notes
        for(let x = 0; x < noteArray.length; x++){
            //build the output
            out += "<option value=" +x + ">";
            out += noteArray[x].title;
            out += "</option>";


            //sending thye noteArray to the id noteMaster 
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


//Function to display the user input for the notes
function writeNote(){
    document.getElementById('read').style.display = "none";
    document.getElementById('input').style.display = "block";
    document.getElementById('noteTitle').value = "";
    document.getElementById('noteBody').value = "";
}

//diplays the saved notes and hides the input section
function readNotes(){
    document.getElementById('read').style.display = "block";
    document.getElementById('input').style.display = "none";
}


//dthis function which sends the saved items in local storage arranged
function displayNote(note){
    let noteArray= JSON.parse(localStorage.getItem('noteData'));
    let out = "<h2>" + noteArray[note].title + "</h2><br>";
    out += "<h4>Date: " + new Date(noteArray[note].date).toDateString() + "</h4><br>";
    out += "<h6>" + noteArray[note].body + "</h6><br>";
    out += "<button id='deletebtn'>Delete</button>";
    document.getElementById('noteDisplay').innerHTML = out;
    document.getElementById('deletebtn').onclick = function(){
        noteArray.splice(note,1);
        localStorage.setItem('noteData', JSON.stringify(noteArray));
        init();
    }
}

//the save button on click function,
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

//save note to the local storage
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
