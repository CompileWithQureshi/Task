const express = require("express");
const connectDB = require("./db/dbConnect");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRouter");
const Task =require('./model/taskModel')

const path = require('path');
require('dotenv').config();


const app=express()
const PORT=8005
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use('/v1',userRoute,taskRoute)


app.get('/',(req,res)=>{
    res.render("index", { title: "Home Page", message: "Welcome to EJS!" });
})
app.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.render('task', { 
            title: 'Task Management', 
            tasks: tasks  
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
});




app.listen(PORT, async() => {
    try {
        await connectDB();
            console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1); // Exit the process on database connection failure
    }
});
