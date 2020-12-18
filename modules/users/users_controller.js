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

    userLogin() {
        return async (req, res) => {
            let { email, password } = req.body;

            if (!email ||!password) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
            
            try {
                const userExists = await userModel.findOne({ where: { email: email.toLowerCase() } });
                if (userExists) {
                    let validPasscode = await bcrypt.compareSync(password, userExists.password);
                    if (validPasscode) {
                        return jwt.sign({ id: userExists.id, status: userExists.status, role: userExists.role, firstName: userExists.first_name, lastName: userExists.last_name, email: userExists.email }, config.privateKey, { expiresIn: '30 days' }, function(err, token) {
                            if (err) {
                                console.log('Error in generating jwt token. ', err);
                                res.status(500);
                                return res.json({ msg: 'Internal Server Error', error: err });
                            } else {
                                res.status(200);
                                return res.send({ 
                                    token: token,
                                    user: { 
                                        id: userExists.id,
                                        firstName: userExists.first_name, 
                                        lastName: userExists.last_name, 
                                        email: userExists.email, 
                                        status: userExists.status,
                                        role: userExists.role 
                                    }
                                });
                            }
                        });
                    } else {
                        res.status(401);
                        return res.send({ msg: 'Invalid Email or Password' });
                    }
                } else {
                    res.status(404);
                    return res.send({ msg: 'No user registered against this email' });
                }
            } catch (error) {
                console.log('Error in user login', error);
                return res.status(500).send({ msg: 'Internal Server Error', error });
            }
        }
    }

    validateToken() {
        return async(req, res) => {
            let { token } = req.body;
            if (!token) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
            try {
                let decoded = jwt.verify(token, `${config.privateKey}`);
                delete decoded.iat; delete decoded.exp;
                return res.status(200).send({ msg: 'Verified Successfully', data: decoded });
            } catch(err) {
                return res.status(500).send({ msg: 'Internal Server Error', error: err });
            }
        }
    }

}

module.exports = new Users();
