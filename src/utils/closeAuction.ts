import Auction from '../models/Auction';

export default async(itemID:number, userID:number):Promise<boolean>=>{
  const findItem = await Auction.findByPk(itemID);
  const { reserve_price,highest_bid }:any = findItem;

  if(reserve_price<=highest_bid){
    const updatedItem = findItem as Auction;
    updatedItem.sold_item = userID;
    updatedItem.sold_status = 'sold';
    updatedItem.status = 'closed';
    await updatedItem.save();
    return true;
  }else{
    const updatedItem = findItem as Auction;
    updatedItem.sold_status = 'unsold';
    updatedItem.status = 'closed';
    await updatedItem.save();
    return false;
  }
};