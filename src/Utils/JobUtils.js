module.exports = {
    remainingDays(job) {
        // calculate time left
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // dias restantes, how many days left to finish the job (rounded)
    
        const createdDate = new Date(job.created_at) // turns milliseconds into a month day
        const dueDay = createdDate.getDate() + Number(remainingDays) // month day + dias restantes
        const dueDateInMs = createdDate.setDate(dueDay) // data de vencimento in milliseconds (create)
            
        const timeDiffInMs = dueDateInMs - Date.now() // difference of days in milliseconds 
        const daysInMs = 1000 * 60 * 60 * 24 // transform milliseconds to days
        const dayDiff = Math.floor(timeDiffInMs / daysInMs) // difference of days in days rounded down
    
        return dayDiff // return remainingDays (diferença de dias)
    },

    calculateDudget: (job, valueHour) => valueHour * job["total-hours"]
}
