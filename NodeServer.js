import express from 'express';

const port = process.env.PORT || 5000

const app  = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

let posts = [
    { id: 1, title: "Post One" },
    { id: 2, title: "Post Two" },
    { id: 3, title: "Post Three" },
    { id: 4, title: "Post Four" },
  ];

  


app.listen(port,()=>{
    console.log(`Server Started on Port ${port}`)
})