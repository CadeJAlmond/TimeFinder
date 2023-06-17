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
// ## ------------- GET ------------- ##
// =====================================
exports.getFolders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const getFolders = `Select * from timef_users natural join timef_folders where
        userName = ?`;
    const [userFolders] = yield db.executeSQLCommand(getFolders, [userName]);
    res.json(userFolders);
});
// Adds an Event to the database
exports.getUserFolderEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const getUserId = 'Select * from timef_users where userName = ?';
    const getFolderEvents = `Select * from timef_events natural join timef_folder_events
            natural join timef_folders where userId = ?`;
    const [uId] = yield db.executeSQLCommand(getUserId, [userName]);
    const [userFolderEvents] = yield db.executeSQLCommand(getFolderEvents, [uId[0].userId]);
    res.json(userFolderEvents);
});
// Retrieves all Events from a given User
exports.getUserFolderNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const getUserId = 'Select * from timef_users where userName = ?';
    const getFolderEvents = `Select * from timef_notes natural join timef_folder_notes
            natural join timef_folders where userId = ?`;
    const [uId] = yield db.executeSQLCommand(getUserId, [userName]);
    const [userFolderNotes] = yield db.executeSQLCommand(getFolderEvents, [uId[0].userId]);
    res.json(userFolderNotes);
});
// ## ------------- POST ------------- ##
// ======================================
exports.addFolderEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { eventId, folderName } = req.body;
    const getUserId = `Select * from timef_users where userName = ?`;
    const getFolderId = `Select folderId from timef_folders where folderName = ? and userId = ?`;
    const addFolderEvent = `Insert into timef_folder_events(folderId, eventID) values((${getFolderId}), ?)`;
    const [uId] = yield db.executeSQLCommand(getUserId, [userName]);
    db.executeSQLCommand(addFolderEvent, [folderName, uId[0].userId, eventId]);
    const getFolderEvents = `Select * from timef_events natural join timef_folder_events
        natural join timef_folders where userId = ?`;
    const [userFolderEvents] = yield db.executeSQLCommand(getFolderEvents, [uId[0].userId]);
    res.json(userFolderEvents);
});
exports.addFolderNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { noteId, folderName } = req.body;
    const getUserId = `Select * from timef_users where userName = ?`;
    const getFolderId = `Select folderId from timef_folders where folderName = ? and userId = ?`;
    const addFolderEvent = `Insert into timef_folder_notes(folderId, noteID) values((${getFolderId}), ?)`;
    const [uId] = yield db.executeSQLCommand(getUserId, [userName]);
    const insert = yield db.executeSQLCommand(addFolderEvent, [folderName, uId[0].userId, noteId]);
    const getFolderNotes = `Select * from timef_notes natural join timef_folder_notes
            natural join timef_folders where userId = ?`;
    const [userFolderNotes] = yield db.executeSQLCommand(getFolderNotes, [uId[0].userId]);
    res.json(userFolderNotes);
});
exports.createFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { folderName } = req.body;
    const getUserId = `Select * from timef_users where userName = ?`;
    const createFolder = `Insert into timef_folders(userId, folderName) values(?,?)`;
    const [uId] = yield db.executeSQLCommand(getUserId, [userName]);
    const insert = yield db.executeSQLCommand(createFolder, [uId[0].userId, folderName]);
    const getFolders = `Select * from timef_users natural join timef_folders where
    userName = ?`;
    const [userFolders] = yield db.executeSQLCommand(getFolders, [userName]);
    res.json(userFolders);
});
// ## ------------- DELETE ------------- ##
// ========================================
exports.removeFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { folderName } = req.body;
});
exports.removeNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { noteId, folderName } = req.body;
});
exports.removeEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { eventId, folderName } = req.body;
});
