const express = require('express') // call library to create the server, express
const routes = express.Router() // execute a method of express as 'route'
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')


routes.get('/', DashboardController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show) // :id
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes // transform into a file for export


/*
    > EJS reads, for default, the views page. 
      But, it din't found the views file in src folder
      For this, it is used res.render(views + 'index'))
    > render() => render the page with ejs, so it isn't used .html
    > GET: get the first agument (putted in the URL) and return: a request (res) or a response (res) of pages
    > POST: send answer form by request. Don't appear in the URL
      it needs to be placed on the form: <form id="form-job" method="post" action="/job">
*/