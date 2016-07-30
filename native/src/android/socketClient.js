import './UserAgent';
import io from 'socket.io-client/socket.io';
import host from './env';
var socket;

function connectSocket(auth) {
  socket = io(host, {
    transports: ['websocket'],
    query: 'auth=' + auth
  });
}

function getSocket() {
  if (socket) {
    return socket;
  } else {
    throw 'socket not connected';
  }
}

export { connectSocket, getSocket };
