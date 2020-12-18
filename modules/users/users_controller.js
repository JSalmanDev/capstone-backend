const userModel = require ('./users_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const db = require('../../config/db_config');

class Users {
  
    constructor() { }

    userRegister() {
        return async (req, res) => {
            let { firstName, lastName, email, password } = req.body;

            if (!firstName ||!lastName ||!email ||!password) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
            
            try {
                const userExists = await userModel.findOne({ where: { email: email.toLowerCase() } });
                if (userExists) {
                    return res.status(401).send({ msg: 'User against this email already exist' });
                } else {
                    let generateHash = function (password) {
                        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                    };
                    
                    let hashPassword = generateHash(password);
                    let obj = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email.toLowerCase(),
                        password: hashPassword,
                        role: 'user'
                    };
                    const user = await userModel.create(obj);
                    return res.status(200).send({ status: true, msg: 'User Registered Successfully' });
                }
            } catch (error) {
                console.log('Error in user registeration', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

}

module.exports = new Users();
