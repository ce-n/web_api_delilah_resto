class Favourite {
    constructor(product_id, user_id, id = null) {
        this.id = id
        this.product_id = product_id
        this.user_id = user_id
    }
}

module.exports = Favourite