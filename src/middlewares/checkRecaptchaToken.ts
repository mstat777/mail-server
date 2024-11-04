import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const checkRecaptchaToken: any = async (req: Request, res: Response, next: NextFunction) => {
    const { captcha } = req.body;
    console.log(captcha);

    if (!captcha) {
        return res.status(400).json({msg: 'Please complete the CAPTCHA'});
    }

    console.log(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_SK}&response=${captcha}`);
    try {
        const result = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_SK}&response=${captcha}`,
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
            return res.status(403).json({msg: "ReCAPTCHA verification failed"});
        } else {
            console.log("ReCAPTCHA token is valid.");
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Error verifying ReCAPTCHA"});
    }
}