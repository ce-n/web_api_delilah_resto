const User = require('./users_model')

const querys = {
    getAllUsers: async(sequelize) => {
        try {
            const users = await sequelize.query('SELECT * FROM user', { type: sequelize.QueryTypes.SELECT })
            return users
        } catch (error) {
            console.log('EL ERROR ES: ' + error)
        }
    },

    insertNewUser: async(sequelize, { name, lastname, email, telephone, address, password, isAdmin }) => {
        try {
            const user = new User(name, lastname, email, telephone, address, password, isAdmin = false)
            const query = 'INSERT INTO user (name, last_name, email, telephone, address, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)'
            const insertIntoTable = await sequelize.query(query, {
                replacements: [user.name, user.lastname, user.email, user.telephone, user.address, user.password, user.isAdmin]
            })

        } catch (error) {
            console.log(error)
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

// const deleteValueByID = async id => {
//     const query = 'DELETE FROM canciones WHERE id = ?'
//     const insertIntoTable = await sequelize.query(query, { replacements: [id] })
// }

module.exports = querys