const express = require('express')
const router = express.Router()
const sequelize = require('../../database/dataBase_connection')
const detailtOrderQueries = require('./detailOrders_controller')

router
    .route('/')
    .get(async(req, res) => {
        const detailOrder = await detailtOrderQueries.getAllDetailOrders(sequelize)
        console.log(detailOrder)
        res.send(detailOrder)
    })
    .post(async(req, res) => {
        try {
            const clientOrderId = req.body
            const response = await detailtOrderQueries.insertNewDetailtOrder(sequelize, clientOrderId)
            res.status(201).json({
                message: 'Successful operation. Detail order created',
                detail_order_id: response
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    })

router
    .route('/:id')
    .put(async(req, res) => {
        const id = parseInt(req.params.id)

        if (!isNaN(id)) {
            try {
                const detailOrderData = req.body.client_order_id
                if (detailOrderData.length === 0) {
                    res.sendStatus(400)
                } else {
                    await detailtOrderQueries.updateDetailOrderById(sequelize, id, detailOrderData)
                    res.status(200).json({ message: 'Detail order updated', detailOrder: detailOrderData })
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
                await detailtOrderQueries.deleteDetailOrderById(sequelize, id)
                res.status(200).json({ message: 'The detail order has been deleted' })
            } catch (error) {
                res.status(500).json({ message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router