import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME || 'api_nodejs',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'admin',{
  dialect: 'mysql', 
  host:process.env.DB_HOST|| 'localhost'
//logging: false, // Disable logging for cleaner output
});

export default sequelize;