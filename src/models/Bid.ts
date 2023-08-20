import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import User from './User';
import Auction from './Auction';
import errHelper from '../utils/errorHelper';
import errorTypes from '../utils/errorTypes';
import { itemTimeIncrease } from '../utils/bidTimerHandler';
import { Socket } from 'socket.io';

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

Bid.prototype.bidChecker = async (value:any)=>{
  let socket = globalSocket
  const findItem = await Auction.findByPk(value.itemID,{ attributes: [ 'highest_bid','minimum_increment','time_end','status' ] });
  const { highest_bid, minimum_increment, time_end,status } = findItem as Auction;
  if(status == 'closed'){
    return socket.emit('notification','Auctions is closed');
  }

  const findUserBid = await Bid.findOne({ where: {
    itemID: value.itemID,
    userID: value.userID
  }});
  const minimumAcceptableBid:number = highest_bid+minimum_increment;
  if(minimumAcceptableBid < value.price){
    if(!findUserBid){
      await Bid.create(value);
    }else await Bid.update({ price: value.price },{ where: { id: findUserBid?.id }});

    itemTimeIncrease(time_end, value.itemID,socket);
    await Auction.update({ highest_bid: value.price }, { where: { id: value.itemID }});
  }
  else return socket.emit('notification',`Bid must greater than ${minimumAcceptableBid}`);
};

export default Bid;