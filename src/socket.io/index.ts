import { Server } from 'socket.io';
import eventHanler from './eventHanler' ;
// import { Express } from 'express';
import http from 'node:http';

export default (server:http.Server)=>{
  const io:Server = new Server(server);
  // io.on('connection',(socket)=>{
  //   console.log('User connected');
  // });
  eventHanler(io);
//   console.log('sdsd')
};

// export default class SocketIO{
//   public io:Server;
//   constructor(app:Express){
//     const server = createServer(app);
//     this.io = new Server(server);
//     this.io.on('connection',()=>{
//       console.log('User connected');
//     });
//   }
// }