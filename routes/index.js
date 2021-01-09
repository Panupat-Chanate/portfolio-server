const express = require('express');
// const { isEmpty } = require('lodash');
const router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'panupat.chanate@gmail.com',
        pass: 'reaplord0'
    }
});
transporter.verify(function(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log("SMTP is ready");
    }
})

router.post('/send', (req, res, next) => {
    console.log(req.body)
    var name = req.body.name
    var email = req.body.email
    // var message = req.body.message
    var content = ` name: ${name} \n email: ${email} \n message: ${req.body.message}. `

    var mailOptions = {
        from: email,
        to: 'panupat.c@psru.ac.th',
        subject: 'ติดต่อมาจาก-Portfolio',
        text: content
    };

    transporter.sendMail(mailOptions, function(error, result){
    if (error) {
        console.log(error);
        res.json('เกิดข้อผิดพลาดบางอย่าง')
    } else {
        console.log('Email sent: ' + result.response);
        res.json('ภาณุพัฒน์ จะติดต่อกลับให้เร็วที่สุด')
    }
    })
});

module.exports = router;