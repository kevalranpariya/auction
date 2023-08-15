import { scheduleJob } from 'node-schedule';
import Auction from '../models/Auction';
import { formattedDate } from '../utils/dateFormat';
import moment from 'moment';
export default async()=>{
  scheduleJob('*/5 * * * * *',async date=>{
    const time = moment(new Date()).format('DD-MM-YYYY hh:mm');
    // const findAuction = await Auction.findOne({ where: {
    //   time_start: time
    // }});
    if(time == '2023-08-15 16:32'){
        console.log('enter');
    }else console
    console.log(findAuction)
  });
};