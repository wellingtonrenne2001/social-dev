import { app } from './app';

const port = Number.parseInt(process.env.SERVER_PORT as string) || 3333;
app.listen(port, () => console.log(`Listening on port ${port}`));
