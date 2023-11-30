const utilities = {
    // Function to generate a random ID
    generateUniqueId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 10; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return id;
    },
}


module.exports = utilities;