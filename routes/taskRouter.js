const express = require('express');
const { createTask, updateStatus, updateTask, deleteTask } = require('../controller/taskController');

const taskRoute = express.Router();

taskRoute.post('/task', createTask);
// taskRoute.get('/task',getAllTask)
taskRoute.patch('/task/status',updateStatus)
taskRoute.patch('/task',updateTask)
taskRoute.delete('/task/:taskId',deleteTask)

module.exports = taskRoute;
