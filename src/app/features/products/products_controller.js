const Product = require('./products_model')

const querysProductTable = {

    getAllProducts: async(sequelize) => {
        try {
            const products = await sequelize.query('SELECT * FROM product', { type: sequelize.QueryTypes.SELECT })
            return products
        } catch (error) {
            console.log('EL ERROR ES: ' + error)
            return error
        }
    },

    getProductPricePerUnitById: async(sequelize, id) => {
        try {
            const product_price_query = 'SELECT price_per_unit FROM product WHERE id = ?'
            const product_price = await sequelize.query(product_price_query, {
                type: sequelize.QueryTypes.SELECT,
                replacements: [id]
            })
            return product_price

        } catch (error) {
            return console.log('Error message: ' + error)
        }

    },

    insertNewProduct: async(sequelize, { name, price_per_unit, image_url }) => {
        try {
            const product = new Product(name, price_per_unit, image_url)
            const query = 'INSERT INTO product (name, price_per_unit, image_url) VALUES (?, ?, ?)'
            await sequelize.query(query, {
                replacements: [product.name, product.price_per_unit, product.image_url]
            })

        } catch (error) {
            console.log(error)
        }
    },

    updateProductById: async(sequelize, id, productData) => {
        try {
            for (const property in productData) {
                const query = `UPDATE product SET ${property} = ? WHERE id = ?`
                await sequelize.query(query, { replacements: [productData[property], id] })
            }
        } catch (error) {
            return console.log(error)
        }
    },

    deleteProductById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM product WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = querysProductTable