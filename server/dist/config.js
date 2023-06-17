"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const MYSQL_USER = process.env.MYSQL_HOST;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PSW = process.env.MYSQL_PSW;
const MYSQL_DB = process.env.MYSQL_DB;
console.log(process.env);
