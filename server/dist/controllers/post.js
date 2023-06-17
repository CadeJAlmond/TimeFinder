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
// Adds a post to the database
exports.addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const { foodTitle, foodInstr, foodImg, cost, time } = req.body;
    const post = yield db.createPost(userName, foodTitle, foodInstr, foodImg, cost, time);
    res.json(post);
});
exports.getAllUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.params.username;
    const posts = yield db.getAllUserPosts(userName);
    res.json(posts);
});
exports.getUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, postTitle } = req.body;
    const posts = yield db.getUserPost(userName, postTitle);
    res.json(posts);
});
// Retrieve the elements for the home page
exports.getHomePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
// Updates a users post
exports.updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("hello running");
});
