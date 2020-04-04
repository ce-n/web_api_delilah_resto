class Favourite {
    constructor(userId, productId, id = null) {
        this.id = id
        this.userId = userId
        this.productId = productId
    }
}

module.exports = Favourite