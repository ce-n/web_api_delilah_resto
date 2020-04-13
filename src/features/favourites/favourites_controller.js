const Favourite = require('./favourites_model')

const favouriteTableQueries = {

    getAllFavourites: async(sequelize) => {
        try {
            const favourite = await sequelize.query('SELECT * FROM favourite', { type: sequelize.QueryTypes.SELECT })
            return favourite
        } catch (error) {
            console.log('EL ERROR ES: ' + error)
        }
    },

    insertNewFavourite: async(sequelize, { product_id, user_id }) => {
        try {
            const favourite = new Favourite(product_id, user_id)
            const query = 'INSERT INTO favourite (product_id, user_id) VALUES (?, ?)'
            await sequelize.query(query, {
                replacements: [favourite.product_id, favourite.user_id]
            })

        } catch (error) {
            console.log(error)
        }
    },

    deleteFavouriteById: async(sequelize, id) => {
        try {
            const query = 'DELETE FROM favourite WHERE id = ?'
            await sequelize.query(query, { replacements: [id] })

        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = favouriteTableQueries