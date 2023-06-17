import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



// MIGHT NEED TRY CATCHES HERE IN SOME OF THE SQL COMMANDS


const db  = require('../db')

const createSecurePassword = async (password : string ) => {
    const now = new Date();
    let datetime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
    datetime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    const salt = await bcrypt.genSalt();
    return await bcrypt.hashSync(password, salt + datetime);
}

const getUser = async (userName : string ) => 
    await db.executeSQLCommand(`select * from timef_users 
            where userName = ?`, [userName])

exports.authDefault = async (req : Request, res : Response) => {
    //const users = await db.getUsers()
    res.json([""])
}

exports.regAccount = async (req : Request, res : Response) => {
    const {name, email, userIcon, password} = req.body

    const checkEmail = `select userName from timef_users where email = ?`

    const [SQLname]  = await getUser(name)
    const [SQLemail] = await db.executeSQLCommand(checkEmail, [email])

    if(SQLname[0] != 0 || SQLemail[0] != 0) {
        let msg = ""
        if(SQLemail[0] > 0) msg = 'Email in use already '
        else msg += 'Name in use'

        res.json(msg)
        return
    }

    const regUser = `insert into timef_users(userName, userIcon, email, passw) values(?, ?, ?, ?)`
    const hashedPass = await createSecurePassword(password);

    try{
        const sqlData = db.executeSQLCommand(regUser, [name, userIcon, email, hashedPass])
        res.json("Account created : " + name)
        return
    } catch(e) {
        res.json("Error!" + e)
    }
}

exports.loginAccount = async(req : Request, res : Response) => {
    const{name, password} = req.body
    const checkName = `select * from timef_users where userName = ?`

    const [user] = await db.executeSQLCommand(checkName, [name])
    if (user.length === 0) {
        res.json("User not found !")
        return
    }

    const correctLogin = bcrypt.compareSync(password, user[0].passw)

    if(!correctLogin) {
        res.status(404).json('Incorrect password !');
        return
    }

    const token = jwt.sign({id:user[0].userId}, "jjwwtt");

    res.cookie("access_token", token, {
        httpOnly: true
    }).status(200).json(user[0])
}

exports.changePassword = async(req : Request, res : Response) => {
    const username = req.params.username
    const{oldpassword, password} = req.body
    const [users] = await getUser(username)

    if (users.length === 0)
        return "User not found!"

    const correctLogin = bcrypt.compareSync(oldpassword, users[0].passw)
    if (!correctLogin) return "Incorrect password";

    const newPass = await createSecurePassword(password)
    const updatePassword = `UPDATE timef_users set passw = ? where userName = ?`
    db.executeSQLCommand(updatePassword, [newPass, username])
    res.json("Password changed")
}

exports.updateUserBio = async(req : Request, res : Response) => { 
    const username = req.params.username
    const{userbio } = req.body

    const updateBio = `Update timef_users set bio = ? where userName = ?`
    await db.executeSQLCommand(updateBio, [userbio, username])
    return res.json(await getUser(username))    
}

exports.logOut = async(req : Request, res : Response) => {
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User logout")
}