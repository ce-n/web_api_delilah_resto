class Product {
    constructor(name, price_per_unit, image_url, id = null) {
        this.id = id
        this.name = name
        this.price_per_unit = price_per_unit
        this.image_url = image_url
    }
}

module.exports = Product