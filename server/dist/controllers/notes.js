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
const selectNotes = db.selectNotes;
const getNotes = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserNotes = `${selectNotes} from timef_users natural join timef_notes
    where userName = ?`;
    return yield db.executeSQLCommand(getUserNotes, [userName]);
});
// ## ------------- GET ------------- ##
// =====================================
exports.getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const [notes] = yield getNotes(userName);
    res.json(notes);
});
// ## ------------- POST ------------- ##
// ======================================
exports.addNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { noteTitle, noteContent } = req.body;
    const getUserId = `Select * from timef_users where userName = ?`;
    const createPost = `INSERT INTO timef_notes(userId, noteTitle, noteContent)
         VALUES(?, ?, ?)`;
    const [uId] = yield db.executeSQLCommand(getUserId, [userName]);
    const insert = yield db.executeSQLCommand(createPost, [uId[0].userId, noteTitle, noteContent]);
    const [notes] = yield getNotes(userName);
    res.json(notes);
});
exports.updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { noteId, noteTitle, noteContent } = req.body;
    const updateNote = `UPDATE timef_notes SET noteTitle = ?, noteContent = ? where noteId = ?`;
    const update = yield db.executeSQLCommand(updateNote, [noteTitle, noteContent, noteId]);
    const [notes] = yield getNotes(userName);
    res.json(notes);
});
