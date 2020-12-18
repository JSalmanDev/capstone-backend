const db = require ('../../config/db_config');

const categories = db.sequelize.define('categories', {
  id: {
    type: db.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: db.DataTypes.STRING,
    unique: true
  },
  is_deleted: {
    type: db.DataTypes.BOOLEAN,
    required: true,
    defaultValue: false
  }
}, { underscored: true, timestamp: true, tableName: 'categories' });

module.exports = categories;
