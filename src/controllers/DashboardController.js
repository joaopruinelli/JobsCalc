const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')


module.exports = {    
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get() // because get() is async

        let statusCount = { // contains the general status of jobs
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => { // map is like forEach, but is used to change the data
            // job setting
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            // sum how many jobs are in progress or done
            statusCount[status] += 1 // statusCount['done'] += 1, for exemple

            // job total hours per day of each job in progress
            status == 'progress'? jobTotalHours += Number(job['daily-hours']) : jobTotalHours

            return {
                ...job, // Take what you had in jobs and add what you have below
                remaining,
                status,
                budget: JobUtils.calculateDudget(job, profile["value-hour"]) // orçamento
            } // return a new object like jobs
        })

        const freeHours = profile["hours-per-day"] - jobTotalHours // number of hours I want to work (profile) LESS number of hours / day of each work in progress

        return res.render('index', { 
            jobs: updatedJobs, 
            profile: profile, 
            statusCount: statusCount,
            freeHours: freeHours
        }) // jobs is a object passed to 'index' - profile: profile or just profile
    }
}

