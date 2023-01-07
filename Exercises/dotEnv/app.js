/*
    .ENV
        - Used to store config or settings fo your app
        - Example: API Keys, JWT Auth Keys and Database Keys
        - Helps you to make the application support to various environments
*/

/*
Inside the .env file store the required KEY
`JWT_AUTH_KEY=00x84d`
*/

require('dotenv').config();

// Fetch the value
console.log(process.env.JWT_AUTH_KEY);