import { Request, Response } from "express"
const db = require('../db')
const selectEvents = db.selectEvents

// Adds an Event to the database
exports.addEvent = async (req : Request, res : Response) => {
    const userName = req.params.username
    const { eventName, eventDesc, eventColor, eventPrio, eventDueDate } = req.body

    const getUserId = `Select userId from timef_users where userName = ?`;
    const createPost = `INSERT INTO timef_events(userId, eventName, eventDescription,
        eventColor, eventPriority, eventDueDate, completed) VALUES((${getUserId}), ?, ?, ?, ?, ?, ?)`;

    const [uId] = await db.executeSQLCommand(getUserId, [userName])    
    await db.executeSQLCommand(createPost, [userName, eventName, eventDesc, 
        eventColor, eventPrio, eventDueDate, 0])

    const getEvents = `${selectEvents} from timef_users natural join timef_events where userName =
     ? order by eventDueDate`;    

    const [events] = await db.executeSQLCommand(getEvents, [userName])
    res.json(events)
}

// Retrieves all Events from a given User
exports.getAllUserEvents = async (req : Request, res : Response) => {
    const userName = req.params.username
    const getEvents = `${selectEvents} from timef_users natural join timef_events where userName =
     ? order by eventDueDate`;

    const [events] = await db.executeSQLCommand(getEvents, [userName])
    res.json(events)
}

// Updates a users post
exports.updatePost = async (req : Request, res : Response) => {
    res.json("hello running")
}
