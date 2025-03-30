import express, {
  Express,
} from 'express';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';

// Instantiate express app
const app: Express = express();
dotenv.config();

// Parse request Body
app.use(bodyParser.json());

// Use CORS install types as well
app.use(cors());

// Create Database Connection
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

// Define sever port
const port = process.env.PORT;

// Initialize Database Connection
AppDataSource.initialize()
  .then(() => {
    // Start listenting to the requests on the defined port
    app.listen(port);
    console.log(
      'Database Connection has been established successfully.',
    );
  })
  .catch((error) => console.log(error));

app.use('/', tasksRouter);