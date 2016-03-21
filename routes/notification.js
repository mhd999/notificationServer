var express	 	= require('express'),
    router  	= express.Router(),
    nMiddleware = require('../middlewares/notification'),
    sMiddleware = require('../middlewares/sms'),
    request 	= require('request');

router.route('/')
    .post(nMiddleware.creatNotification, sMiddleware.createSms);

module.exports = router;