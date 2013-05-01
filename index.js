/**
 *
 * Call Express
 */
var express = require('express');
/**
 *
 * Call Mongoose
 */
var mongoose = require('mongoose');
/**
 *
 * Call Database
 */
var Database = require('./database.js');
Database.mongoose = mongoose;
/**
 *
 * Connect Database
 */
mongoose.connect('mongodb://127.0.0.1:27017');
/**
 *
 * Check If Connection is OK
 */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("connected to mongo");
});
/**
 *
 * Define App Object
 */
var app = express();
app.use(express.bodyParser());
/**
 *
 * Home Route
 */
app.get('/', function(req, res){
  var body = 'Hello Digifan';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
/**
 *
 * Insert Route
 */
app.post("/users/insert_friend", function(req, res) {

    var required_fields  = ['info'];
    var validation       = true;

    for (var i = 0; i < required_fields.length; i++) {
        if(req.body[required_fields[i]] == undefined) {
            validation = false;
        }
    }

    if(validation) {
        var info = req.body.info;
        info = JSON.parse(info);
        var schema = '';
        for(var field in info) {
            schema = schema+field+':';
            for(dataType in info[field]) {
                schema = schema+dataType+',';
            }
        }
        schema = schema.substr(0, schema.length-1);
        schema = '{'+schema+'}';

        Database.schema_builder("testing_table", schema);

        /*
        Database.schema_builder("digifan_user_friends", Structure);

        var Information = {
            "user_ID": req.body.user_ID,
            "friend_type":req.body.friend_type,
            "friend_id":req.body.friend_id,
            "friend_name":req.body.friend_name,
            "friend_screen_name":req.body.friend_screen_name
        };

        Result = 'insert error';
        if(Database.insert("digifan_user_friends", Information)) {
            Result = '1';
        }
        */


    }
    else {

    }

    var Result = 'asdasd';

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Result.length);
    res.end(Result);

});


/**
 *
 * Update Route
 *

app.put("/users/update_friend", function(req, res) {

    res.setHeader('Content-Type', 'text/plain');

    var required_vars = ["rules","updateinfo"];

    var validation = true;

    for (var i = 0; i < required_vars.length; i++) {
        //console.log(req.body[required_vars[i]]);
        if(req.body[required_vars[i]] == undefined) {
            validation = false;
        }
    }

    var result = '';
    if(validation) {
        var rules = req.body.rules;
        var updateinfo = req.body.updateinfo;
        Database.update("digifan_user_friends", rules, updateinfo);
    }
    else {
        result = 0;
    }
    res.setHeader('Content-Length', result.length);
    res.end(result);
});
 */

app.listen(4003);
console.log('Listening on port 4003');