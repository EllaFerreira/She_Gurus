const { model } = require("mongoose");

class Interest extends model {}

Interest.init({
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    trim: true,
  },
  interest_name: {
    type: DataType.INTEGER,
    allowNull: false,
    modelName: Interest,
  },
});

module.exports = Interest;
