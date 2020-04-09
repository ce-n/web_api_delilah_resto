const express = require('express')
const app = express()

const productsRoutes = require('./features/products/products_routes')
const usersRoutes = require('./features/users/users_routes')

app.use(express.json())
app.use('/products', productsRoutes)
app.use('/users', usersRoutes)

module.exports = app