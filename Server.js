var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());
var connection      =         mysql.createConnection({
	host        :         "localhost",
	user        :         "root",
	password    :         "",
	database     :         "me_chits"
});

connection.connect(function(error){
  if(error)
    {
      console.log("Problem with MySQL"+error);
    }
  else
    {
      console.log("Connected with Database");
    }
});

app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/pages'));

app.get('/', function (req,res){
	res.sendFile(__dirname + '/index.html');
});

app.post('/processLogin',function(req,res){
	var uN = req.body.userName;
	var pw = req.body.passWord;
	var role = req.body.userRole;
	if(role == 'a'){
		connection.query("SELECT * from admin_user_master WHERE userName='" + uN + "' and password='" + pw + "'",function(err,rows){
			if(err) {
				console.log("Problem with MySQL"+err);
			}
			else {
			  res.end(JSON.stringify(rows));
			}
		});
	}
});


var server = app.listen(3000,function(){
	console.log("It's started on PORT 3000");
});