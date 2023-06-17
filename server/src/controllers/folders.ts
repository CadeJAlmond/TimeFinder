import { Request, Response } from "express"
const db = require('../db')

// ## ------------- GET ------------- ##
// =====================================

exports.getFolders = async (req : Request, res : Response) => {
    const userName = req.params.username
    const getFolders = `Select * from timef_users natural join timef_folders where
        userName = ?`

    const [userFolders] = await db.executeSQLCommand(getFolders, [userName])
    res.json(userFolders)
}

// Adds an Event to the database
exports.getUserFolderEvents = async (req : Request, res : Response) => {
    const userName = req.params.username

    const getFolderEvents =  `Select * from timef_events natural join timef_folder_events
            natural join timef_folders where userName = ?`
    
    const [userFolderEvents] = await db.executeSQLCommand(getFolderEvents, [userName])
    res.json(userFolderEvents)
}

// Retrieves all Events from a given User
exports.getUserFolderNotes= async (req : Request, res : Response) => {
    const userName = req.params.username

    const getUserId = 'Select * from timef_users where userName = ?';
    const getFolderEvents =  `Select * from timef_notes natural join timef_folder_notes
            natural join timef_folders where userId = ?`
    const [uId] = await db.executeSQLCommand(getUserId, [userName])

    const [userFolderNotes] = await db.executeSQLCommand(getFolderEvents, [uId[0].userId])
    res.json(userFolderNotes)
}

// ## ------------- POST ------------- ##
// ======================================

exports.addFolderEvent = async (req : Request, res : Response) => {
    const userName = req.params.username
    const { eventId, folderName } = req.body
    
    const getUserId   = `Select * from timef_users where userName = ?`;
    const getFolderId = `Select folderId from timef_folders where folderName = ? and userId = ?`
    const addFolderEvent = `Insert into timef_folder_events(folderId, eventID) values((${getFolderId}), ?)`

    const [uId]  = await db.executeSQLCommand(getUserId, [userName])
    db.executeSQLCommand(addFolderEvent, [folderName, uId[0].userId, eventId])

    const getFolderEvents =  `Select * from timef_events natural join timef_folder_events
        natural join timef_folders where userId = ?`
    const [userFolderEvents] = await db.executeSQLCommand(getFolderEvents, [uId[0].userId]) 
    res.json(userFolderEvents)
}

exports.addFolderNote = async (req : Request, res : Response) => {
    const userName = req.params.username
    const { noteId, folderName } = req.body

    const getUserId   = `Select * from timef_users where userName = ?`;
    const getFolderId = `Select folderId from timef_folders where folderName = ? and userId = ?`
    const addFolderEvent = `Insert into timef_folder_notes(folderId, noteID) values((${getFolderId}), ?)`

    const [uId]  = await db.executeSQLCommand(getUserId, [userName])
    const insert = await db.executeSQLCommand(addFolderEvent, [folderName, uId[0].userId, noteId])

    const getFolderNotes =  `Select * from timef_notes natural join timef_folder_notes
            natural join timef_folders where userId = ?`
    const [userFolderNotes] = await db.executeSQLCommand(getFolderNotes, [uId[0].userId])
    res.json(userFolderNotes)
}

exports.createFolder= async (req : Request, res : Response) => {
    const userName = req.params.username
    const { folderName } = req.body

    const getUserId = `Select * from timef_users where userName = ?`
    const createFolder =  `Insert into timef_folders(userId, folderName) values(?,?)`

    const [uId] = await db.executeSQLCommand(getUserId, [userName])
    const insert = await db.executeSQLCommand(createFolder, [uId[0].userId, folderName])

    const getFolders = `Select * from timef_users natural join timef_folders where
    userName = ?`

    const [userFolders] = await db.executeSQLCommand(getFolders, [userName])
    res.json(userFolders)
}

// ## ------------- DELETE ------------- ##
// ========================================

exports.removeFolder = async(req : Request, res : Response) => {
    const userName = req.params.username
    const { folderName } = req.body

}

exports.removeNote = async(req : Request, res : Response) => {
    const userName = req.params.username
    const { noteId, folderName } = req.body
}

exports.removeEvent = async(req : Request, res : Response) => {
    const userName = req.params.username
    const { eventId, folderName } = req.body
}