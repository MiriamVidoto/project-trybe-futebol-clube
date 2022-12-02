import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Match.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(Match, { foreignKey: 'id', as: 'matches' });

export default Match;
