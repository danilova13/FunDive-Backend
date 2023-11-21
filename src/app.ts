import express, { Request, Response } from 'express';
import { buildGraphQLServer } from './graphql/index';
import { UserDB } from './db/user';
import { initiateDB } from './db';
import { UserService } from './services/userService';

// create new app
async function NewApp() {

    const app = express();
    // middleware to parse JSON request bodies
    app.use(express.json());

    const pool = await initiateDB()
    const userDB = new UserDB(pool);
    const userService = new UserService(userDB);
    const graphqlServer = await buildGraphQLServer(userService);
    
    await graphqlServer.start();
    // apply Apollo GrapqhQL middleware
    graphqlServer.applyMiddleware({app, path: '/graphql'});

    // health check route
    app.get('/health', (req: Request, res: Response) => {
        res.status(200).json("All good in da hood!!!");
    })

    return app;
}

export { NewApp };
