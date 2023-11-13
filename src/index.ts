import { NewApp } from "./app";

const port = 8000;

// start the server 
async function startServer() {
    const app = await NewApp();
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
}

startServer();