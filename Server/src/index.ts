import { SocketServer } from './server';

let app = new SocketServer().getApp();
export { app };