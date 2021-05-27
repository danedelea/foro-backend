module.exports = {
    PORT: process.env.PORT || 4000,
    SERVER: "http://localhost:4200",
    SECRET_KEY_TOKEN: "7MLicZ?5(;v&(Rd|8kCA",
    SECRET_KEY_CRYPTO: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
    ALGORITH: "aes-256-cbc",
    TOKEN_HEADER: "accesstoken",
    FAIL_RESULT: "NOK",
    SUCCESSFUL_RESULT: "OK",
    CARD_TYPE_1: "normal",
    CARD_TYPE_2: "people",
    PASSWORD: null || 'no password',
    get MESSAGE () { 
        return `
        <html lang="en"> <head> <meta charset="utf-8"> <base href="/"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style>.container{border: 2px gray solid; border-radius: 15px; padding: 3em;}.title{color: #ff6666; margin-top: 0;}.subtitle{color: #6d6d6d;}.text-password{color: black;}.text-new-password{color: #6d6d6d;}hr{border: none; background-color: #6d6d6d; height: 2px; margin: 2em 0; border-radius: 50px;}.div-info{margin-top: 2em; color: #6d6d6d;}</style> </head> <body> <div> <div class="container"> <h1 class="title">Recuperaci&oacute;n de contrase&ntilde;a</h1> <h2 class="subtitle">Se ha generado una nueva contrase&ntilde;a para tu cuenta.</h2> <h3 class="text-password">Tu contrase&ntilde;a actual es:</h3> <div class="text-new-password"> ${this.PASSWORD}</div><hr/> <div class="div-info"><small> <i> Este correo se ha generado de forma autom&aacute;tica, por favor, no respondas porque no te llegar&aacute; ninguna respuesta </i>♥.<br/><br/>Con cari&ntilde;o, el equipo de <i>Tinder Unizar</i>. </small></div></div></div></body> </html>
        `;
    },
    TINDER_UNIZAR_EMAIL: "tinder.unizar.help@gmail.com",
    SUBJECT: "No reply - Password recovery",
};