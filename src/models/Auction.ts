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
  declare images:Array<{url: string, public_id: string }>;
  declare highest_bid:number;
  declare minimum_increment:number;
  declare sold_status: string;
  declare sold_item:number;
  declare reserve_price:number;
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
    values: [ 'active','closed' ],
    defaultValue: 'closed'
  },
  images: {
    type: DataTypes.JSONB,
  },
  highest_bid: {
    type: DataTypes.INTEGER,
  },
  minimum_increment: {
    type: DataTypes.INTEGER
  },
  sold_status: {
    type: DataTypes.ENUM,
    values: [ 'sold','unsold' ],
    defaultValue: 'unsold'
  },
  sold_item: {
    type: DataTypes.INTEGER
  },
  reserve_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},{
  sequelize,
  tableName: 'Auction',
});

User.hasMany(Auction,{
  foreignKey: 'sellerID'
});

User.hasOne(Auction,{
  foreignKey: 'sold_item'
});

export default Auction;