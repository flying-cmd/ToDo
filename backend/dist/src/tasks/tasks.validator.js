"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const Priority_1 = require("../enums/Priority");
const Status_1 = require("../enums/Status");
exports.createValidator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage('The task title is required')
        .trim()
        .isString()
        .withMessage('The task title must be in text format'),
    (0, express_validator_1.body)('date')
        .not()
        .isEmpty()
        .withMessage('The task data is required')
        .trim()
        .isString()
        .withMessage('The task data must be a valid date format'),
    (0, express_validator_1.body)('description')
        .trim()
        .isString()
        .withMessage('The task description must be in text format'),
    (0, express_validator_1.body)('priority')
        .trim()
        .isIn(Object.values(Priority_1.Priority))
        .withMessage('The task priority must be high, normal or low'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn(Object.values(Status_1.Status))
        .withMessage('The task status must be todo, inProgress or completed'),
];
exports.updateValidator = [
    (0, express_validator_1.body)('id')
        .not()
        .isEmpty()
        .withMessage('The task id is required')
        .trim()
        .isString()
        .withMessage('The task id must be in text format'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn(Object.values(Status_1.Status))
        .withMessage('The task status must be todo, inProgress or completed'),
];
