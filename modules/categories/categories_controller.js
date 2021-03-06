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
    
    listCategories() {
        return (req, res) => { 
            return categoriesModel.findAndCountAll({ where: { is_deleted: false } })
                .then(result => {
                    let { count, rows } = result;
                    return res.status(200).send({ count, data: rows });
                })
                .catch(err => {
                    console.log('Error in listing user categories from db', err);
                    return res.status(500).json({ msg: 'Internal Server Error', error: err });
                });
        }
    }
    
    specificCategory() {
        return (req, res) => { 
            const { id } = req.params;
            
            if (!req.body || !id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            return categoriesModel.findOne({ where: { id: id }, include: [{ model: questionModel, include: [ userModel, { model: answerModel }] }] })
                .then(result => {
                    if (result) {
                        return res.status(200).send({ data: result });
                    } else {
                        return res.status(404).send({ msg: 'Category not found against this Category ID' });
                    }
                })
                .catch(err => {
                    console.log('Error in listing specific category from db', err);
                    return res.status(500).json({ msg: 'Internal Server Error', error: err });
                });
        }
    }

    deleteCategories() {
        return (req, res) => { 
            const { category_id } = req.body;
            
            if (!req.body || !category_id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            return categoriesModel.update({ is_deleted: true }, { where: { id: category_id } })
                .then(result => {
                    return res.status(200).send({ msg: 'Category Deleted Successfully' });
                })
                .catch(err => {
                    console.log('Error in deleting specific category from db', err);
                    return res.status(500).json({ msg: 'Internal Server Error', error: err });
                });
        }
    }
}

module.exports = new Categories();
