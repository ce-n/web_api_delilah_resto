const express = require('express')
const router = express.Router()
const sequelize = require('../../database/dataBase_connection')
const paymentMethodsQueries = require('./paymentMethods_controller')

router
    .route('/')
    .get(async(req, res) => {
        const payment_methods = await paymentMethodsQueries.getAllPaymentMethod(sequelize)
        console.log(payment_methods)
        res.send(payment_methods)
    })
    .post(async(req, res) => {
        try {
            const payment_method = req.body
            await paymentMethodsQueries.insertNewPaymentMethod(sequelize, payment_method)
            res.status(201).json({ message: 'Successful operation. Payment method created' })
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
                const paymentMethodData = req.body
                if (Object.entries(paymentMethodData).length === 0) {
                    res.sendStatus(400)
                } else {
                    await paymentMethodsQueries.updatePaymentMethodById(sequelize, id, paymentMethodData)
                    res.status(200).json({ message: 'Payment method updated', payment_method: paymentMethodData })
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
                await paymentMethodsQueries.deletePaymentMethodById(sequelize, id)
                res.status(200).json({ message: 'The payment method has been deleted' })
            } catch (error) {
                res.status(500).json({ message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router