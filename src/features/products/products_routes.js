const express = require('express')
const router = express.Router()
const sequelize = require('../../dataBase_connection')
const getAllProducts = require('./products_controller')

router
    .route('/')
    .get(async(req, res) => {
        const products = await getAllProducts(sequelize)
        console.log(products)
        res.send(products)
    })
    .post((req, res) => {
        res.send('crear producto')
    })
    .put((req, res) => {
        res.send('actualizar productos')
    })
    .delete((req, res) => {
        res.send('borrar producto')
    })

module.exports = router