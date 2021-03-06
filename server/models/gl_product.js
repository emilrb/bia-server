const nconf = require('nconf');
const { Sequelize, DataTypes } = require('sequelize');

const { mainDb } = require('../database/main_connection');
const { BaseModel, jsonSerializer } = require('./base_model');

const {
  model: UnitModel,
  jsonSerializer: unitJsonSerializer,
} = require('./gl_unit');

// model
const modelName = 'gl_product';
class MyModel extends BaseModel {}

MyModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        len: {
          args: [1, 150],
          msg: 'Nome deve ter de 1 a 150 caracteres.',
        },
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    eanCode: {
      type: Sequelize.STRING,
    },
    healthCode: {
      type: Sequelize.STRING,
    },
    requestFormActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    consumable: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // options
    sequelize: mainDb,
    modelName: modelName,
    tableName: modelName,
  }
);

// relations
UnitModel.hasMany(MyModel, {
  foreignKey: 'unitId',
  as: 'products',
});
MyModel.belongsTo(UnitModel, {
  foreignKey: 'unitId',
  as: 'unit',
});

// scopes
const scopes = {
  def: {
    include: ['id', 'name', 'description'],
  },
  admin: {
    maps: {
      unit: async (value, scopeName) =>
        await unitJsonSerializer(value, scopeName),
    },
  },
  account: {
    include: ['id', 'name', 'description', 'unitId', 'unit', 'consumable'],
    maps: {
      unit: async (value, scopeName) =>
        await unitJsonSerializer(value, scopeName),
    },
  },
};

exports.model = MyModel;
exports.modelName = modelName;
exports.jsonSerializer = async (value, scopeName) => {
  if (!scopeName) {
    scopeName = 'def';
  }
  if (!scopes[scopeName]) {
    scopeName = 'def';
  }
  return await jsonSerializer(value, scopes[scopeName], scopeName);
};
