const bands = require('express').Router();
const db = require('../models');
const { Band, MeetGreet, Events, SetTime} = db;
const { Op } = require('sequelize')

bands.get('/', async (req, res) => {
    try{
        const searchTerm = req.query.name ? req.query.name : ''
        const foundBands = await Band.findAll({
        order: [
            ['available_start_time', 'ASC'],
            ['name', 'ASC']
        ], where : {
            name: {
                [Op.iLike] : `%${searchTerm}%`
            }
        }
        })
        res.status(200).json(foundBands)
    } catch(e){
        res.status(500).json(e)
    }
})

bands.get('/:name', async (req, res) => {
    const { name } = req.params;
    const { eventName } = req.query 
    try{
        const foundBand = await Band.findOne({
            where: { name },
            include : [
                {
                    model: MeetGreet,
                    as : 'meetings',
                    include : {
                        model : Events,
                        as : 'event',
                        where : {
                            name: {
                                [Op.iLike] : `%${eventName}%`
                            }
                        }
                    },
                },
                {
                    model : SetTime,
                    as : 'set_times',
                    include : {
                        model: Events,
                        as : 'events',
                        where : {
                            name: {
                                [Op.iLike] : `%${eventName}%`
                            }
                        }
                    }
                }
            ]
        })
        if (!foundBand){
            res.status(404).json({ message: 'Could not find BAND'})
        } else{
        res.status(200).json(foundBand)
        }
    } catch(e){
        res.status(500).json(e)
    }
})

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(200).json({
            message: 'Sucessfully created new band',
            data: newBand
        })
    } catch(e){
        res.status(500).json(e)
    }
})

bands.put('/:id', async (req, res) => {
    const {id } = req.params;
    try{
        const updateBand = await Band.update(req.body, {
            where: { band_id: id }
        })
        res.status(200).json({ message : `Sucessfully updated ${updateBand} band(s)`})
    } catch(e){
        res.status(500).json(e)
    }
})

bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = bands;
