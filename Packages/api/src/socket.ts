import io from 'socket.io-client';

//TODO: config this...
const SERVER_URL = 'http://localhost:8085';

const socket = io(SERVER_URL)

export const Socket = socket;