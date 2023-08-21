import { config } from 'dotenv';
import { verify } from 'jsonwebtoken';
import { Server } from 'socket.io';
import Bid from '../models/Bid';
import { itemTimeIncrease, setBidTimer, stopBidTimer } from '../utils/bidTimerHandler';
import { setGlobalSocket } from '../utils/globalSocket';
import Auction from '../models/Auction';
config();
export default (io:Server)=>{
  io.of('/auction').on('connection',async socket=>{
    const authorizationHeader = socket.handshake.headers['authorization'];
    const SECRET = process.env.SECRET as string;
    const token:string | any = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : null;
    const user:any = await verify(token,SECRET);
    socket.on('joinRoom',itemID=>{
      socket.join(`item-${itemID}`);
    });
    socket.on('sendMessage',async(itemID,message)=>{
      const obj = {
        userID: user.id,
        itemID: itemID,
        price: message
      };
      const findItem = await Auction.findByPk(itemID,{ attributes: [ 'highest_bid','minimum_increment','time_end','status' ] });
      const { highest_bid, minimum_increment, time_end,status } = findItem as Auction;
      if(status == 'closed'){
        return socket.emit('notification','Auctions is closed');
      }

      setGlobalSocket(socket);
      const findUserBid = await Bid.findOne({ where: {
        itemID: itemID,
        userID: user.id
      }});
      const minimumAcceptableBid:number = highest_bid+minimum_increment;
      if(minimumAcceptableBid < obj.price){
        if(!findUserBid){
          await Bid.create(obj);
        }else await Bid.update({ price: obj.price },{ where: { id: findUserBid?.id }});

        itemTimeIncrease(time_end, itemID);
        await Auction.update({ highest_bid: obj.price }, { where: { id: itemID }});
      }
      else return socket.emit('notification',`Bid must greater than ${minimumAcceptableBid}`);
      stopBidTimer();
      setBidTimer(itemID, user);
      socket.to(`item-${itemID}`).emit('NewMessage',message);
    });
    socket.on('disconnect',()=>{

    });
  });
};