const express = require('express') // call library to start the express() as server
const server = express()
const routes = require('./routes') // import routes.js
const path = require('path')


server.set('view engine', 'ejs') // start the ejs engine


server.set('views', path.join(__dirname, 'views')) // change the location of views page, she should be in maratona, not in src


server.use(express.urlencoded({ extended: true })) // enable to use the req.body


server.use(express.static('public')) // habilitar arquivos estatics


server.use(routes) // use the routes of routes.js


server.listen(3000, () => console.log('Rodando')) // open the 3000 door
