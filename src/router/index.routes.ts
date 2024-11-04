import { Router } from "express";
import { sendMail } from "../controller/sendmail";
import { validationRules, validateResult } from "../middlewares/validate";
import { checkRecaptchaToken } from "../middlewares/checkRecaptchaToken";

const router = Router();

router.post("/sendmail", 
        checkRecaptchaToken,
        validationRules('sendMail'),
        validateResult,
        sendMail
); 

export default router;