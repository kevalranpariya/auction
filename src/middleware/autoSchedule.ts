import { scheduleJob } from 'node-schedule';
import Auction from '../models/Auction';
import moment from 'moment';
export default async()=>{
  scheduleJob('*/1 * * * *',async ()=>{
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm');
    const findAuction = await Auction.findAll({ where: {
      time_start: time,
      status: 'unsold'
    }});
    if(findAuction.length){
      findAuction.forEach(e=>{
        e.status = 'active';
        e.save();
      });
    }
  });
};