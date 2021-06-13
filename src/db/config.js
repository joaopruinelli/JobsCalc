const sqlite3 = require('sqlite3') // we will use everything
const { open } = require('sqlite') // we will only use some function (open)

// open needs to be in a function structure
module.exports = () => open({ // opening database connection
    filename: './database.sqlite',
    driver: sqlite3.Database // organizes and stores the information in the filename
})
 