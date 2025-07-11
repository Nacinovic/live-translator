import * as dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http';

import expressApp from './express'
import initializeSocketServer from './socket';
import initializeDB from './models/database';


const server = createServer(expressApp)

initializeSocketServer(server)
const PORT = process.env.PORT;

server.listen(PORT, async () => {
  await initializeDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});
