const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();

const port = process.env.PORT || 7777

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.router = new express.Router



app.listen(port, () => {
    console.log('Server is listening on port', port)
})