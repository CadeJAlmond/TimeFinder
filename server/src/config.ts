import dotenv from 'dotenv'

dotenv.config({path: "./config.env"})

const MYSQL_USER = process.env.MYSQL_HOST
const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_PSW  = process.env.MYSQL_PSW
const MYSQL_DB   = process.env.MYSQL_DB

console.log(process.env)