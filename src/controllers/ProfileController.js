const Profile = require('../model/Profile')

module.exports = { // prepares file for export
    async index(req, res) {
        return res.render('profile', { profile: await Profile.get() })
    },

    async update(req, res) {
        const data = req.body // req.body to get the data

        const weeksPerYear = 52 // define how many weeks has a year
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12 // remove the weeks' vacation of the year, to catch how many weeks has in a month
    
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"] // total hours worked in the week
        const monthlyTotalHours = weekTotalHours * weeksPerMonth // hours working in monthly

        const valueHour = data["valeu-hour"] = data["monthly-budget"] / monthlyTotalHours // what will be the value of my hours

        const profile = await Profile.get()

        await Profile.update({ // updating
            ... profile,
            ...req.body, // the data that are repeated will be updated for the scattering that is below
            "value-hour": valueHour
        })

        res.redirect('/profile')
    }
}