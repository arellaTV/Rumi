import './UserAgent';
import io from 'socket.io-client/socket.io';

var socket;

function connectSocket(auth) {
  socket = io('http://138.68.14.133:3000', {
    transports: ['websocket'],
    extraHeaders: {
      Authorization: auth
    }
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
