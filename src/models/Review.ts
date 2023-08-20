import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './User';
import Auction from './Auction';

class Review extends Model{
  declare id:number;
  declare score:number;
  declare text:string;
  declare userID:number;
  declare itemID:number;
}

Review.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  star: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  itemID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  sequelize,
  tableName: 'Review',
  indexes: [
    {
      unique: true,
      fields: [ 'userID','itemID' ]
    }
  ]
});

User.hasMany(Review,{
  foreignKey: 'userID'
});

Auction.hasMany(Review,{
  foreignKey: 'itemID'
});

export default Review;