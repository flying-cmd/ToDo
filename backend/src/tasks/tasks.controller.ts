import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    // Declare a variable to hold all tasks
    let allTasks: Task[];

    // Fetch all tasks using the repository
    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      // Convert the tasks instance to an array of pbjects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.send(allTasks).status(200);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Internal Server Error' });
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    // Create a new instance of the Task
    const task = new Task();

    // Add the required properties to the task
    task.title = req.body.title;
    task.date = req.body.date;
    task.description = req.body.description;
    task.priority = req.body.priority;
    task.status = req.body.status;

    // Save the task to the database
    let createdTask: Task;
    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(task);

      // Convert the task instance to an object
      createdTask = instanceToPlain(createdTask) as Task;

      return res.status(201).json(createdTask);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Internal Server Error' });
    }
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(
        Task,
      ).findOne({
        where: {
          id: req.body.id,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Internal Server Error' });
    }

    if (!task) {
      return res.status(404).json({
        error: 'The task with given id was not found',
      });
    }

    let updatedTask: UpdateResult;
    try {
      updatedTask = await AppDataSource.getRepository(
        Task,
      ).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status }),
      );

      updatedTask = instanceToPlain(
        updatedTask,
      ) as UpdateResult;
      return res.status(200).json(updatedTask);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Internal Server Error' });
    }
  }
}

export const taskController = new TasksController();
