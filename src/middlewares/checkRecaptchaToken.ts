import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const checkRecaptchaToken: any = async (req: Request, res: Response, next: NextFunction) => {
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
            console.log("ReCAPTCHA token is NOT valid!!!");
            return res.status(403).json({msg: "Robot 🤖!!!"});
        } else {
            console.log("ReCAPTCHA token is valid.");
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Error verifying reCAPTCHA"});
    }
}