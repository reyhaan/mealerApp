const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const calculateQuota = () => {
    return new Promise((resolve) => {
        resolve(null)
    })
};

exports.merchantQuotaUpdate = functions.database.ref('/orders/{merchantId}')
    .onWrite(event => {
        console.log(event.params);
        console.log(event.data.val());
        console.log("test");

        return calculateQuota;
    });