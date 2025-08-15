import { Sequelize } from "sequelize";

const sequelize = new Sequelize('api_nodejs','root','admin',{
  dialect: 'mysql', // Change to 'mysql' for MySQL database
  host: 'localhost',
//   storage: './database.sqlite',
//   logging: false, // Disable logging for cleaner output
});

export default sequelize;