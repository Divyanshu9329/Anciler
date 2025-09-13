const express = require ("express");

const app = express();

const Students= [ 
    { id: 1, name: "string", email: "string" }
]

const courses = [ 
    { id: 1, title: "string", capacity: 100, enrolledCount: 12 }
]

//POST /students: Create a new student
app.post("/students:",(req,res)=>{
    const {name, email} = req.body;

    if(!input){
        return res.status(400).json({error:"Entery is required"})
    }

    const newItem = {
        id: Students.lenght +1,
        name:name,
        email: email
    };

    Students.push(newItem);
    res.status(200).json(newItem);
})

//POST /courses: Create a new course with a capacity limit.
//{ id: 1, title: "string", capacity: 100, enrolledCount: 12 }
app.post("/courses:",(req,res)=>{
    const {title, capacity, enrolledCount} = req.body;

    if(!input){
        return res.status(400).json({error:"Entery is required"})
    }

    const newItem = {
        id: Students.lenght +1,
        title: title,
        capacity: capacity,
        enrolledCount: enrolledCount
    };

    courses.push(newItem);
    res.status(200).json(newItem);
})

// POST /enroll: Enroll a student in a course.
// Reject if enrolledCount >= capacity.
// Increment enrolledCount on success.


app.listen(5000, ()=>{
    console.log("Server is running on http://localhost:5000")
})