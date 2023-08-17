import { Server } from 'socket.io';
import { EventEmitter } from 'events';

const emitter = new EventEmitter();
export default (io:Server)=>{
  io.of('/auction').on('connection',socket=>{
    console.log('User');
    socket.on('join',itemID=>{
      socket.join(`item-${itemID}`);
      console.log(`User a join a item-${itemID}`);
    });
    socket.on('sendmsg',(itemID,message)=>{
      socket.to(`item-${itemID}`).emit('send message',message);
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