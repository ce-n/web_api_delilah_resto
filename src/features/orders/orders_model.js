class Order {
    constructor(hour, userId, stateId, paymentId, id = null) {
        this.id = id
        this.hour = hour
        this.userId = userId
        this.stateId = stateId
        this.paymentId = paymentId
    }
}

module.exports = Order