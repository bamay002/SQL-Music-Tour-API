const events = require('express').Router();
const db = require('../models');
const { Event } = db;
const { Op } = require('sequelize')

events.get('/', async (req, res) => {
    try{
        const searchTerm = req.query.name ? req.query.name : ''
        const foundEvent = await Event.findAll({
        order: [
            ['name', 'ASC']
        ], where : {
            name: {
                [Op.iLike] : `%${searchTerm}%`
            }
        }
        })
        res.status(200).json(foundEvent)
    } catch(e){
        res.status(500).json({message : `error with get`})
    }
})

events.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const foundEvent = await Event.findOne({
            where: { event_id: id }
        })
        if (!foundEvent){
            res.status(404).json({ message: 'Could not find EVENT'})
        } else{
        res.status(200).json(foundEvent)
        }
    } catch(e){
        res.status(500).json(e)
    }
})

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Sucessfully created new event',
            data: newEvent
        })
    } catch(e){
        res.status(500).json(e)
    }
})

events.put('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const updateEvent = await Event.update(req.body, {
            where: { event_id: id }
        })
        res.status(200).json({ message : `Sucessfully updated ${updateEvent} event(s)`})
    } catch(e){
        res.status(500).json(e)
    }
})

events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = events;