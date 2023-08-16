import moment from 'moment';
import Auction from '../models/Auction';

let setTimer:NodeJS.Timeout;

export const setBidTimer = (itemID:number)=>{
  setTimer = setTimeout(async()=>{
    const auctionItem = await Auction.findByPk(itemID);

    if (auctionItem) {
      const highestBid = auctionItem.getDataValue('highest_bid');
      console.log(`Bid for item ${itemID} ended. Highest bid: ${highestBid}`);
    }
  },1000);
};

export const stopBidTimer = ()=>{
  clearTimeout(setTimer);
};

export const itemTimeIncrease = async(time_end:string,itemID:number)=>{
  const endDate:Date | any = new Date(time_end);
  const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const currentDate:Date| any = new Date(time);
  const timeDifference = endDate - currentDate;
  const secondsRemaining = Math.floor(timeDifference / 1000);
  if(secondsRemaining< 10){
    const timeIncrease = moment(new Date(endDate.getTime() + 10 * 1000)).format('YYYY-MM-DD HH:mm:ss');
    return await Auction.update({ time_end: timeIncrease }, { where: { id: itemID }});
  }
};