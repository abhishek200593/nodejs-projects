const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => {
    return "Your notes... Need to create the rest. Sorry!"
};

const addNote = (title, body) => {
    const notes = loadNotes()
    /*const duplicateNotes = notes.filter((note) => note.title === title)

    if(duplicateNotes.length === 0) {*/
    
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }   
}

const removeNote = function (title) {
    const notes = loadNotes()
    /*const duplicateNote = notes.filter(function (note) {
        return note.title === title
    })

    if(duplicateNote.length != 0){
        var i = notes.length
        while(i--){
            if( notes[i] && notes[i].hasOwnProperty('title') && notes[i]['title'] === title ) {
                notes.splice(i, 1)
                console.log('Note removed')
            }
        }
        saveNotes(notes)
    } else {
        console.log('Note title does not exist')
    }*/
    
    /* Another method */

    /*const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })*/
    
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('No note found!'))
    }
}

const listNotes = () => {
    console.log(chalk.blue.inverse('Your Notes:'))
    const notes = loadNotes()

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)
    
    if(noteToRead) {
        console.log(chalk.magenta.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse('Note does not exists!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(error) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}