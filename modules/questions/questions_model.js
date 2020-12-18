const db = require ('../../config/db_config');

const questions = db.sequelize.define('questions', {
  id: {
    type: db.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: db.DataTypes.TEXT
  },
  user_id: {
    type: db.DataTypes.INTEGER
  },
  category_id: {
    type: db.DataTypes.INTEGER
  },
  is_deleted: {
    type: db.DataTypes.BOOLEAN,
    required: true,
    defaultValue: false
  }
}, { underscored: true, timestamp: true, tableName: 'questions' });

module.exports = questions;
