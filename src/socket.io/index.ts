import { Server } from 'socket.io';
import eventHandler from './eventHandler' ;
import http from 'node:http';

export default (server:http.Server)=>{
  const io:Server = new Server(server);
  eventHandler(io);
};