const { i18n } = require('./next-i18next.config')
module.exports = {
    future: {
        webpack5: true,
    },
    i18n,
    env: {
        enpoint: process.env.NEXT_PUBLIC_ENDPOINT
    }
}