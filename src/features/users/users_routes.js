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
            await querys.insertNewUser(sequelize, user)
            res.status(201).json({ message: 'Successful operation. User created' })
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
                const userData = req.body
                if (Object.entries(userData).length === 0) {
                    res.sendStatus(400)
                } else {
                    await querys.updateUserByID(sequelize, id, userData)
                    res.status(200).json({ message: 'User updated', user: userData })
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
                await querys.deleteUserById(sequelize, id)
                res.status(200).json({ message: 'The user has been deleted' })
            } catch (error) {
                res.status(500).json({ error: errorMessage, message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router