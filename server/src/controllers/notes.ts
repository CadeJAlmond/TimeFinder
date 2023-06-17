import { Request, Response } from "express"
const db = require('../db')
const selectNotes = db.selectNotes

const getNotes = async (userName : string) => {
    const getUserNotes = `${selectNotes} from timef_users natural join timef_notes
    where userName = ?`;
    return await db.executeSQLCommand(getUserNotes, [userName])
}

// ## ------------- GET ------------- ##
// =====================================

exports.getNotes = async (req : Request, res : Response) => {
    const userName = req.params.username

    const [notes] = await getNotes(userName)
    res.json(notes)
}

// ## ------------- POST ------------- ##
// ======================================

exports.addNote = async (req : Request, res : Response) => {
    const userName = req.params.username
    const { noteTitle, noteContent } = req.body

    const getUserId = `Select userId from timef_users where userName = ?`;
    const createPost = `INSERT INTO timef_notes((${getUserId})), noteTitle, noteContent)
         VALUES(?, ?, ?)`;
    const insert = await db.executeSQLCommand(createPost, [userName, noteTitle, noteContent])

    const [notes] = await getNotes(userName)
    res.json(notes)
}

exports.updateNote = async (req : Request, res : Response) => {
    const userName = req.params.username
    const { noteId, noteTitle, noteContent } = req.body

    const updateNote = `UPDATE timef_notes SET noteTitle = ?, noteContent = ? where noteId = ?` 

    const update = await db.executeSQLCommand(updateNote, [noteTitle, noteContent, noteId])

    const [notes] = await getNotes(userName)
    res.json(notes)
}