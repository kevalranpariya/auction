import sequelize from '../config/sequelize';
import { DataTypes, Model } from 'sequelize';
import User from './User';

class Auction extends Model{
  declare id:number;
  declare name:string;
  declare description:string;
  declare starting_bid:number;
  declare sellerID:number;
  declare status:string;
  declare time_start:string;
  declare time_end:string;
  declare images:string[];
  declare highest_bid:number;
  declare minimum_increment:number;
}

Auction.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
  },
  description: DataTypes.STRING,
  starting_bid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  time_start: {
    type: DataTypes.STRING,
  },
  time_end: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM,
    values: [ 'sold','unsold','active' ],
    defaultValue: 'unsold'
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  highest_bid: {
    type: DataTypes.INTEGER,
  },
  minimum_increment: {
    type: DataTypes.INTEGER
  }
},{
  sequelize,
  tableName: 'Auction',
});

User.hasMany(Auction,{
  foreignKey: 'sellerID'
});

export default Auction;