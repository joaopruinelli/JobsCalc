const Job = require('../model/Job')
const JobUtils = require('../Utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {
        return res.render('job')
    },

    async save(req, res) {
        // req.body return => body: {name: 'João Vitor Pruinelli', 'daily-hours': '3', 'total-hours': '5'}
        await Job.create({ 
            name: req.body.name,
            "daily-hours": req.body["daily-hours"], 
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // assign a new date
        })
    
        return res.redirect('/')
    }, 

    async show(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        const jobId = req.params.id // catch the param id of URL
        // It will do a check on each data and when it finds the right one it will put it in job
        const job = jobs.find(job => Number(job.id) === Number(jobId)) // It is like forEach, but run a function

        if (!job) {
            return res.send('Job not found!')
        }
        
        job.budget = JobUtils.calculateDudget(job, profile["value-hour"])

        return res.render('job-edit', { job })
    },

    async update(req, res) {
        const jobId = req.params.id // catch the param id of URL
        
        const updatedJob = { // catch datas in job-edit (job:id now) and updating this
            name: req.body.name, // redefine name, for example
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }
        
        await Job.update(updatedJob, jobId)

        res.redirect('/job/' + jobId) // redirect to same page (does not change anything, just saves data)
    },

    async delete(req, res) {
        const jobId = req.params.id // catch the param id of URL

        await Job.delete(jobId)

        return res.redirect('/')
    }
}