let nodemailer = require('nodemailer');


exports.sendEmail = async function (req, res, next){
    
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        //secure: false,
        port:587,
        auth: {
            user: 'ayuda.apliaciones.interactivas@gmail.com',//poner cuenta gmail
            pass: 'vjhpdsuxiueugakw'  //contraseña cuenta  IMPORTANTE HABILITAR acceso apps poco seguras google
        }
     });
    // Definimos el email
    var mailOptions = {
        from: 'ayuda.apliaciones.interactivas@gmail.com',
        to: req.body.destinatario,
        subject: req.body.asunto,
        html: req.body.texto,
        
    };
    console.log("mail",mailOptions)
    // Enviamos el email
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    }
    catch(error)
    {
        console.log("Error envio mail: ",error);            
    }
};