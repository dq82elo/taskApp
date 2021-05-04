const Task = require('../models/task')
const express = require('express')
const router = new express.Router()

router.post('/tasks', async (req,res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id 
    try {
        const task = await Task.findById(_id)
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowUpdates = ['description', 'completed'] 
    const isValidOperation = updates.every((update) => allowUpdates.includes(update))
    console.log(isValidOperation)
    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        console.log(req.params.id)
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        console.log(task)
        if(!task) {
            return res.status(404).send()
        } 
        res.send(task)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send()
        } else {
            res.send(task)
        }
    } catch(error) {
        res.status(500).send(error)
    }
})

module.exports = router