class PaymentMethod {
    constructor(method, id = null) {
        this.id = id
        this.method = method
    }
}

module.exports = PaymentMethod