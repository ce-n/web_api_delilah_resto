class DetailPerProduct {
    constructor(productId, detailOrderId, numberOfUnit, subtotal, id = null) {
        this.id = id
        this.productId = productId
        this.detailOrderId = detailOrderId
        this.numberOfUnit = numberOfUnit
        this.subtotal = subtotal
    }
}

module.exports = DetailPerProduct