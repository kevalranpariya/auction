import moment from 'moment';
import Auction from '../models/Auction';
import closeAuction from './closeAuction';

let setTimer:NodeJS.Timeout;

export const setBidTimer = (itemID:number, user:any, socket:any)=>{
  setTimer = setTimeout(async()=>{
    if (await closeAuction(itemID, user.id)) {
      socket.to(`item-${itemID}`).emit('itemSold', `This ${itemID} is sold ${user.id}`);
    }else socket.emit('notification',`This ${itemID} is not sold`);
  },(10000*3));
};

export const stopBidTimer = ()=>{
  clearTimeout(setTimer);
};

export const itemTimeIncrease = async(time_end:string,itemID:number,socket:any)=>{
  const endDate:Date | any = new Date(time_end);
  const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const currentDate:Date| any = new Date(time);
  const timeDifference = endDate - currentDate;
  const secondsRemaining = Math.floor(timeDifference / 1000);
  if(secondsRemaining< 30){
    const timeIncrease = moment(new Date(endDate.getTime() + 30 * 1000)).format('YYYY-MM-DD HH:mm:ss');
    await Auction.update({ time_end: timeIncrease }, { where: { id: itemID }});
    socket.to(`item-${itemID}`).emit('NewMessage',`This item auction ${itemID} is increased 30s`);
  }
};