const mongoose =require('mongoose')
const moment = require('moment');

// Users should be able to create tasks with a title and description.
// Users should be able to view a list of all tasks.
// Users should be able to mark tasks as completed.
// Users should be able to edit task details.
// Users should be able to delete tasks.




const taskSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['completed','pending'],
        default:'pending'
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    duedate: {
        type: String, // Change to String to store formatted date
        validate: {
            validator: function (value) {
                const date = moment(value, 'DD-MM-YYYY', true);
                return date.isValid() && date.isSameOrAfter(moment(), 'day'); 
            },
            message: 'Due date must be in the format DD-MM-YYYY and cannot be in the past.',
        },
    },

})


const  Task =mongoose.model('Task',taskSchema )


module.exports=Task