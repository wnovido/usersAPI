var express = require('express');
var router = express.Router();
var md5 = require('MD5');

/* GET users listing. */
router.get('/', function(req, res) {
  // res.send('respond with a resource xxx' + tmp);
	var data = {
	    "error":1,
	    "Users":""
	};

	connection.query("SELECT * from user_login",function(err, rows, fields) {
	    if(rows.length != 0){
	        data["error"] = 0;
	        data["Users"] = rows;
	        res.json(data);
	    }else{
	        data["Users"] = 'No Users Found..';
	        res.json(data);
	    }
	});

});

router.post('/',function(req,res){	
    var Email = req.body.email;
    var Pword = md5(req.body.password);

    var data = {
        "error":1,
        "Books":""
    };
    if (!!Email && !!Pword) {
        connection.query("INSERT INTO user_login (user_email, user_password) VALUES(?,?)",[Email,Pword],function(err, rows, fields){
            if (!!err) {
                data["Users"] = "Error Adding data: " + err;
                console.log(err);
            } else {
                data["error"] = 0;
                data["Users"] = "User Added Successfully";
            }
            res.json(data);
        });
    } else {
        data["Users"] = "Please provide all required data (i.e : Email, Password)";
        res.json(data);
    }
});

module.exports = router;
