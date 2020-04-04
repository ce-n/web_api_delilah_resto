class PaymentMethod {
    constructor(paymentMethod, id = null) {
        this.id = id
        this.paymentMethod = paymentMethod
    }
}

module.exports = PaymentMethod