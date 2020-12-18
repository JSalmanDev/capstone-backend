const Users = require('../modules/users/users_controller');
const Categories = require('../modules/categories/categories_controller');
const Question = require('../modules/questions/questions_controller');
const Answer = require('../modules/answers/answers_controller');

module.exports = function(app) {
  
  app.get("/", function(req, res) {
    res.send("********");
  });

  //user Register
  app.post('/api/user/create', Users.userRegister());

  //user Login
  app.post('/api/user/signin', Users.userLogin());

  //validate user token
  app.post('/api/validate/token', Users.validateToken());

  //Create Category
  app.post('/api/category/create', Categories.createCategory());

  //List Categories
  app.get('/api/category/list', Categories.listCategories());

  //Get Category By ID
  app.get('/api/category/find/:id', Categories.specificCategory());

  //Delete Category
  app.delete('/api/category/delete', Categories.deleteCategories());

  //Create Question
  app.post('/api/question/create', Question.createQuestion());

  //Get Question By ID
  app.get('/api/category/:category_id/question/find/:id', Question.specificQuestion());

  //Delete Question
  app.delete('/api/question/delete', Question.deleteQuestions());

  //Create Answer
  app.post('/api/answer/create', Answer.createAnswer());

  //Delete Answer
  app.delete('/api/answer/delete', Answer.deleteAnswer());

};