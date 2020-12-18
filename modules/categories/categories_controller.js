const categoriesModel = require('./categories_model');
const questionModel = require('../questions/questions_model');
const userModel = require('../users/users_model');
const answerModel = require('../answers/answers_model');
const db = require('../../config/db_config');

class Categories {
  
    constructor() { }

    createCategory() {
        return (req, res) => { 
         
            const { title } = req.body;
            
            if (!req.body || !title) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            return categoriesModel.findOne({ where: { title: title } })
                .then(category => {
                    if (category) {
                        return res.status(409).send({ msg: 'Category against this title already exist.' });
                    } else {
                        const newCategory = categoriesModel.build({ title });
                        return newCategory.save()
                            .then(result => {
                                return res.status(200).json({ msg: 'Category Created Successfully' });
                            })
                            .catch(err => {
                                console.log('Error in category creation: ', err);
                                return res.status(500).json({ msg: 'Internal Server Error', error: err });
                            });
                    }
                })
                .catch(err => {
                    console.log('Error in finding category: ', err);
                    return res.status(500).json({ msg: 'Internal Server Error', error: err });
                });
        }
    }
    
}

module.exports = new Categories();
