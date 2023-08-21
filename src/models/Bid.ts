import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './User';
import Auction from './Auction';

class Bid extends Model{
  declare id:number;
  declare userID: number;
  declare itemID: number;
  declare price: number;
}

Bid.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  itemID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  sequelize,
  modelName: 'Bid'
});

User.hasMany(Bid,{
  foreignKey: 'userID'
});

Auction.hasMany(Bid,{
  foreignKey: 'itemID'
});

export default Bid;