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
const selectEvents = db.selectEvents;
// Adds an Event to the database
exports.addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { eventName, eventDesc, eventColor, eventPrio, eventDueDate } = req.body;
    const getUserId = `Select * from timef_users where userName = ?`;
    const createPost = `INSERT INTO timef_events(userId, eventName, eventDescription,
        eventColor, eventPriority, eventDueDate, completed) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    const [uId] = yield db.executeSQLCommand(getUserId, [userName]);
    yield db.executeSQLCommand(createPost, [uId[0].userId,
        eventName, eventDesc, eventColor, eventPrio, eventDueDate, 0]);
    const getEvents = `${selectEvents} from timef_users natural join timef_events where userName =
     ? order by eventDueDate`;
    const [events] = yield db.executeSQLCommand(getEvents, [userName]);
    res.json(events);
});
// Retrieves all Events from a given User
exports.getAllUserEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const getEvents = `${selectEvents} from timef_users natural join timef_events where userName =
     ? order by eventDueDate`;
    const [events] = yield db.executeSQLCommand(getEvents, [userName]);
    res.json(events);
});
// Updates a users post
exports.updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("hello running");
});
