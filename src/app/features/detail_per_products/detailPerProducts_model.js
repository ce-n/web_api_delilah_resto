class DetailPerProduct {
    constructor(product_id, detail_order_id, number_of_unit, subtotal, id = null) {
        this.product_id = product_id
        this.detail_order_id = detail_order_id
        this.number_of_unit = number_of_unit
        this.subtotal = subtotal
        this.id = id
    }
}

module.exports = DetailPerProduct