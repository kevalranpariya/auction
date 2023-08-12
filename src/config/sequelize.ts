import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config();

const { DB_NAME,DB_USER,DB_PASSWORD }:any = process.env;
const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
  dialect: 'postgres',
  port: 5432,
  logging: false
});

sequelize.sync({ alter: true });

export default sequelize;