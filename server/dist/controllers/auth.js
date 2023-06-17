"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// MIGHT NEED TRY CATCHES HERE IN SOME OF THE SQL COMMANDS
const db = require('../db');
const createSecurePassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    let datetime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
    datetime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    const salt = yield bcrypt_1.default.genSalt();
    return yield bcrypt_1.default.hashSync(password, salt + datetime);
});
const getUser = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db.executeSQLCommand(`select * from timef_users 
            where userName = ?`, [userName]);
});
exports.authDefault = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const users = await db.getUsers()
    res.json([""]);
});
exports.regAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, userIcon, password } = req.body;
    const checkEmail = `select userName from timef_users where email = ?`;
    const [SQLname] = yield getUser(name);
    const [SQLemail] = yield db.executeSQLCommand(checkEmail, [email]);
    if (SQLname[0] != 0 || SQLemail[0] != 0) {
        let msg = "";
        if (SQLemail[0] > 0)
            msg = 'Email in use already ';
        else
            msg += 'Name in use';
        res.json(msg);
        return;
    }
    const regUser = `insert into timef_users(userName, userIcon, email, passw) values(?, ?, ?, ?)`;
    const hashedPass = yield createSecurePassword(password);
    try {
        const sqlData = db.executeSQLCommand(regUser, [name, userIcon, email, hashedPass]);
        res.json("Account created : " + name);
        return;
    }
    catch (e) {
        res.json("Error!" + e);
    }
});
exports.loginAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const checkName = `select * from timef_users where userName = ?`;
    const [user] = yield db.executeSQLCommand(checkName, [name]);
    if (user.length === 0) {
        res.json("User not found !");
        return;
    }
    const correctLogin = bcrypt_1.default.compareSync(password, user[0].passw);
    if (!correctLogin) {
        res.status(404).json('Incorrect password !');
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user[0].userId }, "jjwwtt");
    res.cookie("access_token", token, {
        httpOnly: true
    }).status(200).json(user[0]);
});
exports.changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const { oldpassword, password } = req.body;
    const [users] = yield getUser(username);
    if (users.length === 0)
        return "User not found!";
    const correctLogin = bcrypt_1.default.compareSync(oldpassword, users[0].passw);
    if (!correctLogin)
        return "Incorrect password";
    const newPass = yield createSecurePassword(password);
    const updatePassword = `UPDATE timef_users set passw = ? where userName = ?`;
    db.executeSQLCommand(updatePassword, [newPass, username]);
    res.json("Password changed");
});
exports.updateUserBio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const { userbio } = req.body;
    const updateBio = `Update timef_users set bio = ? where userName = ?`;
    yield db.executeSQLCommand(updateBio, [userbio, username]);
    return res.json(yield getUser(username));
});
exports.logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User logout");
});
