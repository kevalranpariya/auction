import { scheduleJob } from 'node-schedule';
import Auction from '../models/Auction';
import moment from 'moment';
import Bid from '../models/Bid';
import { Sequelize } from 'sequelize';
import closeAuction from '../utils/closeAuction';
export default async()=>{
  scheduleJob('*/1 * * * *',async ()=>{
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const findAuction = await Auction.findAll({ where: {
      time_start: time
    }});
    if(findAuction.length){
      findAuction.forEach(e=>{
        e.status = 'active';
        e.save();
      });
    }
  });

  scheduleJob('*/1 * * * * *',async()=>{
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const findAuction = await Auction.findAll({ where: {
      time_end: time,
    }});
    if(findAuction.length){
      findAuction.forEach(async e=>{
        const allBid = await Bid.findOne({ where: {
          itemID: e.id,
        },
        attributes: [ [ Sequelize.fn('MAX', Sequelize.col('price')), 'highestBid' ],
          'userID'
        ],
        group: ['userID'],
        order: [[ Sequelize.fn('MAX', Sequelize.col('price')), 'DESC' ]]
        });
        const { userID }:any = allBid;
        await closeAuction(e.id, userID);
      });
    }
  });
};