import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const checkRecaptchaToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    try {
        const result = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_SK}&response=${token}`
        );

        if (!result.data.success) {
            res.send("Robot 🤖!!!");
        } else {
            res.send("Human 👨 👩");
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error verifying reCAPTCHA");
    }
}