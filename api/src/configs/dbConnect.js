import { Sequelize } from "sequelize/types";

const sequelize = new Sequelize('tanks', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb'
})

sequelize.authenticate().catch(error => {
    console.log(error)
})

export default sequelize