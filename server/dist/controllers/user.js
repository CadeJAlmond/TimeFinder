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
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db');
const selectUsers = db.selectUserInfo;
const selectSearchedUsers = db.selectSearchedUser;
const getFriends = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const getFriends = `${selectSearchedUsers} from timef_users join timef_friends where userId = userId1 and userName 
        != ? UNION ${selectSearchedUsers} from timef_users join timef_friends where userId = userId2 and userName != ?`;
    return yield db.executeSQLCommand(getFriends, [userName, userName]);
});
const getPending = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const getId = `(Select userId from timef_users where userName = ?)`;
    const getPending = `Select * from timef_friend_requests natural join timef_users
         where receiverId = ${getId}`;
    return yield db.executeSQLCommand(getPending, [userName]);
});
exports.updateColorTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { colorTheme } = req.body;
    const updateTheme = `Update timef_users set ColorTheme = ? where userName = ?`;
    const insert = yield db.executeSQLCommand(updateTheme, [colorTheme, userName]);
    res.json(colorTheme);
});
exports.searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchName = req.params.profilename;
    const getUsers = `${selectUsers} from timef_users where userName like ? limit 15`;
    const [users] = yield db.executeSQLCommand(getUsers, [`%${searchName}%`]);
    res.json(users);
});
exports.getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const [friends] = yield getFriends(userName);
    res.json(friends);
});
exports.acceptFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const acceptorName = req.params.profilename1;
    const acceptedName = req.params.profilename2;
    const addFriend = `Insert into timef_friend_requests(userId1, userId2) values(?, ?)`;
    const removePending = `Delete from timef_pending where senderId = ? and 
    receiverId = ?`;
    const remove = db.executeSQLCommand(removePending, [acceptedName, acceptorName]);
    const [friends] = yield getFriends(acceptorName);
    res.json(friends);
});
exports.addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requesterName = req.params.profilename1;
    const recipientId = req.params.profilename2;
    const getId = `(Select userId from timef_users where userName = ?)`;
    const addFriend = `Insert into timef_friend_requests(userId1, userId2) values(${getId}, ?)`;
    const add = db.executeSQLCommand(addFriend, [requesterName, recipientId]);
    const [pending] = yield getPending(requesterName);
    res.json(pending);
});
exports.getPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const [pending] = yield getPending(userName);
    res.json(pending);
});
