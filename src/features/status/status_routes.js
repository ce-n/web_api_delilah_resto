const express = require('express')
const router = express.Router()
const sequelize = require('../../dataBase_connection')
const statusQueries = require('./status_controller')

router
    .route('/')
    .get(async(req, res) => {
        try {
            const status = await statusQueries.getAllStatus(sequelize)
            console.log(status)
            res.send(status)
        } catch (error) {
            res.status(500).json({ error: errorMessage, message: error })
        }

    })
    .post(async(req, res) => {
        try {
            const status = req.body
            await statusQueries.insertNewStatus(sequelize, status)
            res.status(201).json({ message: 'Successful operation. Status created' })
        } catch (error) {
            res.status(500).json({ error: errorMessage, message: error })
        }
    })

router
    .route('/:id')
    .put(async(req, res) => {
        const id = parseInt(req.params.id)

        if (!isNaN(id)) {
            try {
                const statusData = req.body
                if (Object.entries(statusData).length === 0) {
                    res.sendStatus(400)
                } else {
                    await statusQueries.updateStatusByID(sequelize, id, statusData)
                    res.status(200).json({ message: 'Satus updated', status: statusData })
                }

            } catch (error) {
                res.sendStatus(500).json({ message: error })
            }
        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })
    .delete(async(req, res) => {
        const id = parseInt(req.params.id)
        if (!isNaN(id)) {
            try {
                await statusQueries.deleteStatusById(sequelize, id)
                res.status(200).json({ message: 'The status has been deleted' })
            } catch (error) {
                res.status(500).json({ error: errorMessage, message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router