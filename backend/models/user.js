const utilities = require('../utilities/utilities');

class User {
    constructor(firstname, lastname, username, email, gender) {
        this.id = utilities.generateUniqueId(); // Automatically generate the ID
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.gender = gender;
    }
}

module.exports = User;