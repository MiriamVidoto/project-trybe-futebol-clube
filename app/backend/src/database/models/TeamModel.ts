import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Example extends Model {
  declare id: number;
  declare teamName: string;
}

Example.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Example;
