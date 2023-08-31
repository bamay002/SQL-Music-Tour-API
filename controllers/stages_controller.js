const stages = require('express').Router();
const db = require('../models');
const { Stage } = db;
const { Op } = require('sequelize')

stages.get('/', async (req, res) => {
    try{
        const searchTerm = req.query.name ? req.query.name : ''
        const foundStages = await Stage.findAll({
        order: [
            ['name', 'ASC']
        ], where : {
            name: {
                [Op.iLike] : `%${searchTerm}%`
            }
        }
        })
        res.status(200).json(foundStages)
    } catch(e){
        res.status(500).json(e)
    }
})

stages.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const foundStage = await Stage.findOne({
            where: { stage_id: id }
        })
        if (!foundStage){
            res.status(404).json({ message: 'Could not find STAGE'})
        } else{
        res.status(200).json(foundStage)
        }
    } catch(e){
        res.status(500).json(e)
    }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Sucessfully created new stage',
            data: newStage
        })
    } catch(e){
        res.status(500).json(e)
    }
})

stages.put('/:id', async (req, res) => {
    const {id } = req.params;
    try{
        const updateStage = await Stage.update(req.body, {
            where: { stage_id: id }
        })
        res.status(200).json({ message : `Sucessfully updated ${updateStage} stage(s)`})
    } catch(e){
        res.status(500).json(e)
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stages(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = stages;
