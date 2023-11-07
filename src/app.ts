import express, { Request, Response } from 'express';

const app = express();
const port = 8000;

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json("All good in da hood");
})

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port http://localhost:${port}`)
})
