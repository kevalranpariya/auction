import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './User';
import Auction from './Auction';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';
import { itemTimeIncrease } from '../middleware/bidTimerHandler';

class Bid extends Model{
  declare id:number;
  declare userID: number;
  declare itemID: number;
  declare price: number;
  declare bidChecker:(value:any) => Promise<void>;
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

Bid.prototype.bidChecker = async value=>{
  const { itemID, price } = value;
  const findItem = await Auction.findByPk(itemID,{ attributes: [ 'highest_bid','minimum_increment','time_end' ] });
  const { highest_bid, minimum_increment, time_end }:any = findItem;
  const minimumAcceptableBid:number = highest_bid+minimum_increment;
  if(minimumAcceptableBid < price){
    itemTimeIncrease(time_end, itemID);
    await Auction.update({ highest_bid: price }, { where: { id: itemID }});
  }
  else throw new errHelper(errorTypes.bad_request,
    `Bid must be at least ${minimum_increment} rupees higher than the current highest bid.`);
};

export default Bid;