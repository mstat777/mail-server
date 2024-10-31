import { Router } from "express";
import { sendMail } from "../controller/sendmail";
import { validationRules, validateResult } from "../middlewares/validate";

const router = Router();

router.post("/sendmail", 
        validationRules('sendMail'),
        validateResult,
        sendMail
); 

export default router;