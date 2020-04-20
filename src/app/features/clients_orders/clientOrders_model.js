class ClientOrder {
    constructor(hour, user_id, status_id, payment_id, id = null) {
        this.id = id
        this.hour = hour
        this.user_id = user_id
        this.status_id = status_id
        this.payment_id = payment_id
    }
}

module.exports = ClientOrder