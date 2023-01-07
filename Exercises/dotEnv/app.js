/*
    .ENV
        - Used to store config or settings fo your app
        - Example: API Keys, JWT Auth Keys and Database Keys
        - Helps you to make the application support to various environments
*/

require('dotenv').config();

console.log(process.env.JWT_AUTH_KEY);