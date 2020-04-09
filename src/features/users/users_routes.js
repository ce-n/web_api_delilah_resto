const express = require('express')
const router = express.Router()
const sequelize = require('../../dataBase_connection')
const querys = require('./users_controller')

const errorMessage = 'Something went wrong. Please retry or contact with an admin.'

router
    .route('/')
    .get(async(req, res) => {
        try {
            const users = await querys.getAllUsers(sequelize)
            console.log(users)
            res.send(users)
        } catch (error) {
            res.status(500).json({ error: errorMessage, message: error })
        }

    })
    .post(async(req, res) => {
        try {
            const user = req.body
            await querys.insertNewProduct(sequelize, user)
                //console.log(user)
            res.status(201).json({ message: 'Successful operation. User created' })
        } catch (error) {
            //console.log(error)
            res.status(500).json({ error: errorMessage, message: error })
        }
    })
    .put((req, res) => {
        try {
            res.send('actualizar productos')

        } catch (error) {
            res.status(500).json({ error: errorMessage, message: error })
        }
    })
    .delete((req, res) => {
        try {
            res.send('borrar producto')

        } catch (error) {
            res.status(500).json({ error: errorMessage, message: error })
        }
    })

module.exports = router