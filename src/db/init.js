const Database = require('./config') // calls the config file


const initDb = {
    async init() {
        // create the const just here cuz use his data in all
        const db = await Database() // open the Database (connection)

        // takes the command and executes within the database (creates the database)
        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`)

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "João Vitor Pruinelli",
            "http://instagram.fxap5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/96065401_234779991284195_4120186728625471488_n.jpg?tp=1&_nc_ht=instagram.fxap5-1.fna.fbcdn.net&_nc_ohc=ITclQHwM9osAX-wNNcM&edm=ABfd0MgAAAAA&ccb=7-4&oh=6f289015c6a660b7bf8ed601dc2fca27&oe=608F79DA&_nc_sid=7bff83",
            3000,
            5,
            5,
            4,
            75
        );`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        );`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Projects",
            3,
            47,
            1617514376018
        );`)

        await db.close() // close the Database (connection)
    }
}

initDb.init()

/*
    > await: wait for the function to end the connection and needs to be inside the async function
    > async: tells JS that within the function it has awaits, that is, the function is asynchronous (not common)
    > what's inside the "crases" (``) can use this type of code in any SQL-based database
    > PRIMARY KEY AUTOINCREMENT - chave primária adicionada automaticamente 
      (it will always increase 1 id automatically, if it already has 1, it does ++ and puts a 2)
      It is like the CPF, information identifier number
*/
