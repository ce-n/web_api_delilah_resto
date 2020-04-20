class DetailOrder {
    constructor(client_order_id, id = null) {
        this.id = id
        this.client_order_id = client_order_id
    }
}

module.exports = DetailOrder