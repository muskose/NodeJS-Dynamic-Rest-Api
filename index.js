
// Init Config Params
var config_params = require('./config.js');

// Call Express
var express = require('express');

// Call Mongoose
var mongoose = require('mongoose');

// Init Database Object
var Database = require('./database.js')(mongoose);

// Init Route Models
var app_routes = require('./route_models.js')();

// Init Route Models
var utilities = require('./utilities.js')();

// Database Connection Variables & Connection
var conn_string = config_params.db_address+':'+config_params.db_port+'/'+config_params.db_name;
var conn_options = {
    db: { native_parser: true },
    server: { poolSize: 5 }
}
mongoose.connect(conn_string, conn_options);


// Define App Object
var app = express();

// For Post Variables
app.use(express.bodyParser());

// Set Trust Proxy For Proxy IPs
app.set("trust proxy", true);


// In Array Funcion
Array.prototype.in_array = function(p_val) {
    for(var i = 0, l = this.length; i < l; i++) {
        if(this[i] === p_val) {
            return true;
        }
    }
    return false;
};

// Home Route
app.get('/', function(req, res) {
    var response = 'digifan api v.0.1 alpha';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', response.length);
    res.end(response);
});

/**
 * Insert Route
 */
app.post("/insert", function(req, res) {

    if(!utilities.requester_check(req.ip)) {
        return false;
    }
    if(!app_routes.insert.check_and_get_fields(req.body)) {
        console.log("please check your fields");
        utilities.output(res, 400, 'please check your fields');
        return false;
    }
    var collectionName = app_routes.insert.rest_data.collection_name;
    if(Database.models[collectionName] === undefined) {
        console.log("collection does not exists");
        utilities.output(res, 400, 'collection does not exists');
        return false;
    }
    var information = JSON.parse(app_routes.insert.rest_data.information);
    if(!Database.check_data_fields(collectionName, information)) {
        console.log("data field validation error, please provide correct fields");
        utilities.output(res, 400, 'data field validation error, please provide correct fields');
        return false;
    }
    console.log("data field validation: true");
    Database.insert(collectionName, information, function(result) {
        if(!result) {
            console.log("insert error, please contact api guy, do not lose this log");
            utilities.output(res, 400, 'insert error, please contact api guy, do not lose this log');
            return true;
        }
        else {
            console.log("insert success, have a nice day");
            utilities.output(res, 200, 'insert success, have a nice day');
            return true;
        }
    });

});

/**
 * Update Route
 */
app.put("/update", function(req, res) {

    if(!utilities.requester_check(req.ip)) {
        return false;
    }
    if(!app_routes.update.check_and_get_fields(req.body)) {
        console.log("please check your fields");
        output(res, 400, 'please check your fields');
        return false;
    }
    var collectionName = app_routes.update.rest_data.collection_name;
    if(Database.models[collectionName] === undefined) {
        console.log("collection does not exists");
        output(res, 400, 'collection does not exists');
        return false;
    }
    var rules = JSON.parse(app_routes.update.rest_data.rules);
    if(!Database.rule_validation(collectionName, rules)) {
        console.log("rule validation error, your field(s) does not exists in api");
        output(res, 400, 'rule validation error, your field(s) does not exists in api');
        return false;
    }
    console.log("rule validation: true");
    var information = JSON.parse(app_routes.update.rest_data.information);
    if(!Database.information_validation(collectionName, information)) {
        console.log("information validation error, your field(s) does not exists in api");
        output(res, 400, 'information validation error, your field(s) does not exists in api');
        return false;
    }
    console.log("information validation: true");
    var condition = Database.condition_parser(rules);
    if(!condition) {
        console.log("condition validation error, your sql operator has not supported yet");
        output(res, 400, 'condition validation error, your sql operator has not supported yet');
        return false;
    }
    console.log("condition validation: true");
    Database.update(collectionName, information, condition, function(result) {
        if(!result) {
            console.log("update error, please contact api guy, do not lose this log");
            output(res, 400, 'update error, please contact api guy, do not lose this log');
        }
        else {
            console.log("update success, have a nice day");
            output(res, 400, 'update success, have a nice day');
        }
    });

});

/**
 * Update Route
 */
app.del("/delete", function(req, res) {

    if(!utilities.requester_check(req.ip)) {
        return false;
    }
    if(!app_routes.delete.check_and_get_fields(req.body)) {
        console.log("please check your fields");
        output(res, 400, 'please check your fields');
        return false;
    }
    var collectionName = app_routes.delete.rest_data.collection_name;
    if(Database.models[collectionName] === undefined) {
        console.log("collection does not exists");
        output(res, 400, 'collection does not exists');
        return false;
    }
    var rules = JSON.parse(app_routes.delete.rest_data.rules);
    if(!Database.rule_validation(collectionName, rules)) {
        console.log("rule validation error, your field(s) does not exists in api");
        output(res, 400, 'rule validation error, your field(s) does not exists in api');
        return false;
    }
    console.log("rule validation: true");
    var condition = Database.condition_parser(rules);
    if(!condition) {
        console.log("condition validation error, your sql operator has not supported yet");
        output(res, 400, 'condition validation error, your sql operator has not supported yet');
        return false;
    }
    console.log("condition validation: true");
    Database.delete(collectionName, condition, function(result) {
        if(result === false) {
            console.log("delete error, please contact api guy, do not lose this log");
            output(res, 400, 'update error, please contact api guy, do not lose this log');
        }
        else {
            console.log("delete success, "+result+" record(s) deleted, have a nice day");
            output(res, 400, 'delete success, '+result+' record(s) deleted, have a nice day');
        }
    });

});

/**
 * Update Route
 */
app.get("/select", function(req, res) {

    if(!utilities.requester_check(req.ip)) {
        return false;
    }
    if(!app_routes.select.check_and_get_fields(req.body)) {
        console.log("please check your fields");
        output(res, 400, 'please check your fields');
        return false;
    }
    var collectionName = app_routes.select.rest_data.collection_name;
    if(Database.models[collectionName] === undefined) {
        console.log("collection does not exists");
        output(res, 400, 'collection does not exists');
        return false;
    }
    var rules = JSON.parse(app_routes.select.rest_data.rules);
    if(!Database.rule_validation(collectionName, rules)) {
        console.log("rule validation error, your field(s) does not exists in api");
        output(res, 400, 'rule validation error, your field(s) does not exists in api');
        return false;
    }
    console.log("rule validation: true");
    var condition = Database.condition_parser(rules);
    if(!condition) {
        console.log("condition validation error, your sql operator has not supported yet");
        output(res, 400, 'condition validation error, your sql operator has not supported yet');
        return false;
    }
    console.log("condition validation: true");
    Database.select(collectionName, condition, function(result) {
        if(result === false) {
            console.log("select error, please contact api guy, do not lose this log");
            output(res, 400, 'select error, please contact api guy, do not lose this log');
        }
        else {
            console.log("select success, "+result.length+" record(s) found, have a nice day");
            output(res, 400, 'select success, '+result.length+' record(s) found, have a nice day', result);
        }
    });

});

/**
 *
 * Start App
 */
app.listen(8007);
console.log('Listening on port 8007');
