import { Sequelize } from "sequelize";
import dbconfig from './db.config.js'
console.log(process.env)
const sequelize = new Sequelize('tanks', dbconfig.DB_USER, dbconfig.DB_PASSWORD, {
    host: dbconfig.DB_HOST,
    dialect: 'mariadb',
    password: dbconfig.DB_PASSWORD
})

sequelize.authenticate().catch(error => {
    console.log(error)
})

sequelize.sync().catch(error => {
    console.log(error)
})

export default sequelize