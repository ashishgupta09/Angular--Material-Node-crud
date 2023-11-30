const fs = require('fs');
const path = require('path');
const User = require('../models/user');

const formatResponse = (success, message, data) => {
    return {
        success,
        message,
        data,
    };
};

const getDbFilePath = () => {
    return path.join(__dirname, '..', 'db', 'db.json');
};

const loadData = () => {
    const filePath = getDbFilePath();
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const saveData = (data) => {
    const filePath = getDbFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const usersController = {
    getAllUsers: (req, res) => {
        try {
            const data = loadData();
            res.json(formatResponse(true, 'Users retrieved successfully', data));
        } catch (error) {
            res.status(500).json(formatResponse(false, 'Error retrieving users', null));
        }
    },

    getUserById: (req, res) => {
        try {
            const data = loadData();
            const user = data.find((user) => user.id === req.params.id);
            if (user) {
                res.json(formatResponse(true, 'User retrieved successfully', user));
            } else {
                res.status(404).json(formatResponse(false, 'User not found', null));
            }
        } catch (error) {
            res.status(500).json(formatResponse(false, 'Error retrieving user', null));
        }
    },

    createUser: (req, res) => {
        try {
            const data = loadData();
            const requiredFields = ['firstname', 'lastname', 'username', 'email', 'gender'];
            for (const field of requiredFields) {
                if (!req.body[field]) {
                    return res.status(400).json(formatResponse(false, `Missing required field: ${field}`, null));
                }
            }

            const newUser = new User(
                req.body.firstname,
                req.body.lastname,
                req.body.username,
                req.body.email,
                req.body.gender
            );
            data.push(newUser);
            saveData(data);
            res.status(201).json(formatResponse(true, 'User created successfully', newUser));
        } catch (error) {
            res.status(500).json(formatResponse(false, 'Error creating user', null));
        }
    },

    
  updateUser: (req, res) => {
    try {
        const data = loadData();
         const user = data.find((user) => user.id === req.params.id);
        if (user) {
            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.gender) {
                user.gender = req.body.gender;
            }
            saveData(data);
            res.json(formatResponse(true, 'User updated successfully', user));
        } else {
            res.status(404).json(formatResponse(false, 'User not found', null));
        }
    } catch (error) {
        res.status(500).json(formatResponse(false, 'Error updating user', null));
    }
},

    deleteUser: (req, res) => {
        try {
            const data = loadData();
            const userIndex = data.findIndex((user) => user.id === req.params.id);
            if (userIndex !== -1) {
                const deletedUser = data.splice(userIndex, 1)[0];
                saveData(data);
                res.json(formatResponse(true, 'User deleted successfully', deletedUser));
            } else {
                res.status(404).json(formatResponse(false, 'User not found', null));
            }
        } catch (error) {
            res.status(500).json(formatResponse(false, 'Error deleting user', null));
        }
    },
};

module.exports = usersController;