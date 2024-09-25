const express = require('express')
const { connectToDB,getDb }  = require('./db');
const { ObjectId } = require('mongodb');
let db;
// init  app 
const app = express()

// db connection 
connectToDB((err)=>{
    if (!err){
        app.listen(3000,()=>{
            console.log('App is connected on port 3000')
        })
    }
    db = getDb()
})

app.get('/students',(req,res)=>{
    students =[]

    db.collection("students")
    .find()
    .sort({firstName:1})
    .forEach(student => 
        students.push(student)
    ).then(()=>{
        res.status(200).json({students})
    }).catch((error)=>{
        res.status(500).json({error: error})
    })
})

app.get('/students/:id',(req,res)=>{
    if (ObjectId.isValid(req.params.id)){
        db.collection('students').findOne(_id = new ObjectId(req.params.id))
        .then((student)=>{
            res.status(200).json({student})
        }).catch((error)=>{
            res.status(500).json({error:error})
        })
    }else{
        res.status(500).json({error: "Id is not valid"})
    }
})