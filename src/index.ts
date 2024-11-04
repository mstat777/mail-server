import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import router from './router/index.routes';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const PORT = process.env.LOCAL_PORT;

var whitelist = ['https://dimitarstatev.com', 'http://127.0.0.1:3000']
var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use("/api/v1", router);

app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ msg: "not found" });
});

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));