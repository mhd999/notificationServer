var request 				= require('request'),
	config					= require('../config/config'),
	sendPushNotification 	= require('../helpers').sendOneSignalNotification;


module.exports.creatNotification = function (req, res, next) {
	sendPushNotification(req.body.message, req.body.tag, req.body.reward_id, function(data) {
		console.log('push numbers', data.recipients);
		res.status(200).json({message: "notification sent", recipients: data.recipients});
	});
	next();
};