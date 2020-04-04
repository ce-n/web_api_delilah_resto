class User {
    constructor(name, lastname, email, telephone, address, password, isAdmin, id = null) {
        this.id = id
        this.name = name
        this.lastname = lastname
        this.email = email
        this.telephone = telephone
        this.address = address
        this.password = password
        this.isAdmin = isAdmin
    }
}

module.exports = User