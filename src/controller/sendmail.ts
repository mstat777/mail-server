import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

export const sendMail = async (req: Request, res: Response): Promise<any> => {
    try {
        const name = req.body.userName;
        const email = req.body.userEmail;
        const message = req.body.userMessage;
        const mail = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: 'New Message from Statev Mail Server',
            text: `From : ${name} \n email : ${email} \n message : ${message}`,
            html:  `<b>From :</b> ${name} &lt;${email}&gt;
                    <b>Email :</b> ${email}
                    <b>Message :</b>
                    <div>${message}</div>`
        }
        const transport = {
            host: "smtp.titan.email",
            port: 465,
            secure: true, 
            tls: {
                rejectUnauthorized: false,
            },
            requireTLS: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PWD
            }
        }
        const transporter = nodemailer.createTransport(transport);
        
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                res.status(400).json({msg: 'fail'});
            } else {
                res.status(201).json({msg: 'success'});
            }
        });
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take messages');
            }
        });
    } catch (err) {
        return res.status(500).json({err});
    }
}