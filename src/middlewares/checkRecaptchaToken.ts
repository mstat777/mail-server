import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const checkRecaptchaToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    try {
        const result = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_SK}&response=${token}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': 'https://dimitarstatev.com',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            }
        );

        if (!result.data.success) {
            return res.status(403).send("Robot 🤖!!!");
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error verifying reCAPTCHA");
    }
}