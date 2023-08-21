import { Socket } from 'socket.io';

let globalSocket: Socket | null = null;

export function setGlobalSocket(socket: Socket) {
  globalSocket = socket;
}

export function getGlobalSocket() {
  return globalSocket;
}