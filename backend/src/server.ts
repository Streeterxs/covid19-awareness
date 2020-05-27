import app from './app';
import { createServer } from 'http';


const server = createServer(app.callback());

server.listen('3232', () => {
    console.log('server on');
});