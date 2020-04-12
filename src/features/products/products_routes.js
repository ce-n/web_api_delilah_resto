const express = require('express')
const router = express.Router()
const sequelize = require('../../dataBase_connection')
const productQueries = require('./products_controller')

router
    .route('/')
    .get(async(req, res) => {
        const products = await productQueries.getAllProducts(sequelize)
        console.log(products)
        res.send(products)
    })
    .post(async(req, res) => {
        try {
            const product = req.body
            await productQueries.insertNewProduct(sequelize, product)
            res.status(201).json({ message: 'Successful operation. Product created' })
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
                const productData = req.body
                if (Object.entries(productData).length === 0) {
                    res.sendStatus(400)
                } else {
                    await productQueries.updateProductById(sequelize, id, productData)
                    res.status(200).json({ message: 'Product updated', product: productData })
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
                await productQueries.deleteProductById(sequelize, id)
                res.status(200).json({ message: 'The product has been deleted' })
            } catch (error) {
                res.status(500).json({ error: errorMessage, message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })



module.exports = router