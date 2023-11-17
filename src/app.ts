import express, { Request, Response } from 'express';
import { graphqlServer } from './graphql/index';

// create new app
async function NewApp() {

    const app = express();
    // middleware to parse JSON request bodies
    app.use(express.json());

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
