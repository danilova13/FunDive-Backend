import express, { Request, Response } from 'express';

const app = express();
const port = 8000;

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json("All good da hood!!!");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})