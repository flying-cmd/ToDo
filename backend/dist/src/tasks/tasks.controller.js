"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const class_transformer_1 = require("class-transformer");
const index_1 = require("../../index");
const tasks_entity_1 = require("./tasks.entity");
const express_validator_1 = require("express-validator");
class TasksController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Declare a variable to hold all tasks
            let allTasks;
            // Fetch all tasks using the repository
            try {
                allTasks = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).find({
                    order: {
                        date: 'ASC',
                    },
                });
                // Convert the tasks instance to an array of pbjects
                allTasks = (0, class_transformer_1.instanceToPlain)(allTasks);
                return res.send(allTasks).status(200);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: 'Internal Server Error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: errors.array() });
            }
            // Create a new instance of the Task
            const task = new tasks_entity_1.Task();
            // Add the required properties to the task
            task.title = req.body.title;
            task.date = req.body.date;
            task.description = req.body.description;
            task.priority = req.body.priority;
            task.status = req.body.status;
            // Save the task to the database
            let createdTask;
            try {
                createdTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).save(task);
                // Convert the task instance to an object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.status(201).json(createdTask);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: 'Internal Server Error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: errors.array() });
            }
            let task;
            try {
                task = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).findOne({
                    where: {
                        id: req.body.id,
                    },
                });
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: 'Internal Server Error' });
            }
            if (!task) {
                return res.status(404).json({
                    error: 'The task with given id was not found',
                });
            }
            let updatedTask;
            try {
                updatedTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).update(req.body.id, (0, class_transformer_1.plainToInstance)(tasks_entity_1.Task, { status: req.body.status }));
                updatedTask = (0, class_transformer_1.instanceToPlain)(updatedTask);
                return res.status(200).json(updatedTask);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.taskController = new TasksController();
