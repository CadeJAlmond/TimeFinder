import dotenv from 'dotenv'
const mysql = require('mysql2')

dotenv.config({path: './config.env'})

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PSW,
    database: process.env.MYSQL_DB
}).promise()

exports.executeSQLCommand = async (commandStr : string, values : string []) =>
    await db.query(commandStr, values)

exports.selectUserInfo = 'Select email, userIcon, userId, userName, userYearlyGoal, bio, colorTheme'

exports.selectNotes    = `Select userName, noteTitle, noteContent, userId, userYearlyGoal, email, noteId`

exports.selectEvents   = `Select userId, eventID, eventName, eventDescription, eventColor, 
    eventPriority, eventCreationDate, eventDueDate`

exports.selectSearchedUser = `Select bio, email, friendId, userIcon, userId, userId1, userId2, userName`

// ## ------------- Users ------------- ##
// =======================================


// ## ------------- EVENTS ------------- ##
// ========================================

// DONE

exports.updateEvent = async (eventTitle : string, eventDesc : string, eventId : number) => { 
    const createPost = `UPDATE timef_events SET eventDescription = ? where eventID = 14`
}


// ## ------------- NOTES ------------- ##
// =======================================


// ## ------------- AUTH ------------- ##
// ======================================
