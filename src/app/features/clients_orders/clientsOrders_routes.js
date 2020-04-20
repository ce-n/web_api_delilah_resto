const express = require('express')
const router = express.Router()
const sequelize = require('../../database/dataBase_connection')
const clientOrderQueries = require('./clientOrders_controller')

router
    .route('/')
    .get(async(req, res) => {
        const clientOrder = await clientOrderQueries.getAllClientsOrders(sequelize)
        console.log(clientOrder)
        res.send(clientOrder)
    })
    .post(async(req, res) => {
        try {
            const clientOrder = req.body
            const response = await clientOrderQueries.insertNewClientOrder(sequelize, clientOrder)
            res.status(201).json({
                message: 'Successful operation. Order created',
                client_order_id: response
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
                const clientOrderData = req.body
                if (Object.entries(clientOrderData).length === 0) {
                    res.sendStatus(400)
                } else {
                    await clientOrderQueries.updateClientOrderById(sequelize, id, clientOrderData)
                    res.status(200).json({ message: 'Order updated', client_order: clientOrderData })
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
                await clientOrderQueries.deleteClientOrderById(sequelize, id)
                res.status(200).json({ message: 'The order has been deleted' })
            } catch (error) {
                res.status(500).json({ message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })
router
    .route('/status/:id')
    .put(async(req, res) => {
        const id = parseInt(req.params.id)
        const status = req.body.status_id

        if (!isNaN(id)) {
            try {
                await clientOrderQueries.updateClientOrderStatusById(sequelize, id, status)
                res.status(200).json({ message: 'Order status updated', order_id: id, status: status })

            } catch (error) {
                res.sendStatus(500).json({ message: error })
            }
        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })
router
    .route('/detail/:id')
    .get(async(req, res) => {
        const id = parseInt(req.params.id)

        if (!isNaN(id)) {
            try {
                const clientOrderFilterById = await clientOrderQueries.getClientOrderById(sequelize, id)
                res.status(200).json({ message: 'Order filter by id', client_order: clientOrderFilterById })

            } catch (error) {
                res.sendStatus(500).json({ message: error })
            }
        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

router
    .route('/user/detail/:userid/:orderid')
    .get(async(req, res) => {
        const userID = parseInt(req.params.userid)
        const orderID = parseInt(req.params.orderid)

        if (!isNaN(userID || orderID)) {
            try {
                const clientOrderFilterByClientIdAndOrderId = await clientOrderQueries.getClientOrderFilterByClientIdAndOrderId(sequelize, userID, orderID)
                res.status(200).json({ message: 'Order filter by user id and order id', client_order: clientOrderFilterByClientIdAndOrderId })

            } catch (error) {
                res.sendStatus(500).json({ message: error })
            }
        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router