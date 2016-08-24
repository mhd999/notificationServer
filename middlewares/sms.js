var config	= require('../config/config'),
	twilio 	=  require('twilio')(config.twilioAccountSid, config.twilioAuthToken);

module.exports.createSms = function (req, res) {

	var client = twilio;

	client.messages.create({
	    body: req.body.message,
	    to: 'TO',
	    from: config.twilioNumber
	}, function(err, message) {
		if (err) console.log(err);
	    console.log('SMS', message.sid);
	});
};