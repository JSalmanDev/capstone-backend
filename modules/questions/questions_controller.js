const questionModel = require('./questions_model');
const userModel = require('../users/users_model');
const answerModel = require('../answers/answers_model');
const categoryModel = require('../categories/categories_model');

class Questions {
  
    constructor() { }

    createQuestion() {
        return (req, res) => { 
         
            const { question, user_id, category_id } = req.body;
            
            if (!req.body || !question ||!user_id ||!category_id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }
            
            if (!question && question.trim().length <= 0) {
                return res.status(400).send({ msg: 'Please enter valid question' });
            }
    
            if (question && question.trim()[question.trim().length-1] != '?') {
                return res.status(400).send({ msg: 'Please add question mark at the end of question (?)' });
            }

            const newQuestion = questionModel.build({ question, user_id, category_id });
            return newQuestion.save()
                .then(result => {
                    return res.status(200).json({ msg: 'Question Created Successfully' });
                })
                .catch(err => {
                    console.log('Error in question creation: ', err);
                    return res.status(500).json({ msg: 'Internal Server Error', error: err });
                });
        }
    }
    
    specificQuestion() {
        return (req, res) => { 
            const { id, category_id } = req.params;
            
            if (!req.body ||!id ||!category_id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            return questionModel.findOne({ where: { id: id, category_id: category_id }, include: [ userModel, categoryModel, { model: answerModel, include: [userModel] } ] })
                .then(result => {
                    if (result) {
                        return res.status(200).send({ data: result });
                    } else {
                        return res.status(404).send({ msg: 'Question not found against this Question ID' });
                    }
                })
                .catch(err => {
                    console.log('Error in listing specific question from db', err);
                    return res.status(500).json({ msg: 'Internal Server Error', error: err });
                });
        }
    }

    deleteQuestions() {
        return (req, res) => { 
            const { question_id } = req.body;
            
            if (!req.body || !question_id) {
                return res.status(400).send({ msg: 'Bad Request' });
            }

            return questionModel.update({ is_deleted: true }, { where: { id: question_id } })
                .then(result => {
                    return res.status(200).send({ msg: 'Question Deleted Successfully' });
                })
                .catch(err => {
                    console.log('Error in deleting specific question from db', err);
                    return res.status(500).json({ msg: 'Internal Server Error', error: err });
                });
        }
    }
}

module.exports = new Questions();
