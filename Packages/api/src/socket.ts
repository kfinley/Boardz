import io from "socket.io-client";
import { authToken } from './api';

//TODO: config this...
const SERVER_URL = "http://localhost:8085";

const socket = io(SERVER_URL);

export const Socket = socket;

// const auth = {
//   socket: undefined as undefined | SocketIOClient.Socket,
//   token: undefined as undefined | string,
// };

// function setAuthToken(token: string) {
//     auth.token = token;    
//     auth.socket = io(SERVER_URL.replace("//", `//${token}\@`));
// }

// export const on = socket.on;
// export const emit = ( event: string, ...args: any[] ) => {
    
//     if (auth.token) {
//         return auth.socket?.emit(event, args);
//     } else if (authToken()) {
//         setAuthToken(authToken() as string);
//         return auth.socket?.emit(event, args);
//     } else {
//         return socket.emit(event, args);
//     }
// }

