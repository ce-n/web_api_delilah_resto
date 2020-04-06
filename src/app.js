const express = require('express')
const app = express()

const productsRoutes = require('./features/products/products_routes')

app.use('/products', productsRoutes)

module.exports = app