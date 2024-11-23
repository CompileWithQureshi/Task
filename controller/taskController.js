const Task =require('../model/taskModel')
const User = require('../model/userModel'); 
const moment = require('moment');


// Users should be able to create tasks with a title and description.

exports.createTask = async (req, res) => {
    const { title, description, status = 'pending', userId, duedate } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: 'Input field is empty',
        });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
            });
        }
        const formattedDate = moment(duedate, 'DD-MM-YYYY', true);
        if (!formattedDate.isValid()) {
            return res.status(400).json({
                message: 'Invalid due date format. Use DD-MM-YYYY.',
            });
        }

        const newTask = new Task({
            title,
            description,
            status,
            userId,
            duedate, // Include the due date here
        });

        const saveTask = await newTask.save();

        if (!saveTask) {
            return res.status(500).json({
                message: 'Something went wrong',
            });
        }

        res.status(201).json({
            message: 'Task Created',
            task: saveTask,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message, // Log the error message for debugging
        });
    }
};


// Users should be able to view a list of all tasks.
// exports.getAllTask=async(req,res)=>{

//     try {
//         const getAll= await Task.find()
//         if (getAll.length ===0) {
//             return res.status(200).json({
//                 message:'No Task available'
//             })
//         }
//         res.status(200).json(
//             {
//                 message:'Data fetched',
//                 task:getAll
//             }
//         )

//         res.render("task",)
//     } catch (error) {
//         res.status(500).json(
//             {
//                 message:'something went wrong'
//             }
//         )
//     }


// }


// Users should be able to mark tasks as completed.
exports.updateStatus=async(req,res)=>{
    const {taskId,status}=req.body
    console.log(req.body);
    
    if (!taskId ) {
        return res.status(400).json(
            {
                message:'taskID or status is required'
            }
        )
    }
    try {
        const task=await Task.findById(taskId)
        if (!task) {
            return res.status(201).json(
                {
                    message:'taskID is invalid'
                }
            )
        }
        // console.log(task.status);
        
        const updateFields = { status };
        const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, { new: true });
        if (!updatedTask) {
            return res.status(500).json({
                message: 'Failed to update task status',
            });
        }
        

        
        res.status(200).json(
            {
                message:'Task status updated successfully',
                task:updatedTask
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}



exports.updateTask=async (req,res) => {
    const {taskId,title,description}=req.body
        if (!taskId && !title && !description) {
        return res.status(400).json({
            message: 'At least one input (taskId, title, or description) is required',
        });
    }

    try {
        const task=await Task.findById(taskId);
        if (!task) {
            return res.status(404).json(
                {
                    message:'taskID is invalid'
                }
            )
        }

        const updateTask={}
        if (title)updateTask.title=title
        if(description)updateTask.description=description
        
        const taskUpdate=await Task.findByIdAndUpdate(taskId,updateTask,{new:true})
        res.status(200).json({
            message: 'Task updated successfully',
            task: taskUpdate,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}
// Users should be able to delete tasks.

exports.deleteTask=async (req,res) => {
    const { taskId } = req.params;
    if (!taskId) {
        return res.status(400).json({
            message: 'Task id is required',
        });
    }

    try {
        const deleteTask=await Task.findByIdAndDelete(taskId)

        res.status(200).json({
            message: 'Task delete successfully',
            task: deleteTask,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
}