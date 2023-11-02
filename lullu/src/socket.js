import { io } from 'socket.io-client';
const URL = 'https://lullumalls-c1fcb9537153.herokuapp.com/';

export const socket = io(URL, {
    autoConnect: false
  });
