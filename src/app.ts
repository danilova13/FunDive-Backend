import express, { Request, Response } from 'express';
import { buildGraphQLServer } from './graphql/index';
import { UserDB } from './db/user';
import { initiateDB } from './db';
import { UserService } from './services/userService';
import { DiveService } from './services/diveService';
import { DiveDB } from './db/dive';
import { expressMiddleware } from '@apollo/server/express4';
import { context } from './auth/middleware';
import cors from 'cors';

// create new app
async function NewApp() {

    const app = express();
    // middleware to parse JSON request bodies
    app.use(express.json());
    app.use(cors());

    const pool = await initiateDB();
    const userDB = new UserDB(pool);
    const diveDB = new DiveDB(pool);
    const userService = new UserService(userDB);
    const diveService = new DiveService(diveDB);
    const graphqlServer = await buildGraphQLServer(userService, diveService);
    
    await graphqlServer.start();
    // apply Apollo GrapqhQL middleware
    app.use(
        express.json(),
        expressMiddleware(graphqlServer, {
            context
        }),
      );

    // health check route
    app.get('/health', (req: Request, res: Response) => {
        res.status(200).json("All good in da hood!!!");
    })

    return { app, pool };
}

export { NewApp };
