import { config } from 'dotenv';
import { verify } from 'jsonwebtoken';
import { Server } from 'socket.io';
import Bid from '../models/Bid';
import { itemTimeIncrease, setBidTimer, stopBidTimer } from '../middleware/bidTimerHandler';
import Auction from '../models/Auction';
config();
export default (io:Server)=>{
  io.of('/auction').on('connection',async socket=>{
    const authorizationHeader = socket.handshake.headers['authorization'];
    const { Scerat }:any = process.env;
    // Extract the token from the header (assuming it's a Bearer token)
    const token:string | any = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : null;
    const user:any = await verify(token,Scerat);
    console.log('User');
    socket.on('joinRoom',itemID=>{
      socket.join(`item-${itemID}`);
      console.log(`User a join a item-${itemID}`);
    });
    socket.on('sendMessage',async(itemID,message)=>{
      const obj = {
        userID: user.id,
        itemID: itemID,
        price: message
      };
      // await Bid.prototype.bidChecker(obj);
      const findItem = await Auction.findByPk(itemID,{ attributes: [ 'highest_bid','minimum_increment','time_end','status' ] });
      const { highest_bid, minimum_increment, time_end,status }:any = findItem;
      if(status == 'closed'){
        return socket.emit('notification','Auctions is closed');
      }

      const findUserBid = await Bid.findOne({ where: {
        itemID: itemID,
        userID: user.id
      }});

      const minimumAcceptableBid:number = highest_bid+minimum_increment;
      if(minimumAcceptableBid < obj.price){
        if(!findUserBid){
          await Bid.create(obj);
        }else await Bid.update({ price: obj.price },{ where: { id: findUserBid?.id }});

        itemTimeIncrease(time_end, itemID,socket);
        await Auction.update({ highest_bid: obj.price }, { where: { id: itemID }});
      }
      else return socket.emit('notification',`Bid must greater than ${minimumAcceptableBid}`);
      stopBidTimer();
      setBidTimer(itemID, user,socket);
      socket.to(`item-${itemID}`).emit('NewMessage',message);
    });
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
    // setTimeout(()=>{
    //   console.log('sdfdsf');
    //   socket.to('item-1').emit('send message','message');
    //   console.log('sdfdsfd');
    // },10000);
    // emitter.on('notification',(mes:any)=>{
    //   console.log('messs');
    // });
  });
};