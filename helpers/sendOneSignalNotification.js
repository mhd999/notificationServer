var request = require('request'),
    config  = require('../config/config');

var options = {
    url: 'https://onesignal.com/api/v1/notifications',
    json: true,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + config.oneSignalKey
    }
};

module.exports = function(notificationText, tag, url, callback){
        var rec;
        options.body = {
            app_id: config.oneSignalId,
            contents: {'en': notificationText},
            tags: [tag],
            url: url
        };

        request.post(options, function(error, response, body){
            if(error)
                console.log(error);
            else
                callback(body);
        });

};