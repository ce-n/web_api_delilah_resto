const ClientOrder = require('./clientOrders_model')
const productController = require('./../products/products_controller')
const detailOrderController = require('./../detail_orders/detailOrders_controller')
const detailPerProductController = require('./../detail_per_products/detailPerProducts_controller')

const clientesOrdersTableQueries = {

    getAllClientsOrders: async(sequelize) => {
        try {
            const query = `
            SELECT user.id AS user_id,
                user.name AS user_name,
                user.lastname AS user_lastname,
                user.email AS user_email,
                user.telephone AS user_telephone,
                user.address AS user_address,
                client_order.id AS client_order_id,
                client_order.hour AS client_order_hour,
                payment_method.method AS payment_method,
                status.current_status AS current_status,
                product.id AS product_id,
                product.name AS product_name,
                product.price_per_unit AS product_price_per_unit,
                product.image_url AS product_image_url,
                detail_order.id AS detail_order_id,
                detail_per_product.id AS detail_per_product_id,
                detail_per_product.number_of_unit AS product_number_of_unit,
                detail_per_product.subtotal AS subtotal_per_product
                FROM client_order
                LEFT JOIN user
                ON user.id = client_order.user_id
                LEFT JOIN
                payment_method
                ON client_order.payment_id = payment_method.id
                LEFT JOIN 
                status
                ON client_order.status_id = status.id
                LEFT JOIN
                detail_order
                ON client_order.id = detail_order.client_order_id
                LEFT JOIN
                detail_per_product
                ON detail_order.id = detail_per_product.detail_order_id
                LEFT JOIN
                product
                ON detail_per_product.product_id = product.id           
            `
            const client_orders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
            return {
                client_orders: client_orders,
            }
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    getClientOrderById: async(sequelize, id) => {
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
                            WHERE client_order.id = ?`

            const client_order = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [id]
            })
            console.log(client_order)
            return client_order
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    getClientOrderFilterByClientIdAndOrderId: async(sequelize, userid, orderid) => {
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
                            WHERE user.id = ?
                            AND client_order.id= ?`

            const client_order = await sequelize.query(query, {
                    type: sequelize.QueryTypes.SELECT,
                    replacements: [userid, orderid]
                })
                // console.log(client_order)
            return client_order
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    insertNewClientOrder: async(sequelize, { hour, user_id, status_id, payment_id, product_id, number_of_unit }) => {
        try {
            const clientOrder = new ClientOrder(hour, user_id, status_id, payment_id)
            const query = 'INSERT INTO client_order (hour, user_id, status_id, payment_id) VALUES (?, ?, ?,?)'
            const insert_client_order_response = await sequelize.query(query, {
                type: sequelize.QueryTypes.INSERT,
                replacements: [clientOrder.hour, clientOrder.user_id, clientOrder.status_id, clientOrder.payment_id]
            })
            const client_order_id = insert_client_order_response[0]

            const select_price_per_unit_response = await productController.getProductPricePerUnitById(sequelize, product_id)
            const price_per_unit = select_price_per_unit_response[0].price_per_unit

            const insert_detail_order_response = await detailOrderController.insertNewDetailtOrder(sequelize, client_order_id)
            const detail_order_id = insert_detail_order_response

            const insert_detail_per_product_response = await detailPerProductController.insertNewDetailPerProduct(sequelize, { product_id, detail_order_id, number_of_unit, price_per_unit })
            const detail_per_product_id = insert_detail_per_product_response
            return { client_order_id, detail_order_id, detail_per_product_id }

        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    updateClientOrderById: async(sequelize, id, clientOrderData) => {
        try {
            for (const property in clientOrderData) {
                const query = `UPDATE client_order SET ${property} = ? WHERE id = ?`
                await sequelize.query(query, { replacements: [clientOrderData[property], id] })
            }
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    updateClientOrderStatusById: async(sequelize, id, status) => {
        try {
            const query = `UPDATE client_order SET status_id = ? WHERE id = ?`
            await sequelize.query(query, { replacements: [status, id] })
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    deleteClientOrderById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM client_order WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            return console.log('Error message: ' + error)
        }

    }

}

module.exports = clientesOrdersTableQueries