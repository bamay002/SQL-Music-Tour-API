const bands = require('express').Router();
const db = require('../models');
const { Band } = db;

bands.get('/', async (req, res) => {
    try{
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch(e){
        res.status(500).json(e)
    }
})

bands.get('/:id', async (req, res) => {
    const {id } = req.params;
    try{
        const foundBand = await Band.findOne({
            where: { band_id: id }
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
