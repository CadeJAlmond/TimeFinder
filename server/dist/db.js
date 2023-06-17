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
const dotenv_1 = __importDefault(require("dotenv"));
const mysql = require('mysql2');
dotenv_1.default.config({ path: './config.env' });
const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PSW,
    database: process.env.MYSQL_DB
}).promise();
exports.executeSQLCommand = (commandStr, values) => __awaiter(void 0, void 0, void 0, function* () { return yield db.query(commandStr, values); });
exports.selectUserInfo = 'Select email, userIcon, userId, userName, userYearlyGoal, bio, colorTheme';
exports.selectNotes = `Select userName, noteTitle, noteContent, userId, userYearlyGoal, email, noteId`;
exports.selectEvents = `Select userId, eventID, eventName, eventDescription, eventColor, 
    eventPriority, eventCreationDate, eventDueDate`;
exports.selectSearchedUser = `Select bio, email, friendId, userIcon, userId, userId1, userId2, userName`;
// ## ------------- Users ------------- ##
// =======================================
// ## ------------- EVENTS ------------- ##
// ========================================
// DONE
exports.updateEvent = (eventTitle, eventDesc, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const createPost = `UPDATE timef_events SET eventDescription = ? where eventID = 14`;
});
// ## ------------- NOTES ------------- ##
// =======================================
// ## ------------- AUTH ------------- ##
// ======================================
