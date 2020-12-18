const db = require ('../../config/db_config');

const answers = db.sequelize.define('answers', {
  id: {
    type: db.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  answer: {
    type: db.DataTypes.TEXT
  },
  user_id: {
    type: db.DataTypes.INTEGER
  },
  question_id: {
    type: db.DataTypes.INTEGER
  },
  is_deleted: {
    type: db.DataTypes.BOOLEAN,
    required: true,
    defaultValue: false
  }
}, { underscored: true, timestamp: true, tableName: 'answers' });

module.exports = answers;
