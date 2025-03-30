import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is required')
    .trim()
    .isString()
    .withMessage('The task title must be in text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task data is required')
    .trim()
    .isString()
    .withMessage('The task data must be a valid date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('The task description must be in text format'),
  body('priority')
    .trim()
    .isIn(Object.values(Priority))
    .withMessage('The task priority must be high, normal or low'),
  body('status')
    .trim()
    .isIn(Object.values(Status))
    .withMessage('The task status must be todo, inProgress or completed'),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is required')
    .trim()
    .isString()
    .withMessage('The task id must be in text format'),
  body('status')
    .trim()
    .isIn(Object.values(Status))
    .withMessage('The task status must be todo, inProgress or completed'),
];