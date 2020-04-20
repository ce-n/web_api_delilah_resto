const express = require('express')
const router = express.Router()
const sequelize = require('../../database/dataBase_connection')
const clientOrderQueries = require('./clientOrders_controller')
const userVerfication = require('../../middleware/authentication')

router
    .route('/')
    .get(userVerfication.adminAuthentication, async(req, res) => {
        const client_order = await clientOrderQueries.getAllClientsOrders(sequelize)

        res.status(200).json({
            message: 'Successful operation',
            all_users_orders: client_order
        })

    })
    .post(async(req, res) => {
        try {
            const header_authorization = req.headers.authorization

            if (!header_authorization) {
                return res.status(402).send({ error: 'Bad request', message: 'Header information is missing' })
            }

            const token_data = userVerfication.getUserDataFromToken(header_authorization)
            const user_id = token_data.userID
            const body_data = req.body

            const client_order_data = {
                hour: body_data.hour,
                user_id: user_id,
                status_id: body_data.status_id,
                payment_id: body_data.payment_id,
                product_id: body_data.product_id,
                number_of_unit: body_data.number_of_unit
            }

            const response = await clientOrderQueries.insertNewClientOrder(sequelize, client_order_data)
            if (response) {
                res.status(201).json({
                    message: 'Successful operation. Order created',
                    client_order_information: response
                })

            } else {
                return res.status(402).send({ error: 'Bad request', message: 'Body information is missing' })
            }

        } catch (error) {
            res.status(500).json({ message: 'Error en el server' })
        }
    })

router
    .route('/:id')
    .put(userVerfication.adminAuthentication, async(req, res) => {
        const id = parseInt(req.params.id)

        if (!isNaN(id)) {
            try {
                const client_order_data = req.body
                if (Object.entries(client_order_data).length === 0) {
                    res.sendStatus(400)
                } else {
                    await clientOrderQueries.updateClientOrderById(sequelize, id, client_order_data)
                    res.status(200).json({ message: 'Order updated', client_order: client_order_data })
                }

            } catch (error) {
                res.sendStatus(500).json({ message: error })
            }
        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })
    .delete(userVerfication.adminAuthentication, async(req, res) => {
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
    .put(userVerfication.adminAuthentication, async(req, res) => {
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
    .get(userVerfication.adminAuthentication, async(req, res) => {
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
    .route('/user/:userid/detail/:orderid')
    .get(userVerfication.userAuthentication, async(req, res) => {
        const userID = parseInt(req.params.userid)
        const orderID = parseInt(req.params.orderid)

        if (!isNaN(userID) && !isNaN(orderID)) {
            try {
                const response = await clientOrderQueries.getClientOrderFilterByClientIdAndOrderId(sequelize, userID, orderID)
                if (response.length) {
                    return res.status(200).json({ message: 'Order filter by user id and order id', client_order: response })
                } else {
                    return res.status(404).json({ message: 'There is not match with userID or orderID' })
                }

            } catch (error) {
                res.sendStatus(500).json({ message: error })
            }
        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router