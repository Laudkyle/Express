import express from 'express'
import path from 'path'
import posts from './routes/posts.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notfound.js'

const port = process.env.PORT || 4500
const app = express()

// Setting up the static 
// app.use(express.static(path.join(__dirname,'public')))

app.use(logger)
app.use('/api/posts',posts)
app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

