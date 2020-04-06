const product = require('./products_model')
    // const sequelize = require('../../dataBase_connection')

const getAllProducts = async(sequelize) => {
    try {
        const products = await sequelize.query('SELECT * FROM product', { type: sequelize.QueryTypes.SELECT })
            //console.log(products)
        return products
    } catch (error) {
        console.log('EL ERROR ES: ' + error)
    }

}

module.exports = getAllProducts