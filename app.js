var express 			= require('express'),
	bodyParser 			= require('body-parser'),
	notificationRoutes	= require('./routes/notification'),
	awsServices			= require('./services/aws'),
	cors 				= require('cors');
var app = express();

app.use(bodyParser.json());


var whitelist = ['http://localhost:9090', 'http://localhost:9090/#/', 'http://localhost:9090/', 'http://localhost:8080', 'http://localhost:8080/#/'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};
app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api/notification', notificationRoutes);
app.post('/api/aws', awsServices.sign);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});