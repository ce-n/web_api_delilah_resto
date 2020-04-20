const User = require('./users_model')
const config = require('../../../config/config')
const jwt = require('jsonwebtoken')
const sign = config.JWT.PRIVATE_KEY

const queriesUserTable = {

    insertNewUser: async(sequelize, { name, lastname, email, telephone, address, password, isAdmin }) => {
        try {
            const user = new User(name, lastname, email, telephone, address, password, isAdmin = false)
            const query = 'INSERT INTO user (name, lastname, email, telephone, address, password, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)'
            const response = await sequelize.query(query, {
                type: sequelize.QueryTypes.INSERT,
                replacements: [user.name, user.lastname, user.email, user.telephone, user.address, user.password, user.isAdmin]
            })

            const lastInsertID = response[0]
            console.log('The user_id of the last record is: ' + lastInsertID)
            return lastInsertID

        } catch (error) {
            console.log(error)
        }
    },

    userLogin: async(sequelize, username, password) => {
        try {
            const query = `SELECT 
            user.id AS userID,
            user.name AS username,
            user.email,
            user.password,
            user.isAdmin
            FROM user
            WHERE
            user.name = ?
            AND
            user.password = ?`
            const userData = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [username, password]
            })

            if (userData.length) {
                const token = jwt.sign(userData[0], sign)
                console.log('TOKEN GENERADO: ' + token)
                return token
            } else {
                return null
            }

        } catch (error) {
            console.log('EL ERROR ES: ' + error)
        }

    },

    getAllUsers: async(sequelize) => {
        try {
            const query = 'SELECT * FROM user'
            const users = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
            return users
        } catch (error) {
            console.log('EL ERROR ES: ' + error)
        }
    },

    getUserinformationByUserID: async(sequelize, id) => {
        try {
            const query = 'SELECT * FROM user WHERE id=?'
            const users = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [id]
            })
            return users
        } catch (error) {
            console.log('EL ERROR ES: ' + error)
        }

    },

    getUserOrdersByUserId: async(sequelize, id) => {
        try {
            const query = `SELECT
                            user.id AS user_ID, 
                            user.name AS user_name, 
                            user.lastname AS user_lastname, 
                            user.email AS user_email, 
                            user.telephone AS user_telephone, 
                            user.address AS user_adress,
                            client_order.id AS client_order_ID, 
                            client_order.hour AS client_order_hour, 
                            status.current_status AS order_status,
                            payment_method.method AS payment_method,
                            product.name AS product_name, 
                            product.price_per_unit AS product_price_per_unit, 
                            product.image_url AS product_image_url,  
                            detail_per_product.number_of_unit AS product_amount, 
                            detail_per_product.subtotal AS subtotal_per_product
                            FROM user 
                            LEFT JOIN client_order
                            ON user.id = client_order.user_id
                            LEFT JOIN status
                            ON client_order.status_id = status.id
                            LEFT JOIN payment_method
                            ON client_order.payment_id = payment_method.id
                            LEFT JOIN detail_order 
                            ON client_order.id = detail_order.client_order_id 
                            LEFT JOIN detail_per_product 
                            ON detail_order.id = detail_per_product.detail_order_id 
                            LEFT JOIN product ON detail_per_product.product_id = product.id 
                            WHERE user.id = ?`

            const user_orders = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [id]
            })
            console.log(user_orders)
            return user_orders
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    updateUserByID: async(sequelize, id, userData) => {
        try {
            for (const property in userData) {
                const query = `UPDATE user SET ${property} = ? WHERE id = ?`
                await sequelize.query(query, { replacements: [userData[property], id] })
            }
        } catch (error) {
            console.log(error)
        }
    },

    deleteUserById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM user WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            console.log(error)
        }

    }

}
module.exports = queriesUserTable