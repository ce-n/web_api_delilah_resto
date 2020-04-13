const express = require('express')
const app = express()

const productsRoutes = require('./features/products/products_routes')
const usersRoutes = require('./features/users/users_routes')
const statusRoutes = require('./features/status/status_routes')
const paymentMethodRoutes = require('./features/payment_methods/paymentMethods_routes')
const favouriteRoutes = require('./features/favourites/favourites_routes')

app.use(express.json())
app.use('/products', productsRoutes)
app.use('/users', usersRoutes)
app.use('/status', statusRoutes)
app.use('/paymentmethod', paymentMethodRoutes)
app.use('/favourite', favouriteRoutes)

module.exports = app