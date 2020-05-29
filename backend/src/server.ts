import app from './app';
import { createServer } from 'http';


const server = createServer(app.callback());

server.listen('3333', () => {
    console.log('server on');
});