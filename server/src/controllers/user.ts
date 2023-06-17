import { Request, Response } from "express"
const db = require('../db')
const selectUsers         = db.selectUserInfo
const selectSearchedUsers = db.selectSearchedUser

const getFriends = async ( userName : string ) => {
    const getFriends = `${selectSearchedUsers} from timef_users join timef_friends where userId = userId1 and userName 
        != ? UNION ${selectSearchedUsers} from timef_users join timef_friends where userId = userId2 and userName != ?`

    return await db.executeSQLCommand(getFriends, [userName, userName])
}

const getPending = async ( userName : string) => {
    const getId     = `(Select userId from timef_users where userName = ?)`
    const getPending = `Select * from timef_friend_requests natural join timef_users
         where receiverId = ${getId}`
    return await db.executeSQLCommand(getPending, [userName])
}

exports.updateColorTheme = async (req : Request, res : Response) => {
    const userName = req.params.username
    const { colorTheme } = req.body

    const updateTheme = `Update timef_users set ColorTheme = ? where userName = ?`

    const insert = await db.executeSQLCommand(updateTheme, [colorTheme, userName])
    res.json(colorTheme)
}

exports.searchUsers = async (req : Request, res : Response) => { 
    const searchName = req.params.profilename

    const getUsers = `${selectUsers} from timef_users where userName like ? limit 15`
    const [users] = await db.executeSQLCommand(getUsers, [`%${searchName}%`])
 
    res.json(users)
}

exports.getFriends = async (req : Request, res : Response) => {
    const userName = req.params.username

    const [friends] = await getFriends(userName)
    res.json(friends)
 }

 exports.acceptFriend = async (req : Request, res : Response) => { 
    const acceptorName = req.params.profilename1
    const acceptedName = req.params.profilename2

    const addFriend = `Insert into timef_friend_requests(userId1, userId2) values(?, ?)`

    const removePending = `Delete from timef_pending where senderId = ? and 
    receiverId = ?`
    const remove = db.executeSQLCommand(removePending, [acceptedName, acceptorName ])

    const [friends] = await getFriends(acceptorName)
    res.json(friends)
 }

exports.addFriend = async (req : Request, res : Response) => { 
    const requesterName = req.params.profilename1
    const recipientId   = req.params.profilename2

    const getId     = `(Select userId from timef_users where userName = ?)`
    const addFriend = `Insert into timef_friend_requests(userId1, userId2) values(${getId}, ?)`
    const add = db.executeSQLCommand(addFriend,[requesterName, recipientId])
    
    const [pending] = await getPending(requesterName)
    res.json(pending)
}


exports.getPending = async (req : Request, res : Response) => { 
    const userName = req.params.username

    const [pending] = await getPending(userName)
    res.json(pending)
}