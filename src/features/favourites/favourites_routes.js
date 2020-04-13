const express = require('express')
const router = express.Router()
const sequelize = require('../../dataBase_connection')
const favouriteQueries = require('./favourites_controller')

router
    .route('/')
    .get(async(req, res) => {
        const favourites = await favouriteQueries.getAllFavourites(sequelize)
        console.log(favourites)
        res.send(favourites)
    })
    .post(async(req, res) => {
        try {
            const favourite = req.body
            await favouriteQueries.insertNewFavourite(sequelize, favourite)
            res.status(201).json({ message: 'Successful operation. Favourite created' })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    })

router
    .route('/:id')
    .delete(async(req, res) => {
        const id = parseInt(req.params.id)
        if (!isNaN(id)) {
            try {
                await favouriteQueries.deleteFavouriteById(sequelize, id)
                res.status(200).json({ message: 'The favourite has been deleted' })
            } catch (error) {
                res.status(500).json({ message: error })
            }

        } else {
            res.sendStatus(400)
            console.log('Id is not a number')
        }

    })

module.exports = router