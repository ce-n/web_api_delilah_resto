const express = require('express')
const router = express.Router()
const sequelize = require('../../database/dataBase_connection')
const userQueries = require('./users_controller')

const errorMessage = 'Something went wrong. Please retry or contact with an admin.'

router
    .route('/')
    .get(async(req, res) => {
        try {
            const users = await userQueries.getAllUsers(sequelize)
            console.log(users)
            res.send(users)
        } catch (error) {
            res.status(500).json({ error: errorMessage, message: error })
        }

    })
    // .post(async(req, res) => {
    //     try {
    //         const user = req.body
    //         await userQueries.insertNewUser(sequelize, user)
    //         res.status(201).json({ message: 'Successful operation. User created' })
    //     } catch (error) {
    //         res.status(500).json({ error: errorMessage, message: error })
    //     }
    // })

// router
//     .route('/login')
//     .post(async(req, res) => {
//         const { username, password } = req.body

//         if (!username || !password) {
//             return res.status(402).send({ error: 'Bad request', message: 'Password or username is missing' })
//         }

//         try {
//             const token = await userQueries.userLogin(sequelize, username, password)
//             if (token.length) {
//                 return res.status(200).json({ message: 'User logged in succefully', token: token })
//             } else {
//                 return res.status(404).json({ message: 'There is not match with user or passwors' })
//             }

//         } catch (error) {
//             res.status(500).json({ error: error, message: 'Something went wrong. Please try again' })
//         }
//     })

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
                    await userQueries.updateUserByID(sequelize, id, userData)
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
                await userQueries.deleteUserById(sequelize, id)
                res.status(200).json({ message: 'The user has been deleted' })
            } catch (error) {
                res.status(500).json({ error: errorMessage, message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

router
    .route('/orders/:userid')
    .get(async(req, res) => {
        const id = parseInt(req.params.userid)

        if (!isNaN(id)) {
            try {
                const userOrdersFilterByUserID = await querys.getUserOrdersByUserId(sequelize, id)
                res.status(200).json({ message: 'All user orders filter by user id', user_orders: userOrdersFilterByUserID })

            } catch (error) {
                res.sendStatus(500).json({ message: error })
            }
        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router