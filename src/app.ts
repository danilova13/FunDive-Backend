import express, { Request, Response } from 'express';
import { graphqlServer } from './graphqlServer';

const app = express();
const port = 8000;


async function startApolloServer() {
    // middleware to parse JSON request bodies
    app.use(express.json());

    await graphqlServer.start();
    
    // apply Apollo GrapqhQL middleware
    graphqlServer.applyMiddleware({app, path: '/graphql'});

    // health check route
    app.get('/health', (req: Request, res: Response) => {
        res.status(200).json("All good da hood!!!");
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

startApolloServer();

