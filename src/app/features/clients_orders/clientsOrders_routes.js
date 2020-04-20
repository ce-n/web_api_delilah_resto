const express = require('express')
const router = express.Router()
const sequelize = require('../../database/dataBase_connection')
const clientOrderQueries = require('./clientOrders_controller')
const userVerfication = require('../../middleware/authentication')

router
    .route('/')
    .get(userVerfication.adminAuthentication, async(req, res) => {
        const clientOrder = await clientOrderQueries.getAllClientsOrders(sequelize)
        console.log(clientOrder)
        res.send(clientOrder)
    })
    .post(async(req, res) => {
        try {
            const headerAuthorization = req.headers.authorization
            const tokenData = userVerfication.getUserDataFromToken(headerAuthorization)
                // console.log(tokenData.userID)

            const userID = tokenData.userID
            const bodyData = req.body
                // console.log('la info del body es ' + bodyData.hour)

            const clientOrderData = {
                hour: bodyData.hour,
                user_id: userID,
                status_id: bodyData.status_id,
                payment_id: bodyData.payment_id,
                product_id: bodyData.product_id,
                number_of_unit: bodyData.number_of_unit
            }

            const response = await clientOrderQueries.insertNewClientOrder(sequelize, clientOrderData)
            res.status(201).json({
                message: 'Successful operation. Order created',
                client_order_id: response
            })

        } catch (error) {
            res.status(500).json({ message: 'Error en el server' })
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