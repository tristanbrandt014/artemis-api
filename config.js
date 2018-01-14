// @flow
export default {
    secret: process.env.SECRET || "test",
    database: {
        url: process.env.DB_URL || "mongodb://arte:123456@127.0.0.1:27017/artemis"
    },
    port: process.env.PORT || 3005,
    captchaSecret: process.env.CAPTCHA_SECRET || "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe" // use fake secret key provided here: https://developers.google.com/recaptcha/docs/faq
}