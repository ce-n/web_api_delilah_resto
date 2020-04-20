const express = require('express')
const router = express.Router()
const sequelize = require('../../app/database/dataBase_connection')
const detailPerProductQueries = require('./detailPerProducts_controller')
const productQueries = require('../products/products_controller')

router
    .route('/')
    .get(async(req, res) => {
        const detailPerProduct = await detailPerProductQueries.getAlldetailPerProducts(sequelize)
        console.log(detailPerProduct)
        res.send(detailPerProduct)
    })
    .post(async(req, res) => {
        try {
            const productID = req.body.product_id
                //console.log('// la ID del producto es ' + productID)
            const queryResponse = await productQueries.getProductPricePerUnitById(sequelize, productID)
            const pricePerUnit = queryResponse[0].price_per_unit
                // console.log('precio: ' + pricePerUnit)
            const numberOfUnit = req.body.number_of_unit
                // console.log('cantidad: ' + numberOfUnit)
            const detailPerProductData = {
                product_id: productID,
                detail_order_id: req.body.detail_order_id,
                number_of_unit: numberOfUnit,
                price_per_unit: pricePerUnit
            }

            const response = await detailPerProductQueries.insertNewDetailPerProduct(sequelize, detailPerProductData)

            res.status(201).json({
                message: 'Successful operation. Detail per product created',
                detail_per_product_id: response
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
                const detailPerProductData = req.body
                if (Object.entries(detailPerProductData).length === 0) {
                    res.sendStatus(400)
                } else {
                    await detailPerProductQueries.updateDetailPerProductById(sequelize, id, detailPerProductData)
                    res.status(200).json({ message: 'Detail per product updated', detail_per_product: detailPerProductData })
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
                await detailPerProductQueries.deleteDetailPerProductById(sequelize, id)
                res.status(200).json({ message: 'The detail has been deleted' })
            } catch (error) {
                res.status(500).json({ message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router