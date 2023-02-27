require('dotenv').config({});
import express, { Request, Response } from 'express'
import io from './routes/socket_routes/index'
import httpStatus from 'http-status';
import { ENV_VARIABLES, } from "./config";
import { errorMiddleware } from './middleware';
import db from './models/report_models';
import router from './routes';
import { ApiError } from './utils';
import swaggerDef from './docs/swaggerDef';
import cors from 'cors';

const allowedMethods = ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"];
const allowedOrigins = [
  "http://localhost:8088",
  "http://localhost:3000",
];

const app = express();

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express');

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: allowedMethods,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-CSRF-TOKEN"],
  credentials: true,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const specs = swaggerJsdoc({ definition: swaggerDef.definition, apis: ["src/docs/*.yml", "src/routes/*.ts"] })



(<any>db).sequelize.sync().then(() => {
  console.log("Synced and connected to db");
}).catch((err: any) => console.log(err.message));


async function bootstrap() {
  /**
 * Add external services init as async operations (db, redis, etc...)
 * e.g.
 * await sequelize.authenticate()
 */
  const server = app.listen(ENV_VARIABLES.PORT, () => {
    console.log(`Application listening at http://localhost:${ENV_VARIABLES.PORT}`);
  })
  return server;
}

bootstrap()
  .then(server => {
    io.attach(server, {
      cors: {
        origin: "*",
      }
    });

    app.use((req, res, next) => {
      (<any>req).io = io;
      next()
    })


    app.get("/health", (req: Request, res: Response) => {
      return res.sendStatus(200).send('OK');
    });
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs))
    app.use('/api/v1', router);
    app.get('/error', () => {
      throw new Error('Boom!');
    });

    app.all('*', (req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, `Can't find ${req.originalUrl} on this server!`))
    });

    // Convert error to ApiError, as required
    app.use(errorMiddleware.errorConverter);
    // Handle errors
    app.use(errorMiddleware.errorHandler);
  })
  .catch(error => {
    setImmediate(() => {
      console.error('Server Error:');
      logger.error(error);
      process.exit();
    });
  });



export default app;