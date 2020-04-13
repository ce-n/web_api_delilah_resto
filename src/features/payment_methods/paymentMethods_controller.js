const PaymentMethod = require('./paymentMethods_model')

const paymentMethodQueries = {
    getAllPaymentMethod: async(sequelize) => {
        try {
            const payment_methods = await sequelize.query('SELECT * FROM payment_method', { type: sequelize.QueryTypes.SELECT })
            return payment_methods
        } catch (error) {
            console.log('EL ERROR ES: ' + error)
        }
    },

    insertNewPaymentMethod: async(sequelize, { method }) => {
        try {
            const payment_method = new PaymentMethod(method)
            const query = 'INSERT INTO payment_method (method) VALUES (?)'
            await sequelize.query(query, {
                replacements: [payment_method.method]
            })

        } catch (error) {
            console.log(error)
        }
    },

    updatePaymentMethodById: async(sequelize, id, paymentMethodData) => {
        try {
            for (const property in paymentMethodData) {
                const query = `UPDATE payment_method SET ${property} = ? WHERE id = ?`
                await sequelize.query(query, { replacements: [paymentMethodData[property], id] })
            }
        } catch (error) {
            console.log(error)
        }
    },

    deletePaymentMethodById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM payment_method WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = paymentMethodQueries