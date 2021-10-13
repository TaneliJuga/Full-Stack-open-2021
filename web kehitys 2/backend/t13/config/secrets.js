const dotenv = require('dotenv').config();

console.log("dotenv ", dotenv)
module.exports = {
    jwtSecret: process.env.JWT_SECRET
}