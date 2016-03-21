var config = require('../config/config.js'),
	crypto = require('crypto');

  	bucket = config.S3_BUCKET_ITEMS,
    awsKey = config.S3_AWSKEY,
    secret = config.S3_SECRET;

   exports.sign = function(req, res, next) {

    var fileName = req.body.fileName,
        expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString();

    var policy =
    { "expiration": expiration,
        "conditions": [
            {"bucket": bucket},
            {"key": fileName},
            {"acl": 'private'},
            ["starts-with", "$Content-Type", ""],
            ["content-length-range", 0, 524288000]
        ]};

    policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
    signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');
    // var response = {bucket: bucket, awsKey: awsKey, policy: policyBase64, signature: signature};
    res.send({bucket: bucket, awsKey: awsKey, policy: policyBase64, signature: signature});
}