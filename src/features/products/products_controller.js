const product = require('./products_model')

const getAllProducts = async(sequelize) => {
    try {
        const products = await sequelize.query('SELECT * FROM product', { type: sequelize.QueryTypes.SELECT })
        return products
    } catch (error) {
        console.log('EL ERROR ES: ' + error)
    }
}

module.exports = getAllProducts