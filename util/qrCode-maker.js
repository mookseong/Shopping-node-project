const QRCode = require('qrcode');

exports.createQRCode = (text) => {
    QRCode.toDataURL(text, (err, url) => {
        const data = url.replace(/.*,/, "");
        return new Buffer.from(data, "base64");
    });
};





















