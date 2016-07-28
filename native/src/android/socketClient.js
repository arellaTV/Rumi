import './UserAgent';
import io from 'socket.io-client/socket.io';

var socket = io('http://138.68.14.133:3000', {
  transports: ['websocket']
});

export default socket;
