import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import router from './router/index.routes';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const PORT = process.env.LOCAL_PORT;

var whitelist = ['https://dimitarstatev.com', 'http://127.0.0.1:3000'];
var corsOptions = function (req: any, callback: any) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    }else{
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptions))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use("/api/v1", router);

app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ msg: "not found" });
});

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));