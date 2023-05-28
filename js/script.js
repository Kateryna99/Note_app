const startEl = document.querySelector('.note-card--start')
const targetContainer = document.querySelector('.notes__content')

getNote().forEach((note)=>{
    const noteEL =  createNote(note.id,note.content)

    targetContainer.append(noteEL)
})

function addNote() {
    const noteList = getNote()
    const noteObj = {
        id: Math.floor(Math.random()*10000) ,
        content: ''
    }
    const noteEl = createNote(noteObj.id,noteObj.content)

    targetContainer.append(noteEl)
    noteList.push(noteObj)

    saveNote(noteList)
}

function createNote(id,content){


    let noteCard = document.createElement('div')
    noteCard.classList.add('note-card')

    const noteWrapper = document.createElement('div')
    noteWrapper.classList.add('note-card__wrapper')

    const textInput = document.createElement('textarea')
    textInput.placeholder = 'Enter a note'
    textInput.classList.add('note-card__text')
    textInput.value = content
    textInput.addEventListener('dblclick',()=>{
        const warning = confirm('Do you want to delete this note')
        if(warning)
            deleteNote(id,noteCard)
    })

    textInput.addEventListener('input',()=>{
        updateNote(id,textInput.value)
    })

     noteWrapper.append(textInput)
    noteCard.append(noteWrapper)

    return noteCard
}
function updateNote(id, content) {
   const notes = getNote()
    const target = notes.filter((note)=> note.id === id)[0];
   target.content = content
    saveNote(notes)
}

function deleteNote(id,noteCard) {
    const notes = getNote().filter((note)=> note.id !== id)

    saveNote(notes)
    console.log(noteCard)
    noteCard.remove()
}
function saveNote(notes) {
    localStorage.setItem('notes',JSON.stringify(notes))
}

function getNote() {
    return JSON.parse(localStorage.getItem('notes') || '[]')
}


startEl.addEventListener('click',()=>{
    addNote()
})


