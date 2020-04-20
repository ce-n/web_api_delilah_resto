const DetailPerProduct = require('./detailPerProducts_model')

const detailPerProductsTableQueries = {

    getAlldetailPerProducts: async(sequelize) => {
        try {
            const detail_per_products = await sequelize.query('SELECT * FROM detail_per_product', { type: sequelize.QueryTypes.SELECT })
            return detail_per_products
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    insertNewDetailPerProduct: async(sequelize, { product_id, detail_order_id, number_of_unit, price_per_unit }) => {
        try {

            const subtotal = number_of_unit * price_per_unit
                // console.log('el subtotal que recibo es ' + subtotal)

            const detail_per_product = new DetailPerProduct(product_id, detail_order_id, number_of_unit, subtotal)

            const query = 'INSERT INTO detail_per_product (product_id, detail_order_id, number_of_unit, subtotal) VALUES (?, ?, ?,?)'
            const response = await sequelize.query(query, {
                type: sequelize.QueryTypes.INSERT,
                replacements: [detail_per_product.product_id, detail_per_product.detail_order_id, detail_per_product.number_of_unit, detail_per_product.subtotal]
            })

            const lastInsertID = response[0]
            console.log('The id of the last record is: ' + lastInsertID)
            return lastInsertID

        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    updateDetailPerProductById: async(sequelize, id, detailPerProductData) => {
        try {
            for (const property in detailPerProductData) {
                const query = `UPDATE detail_per_product SET ${property} = ? WHERE id = ?`
                await sequelize.query(query, { replacements: [detailPerProductData[property], id] })
            }
        } catch (error) {
            return console.log('Error message: ' + error)
        }
    },

    deleteDetailPerProductById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM detail_per_product WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            return console.log('Error message: ' + error)
        }

    }

}

module.exports = detailPerProductsTableQueries