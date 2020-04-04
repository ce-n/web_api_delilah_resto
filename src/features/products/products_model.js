class Product {
    constructor(name, pricePerUnit, imageURL, id = null) {
        this.id = id
        this.name = name
        this.pricePerUnit = pricePerUnit
        this.imageURL = imageURL
    }
}

module.exports = Product