const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db_config.js");
const app = express();
const path = require('path');

app.use(cors({}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public', 'uploads')));

require("./routes/routes.js")(app);

//DB Models
const users = require("./modules/users/users_model");
const categories = require("./modules/categories/categories_model");
const questions = require("./modules/questions/questions_model");
const answers = require("./modules/answers/answers_model") 

let promiseArray = [];
// // sync db models
promiseArray.push(users.sync());
promiseArray.push(categories.sync());

Promise.all(promiseArray)
  .then(() => {
    questions.belongsTo(users);
    users.hasMany(questions);
    questions.belongsTo(categories);
    categories.hasMany(questions);
    questions.sync()
      .then(() => {
        answers.belongsTo(questions);
        questions.hasMany(answers);
        answers.belongsTo(users);
        answers.sync()
          .then(() => {
            console.log('Tables synced successfully');
          })
          .catch(err => {
            console.log("Table Sync Error Answers: ", err);
          })
      })
      .catch(err => {
        console.log("Table Sync Error Questions: ", err);
      });
  })
  .catch(err => {
    console.log("Table Sync Error: ", err);
  });

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`server runnning on http://localhost:${PORT}`);
});