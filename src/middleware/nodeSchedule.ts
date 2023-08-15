import { scheduleJob } from 'node-schedule';
import Auction from '../models/Auction';
import { formattedDate } from '../utils/dateFormat';
import moment from 'moment';
export default async()=>{
  scheduleJob('*/5 * * * * *',async date=>{
    const time = moment(new Date()).format('YYYY-MM-DD hh:mm');
    const findAuction = await Auction.findOne({ where: {
      time_start: time
    }});
    // if(time == '2023-08-15 06:09'){
    //     console.log('enter');
    // }else console.log('not enter');
    // console.log(time);
    console.log(findAuction);
  });
};