import dbConfig from "../../config/db.config";

import {Sequelize , Dialect} from 'sequelize';
import Test from './test.model';
import Order from './order.model';
import Report from './report.model';



const sequelize = new Sequelize((<any>dbConfig).DB, (<any>dbConfig).USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: (<any>dbConfig).PORT,
  dialect: (<any>dbConfig).dialect as Dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

(<any>db).Sequelize = Sequelize;
(<any>db).sequelize = sequelize;

(<any>db).test = Test(sequelize, Sequelize);
(<any>db).order = Order(sequelize, Sequelize);
(<any>db).report = Report(sequelize, Sequelize);

export default db;