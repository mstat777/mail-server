import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validationRules: any = (method: string) => {
    switch (method) {
        case 'sendMail': {
            return [
                body('name')
                    .exists()
                    .matches(/^[a-zàâçéèêëîïôûùüÿñæœ .'-]*$/i),
                body('email')
                    .exists()
                    .isEmail()
                    .matches(
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    ),
                body('message')
                    .exists()
                    .escape()
                    .isLength({ min: 2, max: 600 })
            ];
        }
    }
}

export const validateResult: any = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    } else {
        next();
    }
}