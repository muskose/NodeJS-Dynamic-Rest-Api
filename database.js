
module.exports = function(mongoose) {
    var obc = {
        'version':'0.1.0',
        'database_name':'digifan',
        'mongoose':mongoose,
        'models':[],
        'collections':{
            'digifan_user_facebook_friends':{
                'user_id':Number,
                'friend_id':Number,
                'friend_name':String,
                'friend_screen_name':String
            },
            'digifan_user_twitter_friends':{
                'user_id':Number,
                'friend_id':Number,
                'friend_name':String,
                'friend_screen_name':String
            },
            'digifan_complaint_mails':{
                'cmail_id':Number,
                'cmail_type':String,
                'cmail_mail':String,
                'cmail_time':String
            },
            'digifan_mail_responses':{
                'mail_response_id':Number,
                'user_id':Number,
                'mail_response_mail_address':String,
                'mail_response_is_viewed':Number,
                'mail_response_from_mail':String,
                'mail_response_from_name':String,
                'mail_response_mail_content':String,
                'mail_response_mail_subject':String,
                'mail_response_created_date':String,
                'rtask_id':Number,
                'mail_response_check_code':String
            },
            'digifan_pending_tasks':{
                'ptask_id':Number,
                'responder_id':Number,
                'user_id':Number,
                'ptask_added_date':String,
                'ptask_date':String,
                'ptask_data':String,
                'ptask_status':Number
            },
            'digifan_short_url':{
                'url_id':Number,
                'user_id':Number,
                'url_code':String,
                'url_link':String,
                'url_data':String,
                'url_created_time':String
            },
            'digifan_bounce_mails':{
                'bmail_id':Number,
                'bmail_mail':String,
                'bmail_type':String,
                'bmail_time':String
            },
            'digifan_blocked_mails':{
                'block_id':Number,
                'user_id':Number,
                'block_mail':String,
                'block_reason':String,
                'block_time':String
            },
            'digifan_user_points':{
                'score_id':Number,
                'user_id':Number,
                'score_created_date':String,
                'task_id':Number,
                'module_id':Number,
                'unique_id':Number,
                'related_user_id':Number,
                'score':Number
            }
        },
        'set_models': function(callback) {
            for(collectionName in this.collections) {
                this.set_collection_model(collectionName);
            }
            if(callback) {
                callback(this.models);
            }
        },
        'set_collection_model': function(collectionName) {
            var schema = this.mongoose.Schema(this.collections[collectionName], {collection: collectionName});
            this.models[collectionName] = this.mongoose.model(collectionName, schema);
        },
        'rule_validation': function(collection_name, rules) {
            var rule_fields = [];
            for(field in rules) {
                rule_fields.push(field);
            }
            var schema = this.collections[collection_name];
            var fields = [];
            for(var field in schema) {
                fields.push(field);
            }
            for(index in rule_fields) {
                if((typeof rule_fields[index]) === "string") {
                    if(!fields.in_array(rule_fields[index])) {
                        return false;
                    }
                }
            }
            return true;
        },
        'check_data_fields': function(collection_name, information) {
            var schema = this.collections[collection_name];
            var schema_fields = [];
            for(field in schema) {
                schema_fields.push(field);
            }
            var posted_fields = [];
            for(field in information) {
                posted_fields.push(field);
            }
            for(index in posted_fields) {
                if((typeof posted_fields[index]) === "string") {
                    if(!schema_fields.in_array(posted_fields[index])) {
                        return false;
                    }
                }
            }
            for(index in schema_fields) {
                if((typeof schema_fields[index]) === "string") {
                    if(!posted_fields.in_array(schema_fields[index])) {
                        return false;
                    }
                }
            }
            return true;
        },
        'information_validation': function(collection_name, information) {
            var information_fields = [];
            for(field in information) {
                information_fields.push(field);
            }
            var schema = this.collections[collection_name];
            var fields = [];
            for(var field in schema) {
                fields.push(field);
            }
            for(index in information_fields) {
                if((typeof information_fields[index]) === "string") {
                    if(!fields.in_array(information_fields[index])) {
                        return false;
                    }
                }
            }
            return true;
        },
        'condition_parser': function(rules) {
            var updateCondition = {};
            for(item in rules) {
                var counter = 0;
                for(operator in rules[item]) {
                    if((operator != '<') && (operator != '>') && (operator != '=')) {
                        return false;
                    }
                    else {
                        var updateObject = {};
                        switch (operator) {
                            case ">":
                                value = rules[item][operator];
                                operator = '$gt';
                                updateObject = {};
                                updateObject[operator] = value;
                                updateCondition = {};
                                updateCondition[item] = updateObject;
                                break;
                            case "<":
                                value = rules[item][operator];
                                operator = '$lt';
                                updateObject = {};
                                updateObject[operator] = value;
                                updateCondition = {};
                                updateCondition[item] = updateObject;
                                break;
                            case "=":
                                value = rules[item][operator];
                                operator = '$eq';
                                updateObject = {};
                                updateObject[operator] = value;
                                updateCondition = {};
                                updateCondition[item] = value;
                                break;
                        }
                    }
                    counter ++;
                    if(counter == 1) {
                        break;
                    }
                }
            }
            return updateCondition;
        },
        'insert': function(collection_name, information, callback) {
            var model = this.models[collection_name];
            var insert_object = model(information);
            insert_object.save(function(err) {
                if(err) {
                    console.log(err);
                    callback(false);
                }
                else {
                    callback(true);
                }
            });
        },
        'update': function(collection_name, information, condition, callback) {
            this.models[collection_name].update(
                condition,
                information,
                { multi: true },
                function(err, data) {
                    if(err) {
                        console.log(err);
                        callback(false);
                    }
                    else {
                        callback(true);
                    }
                }
            );
        },
        'delete': function(collection_name, condition, callback) {
            this.models[collection_name].remove(
                condition,
                function(err, data) {
                    if(err) {
                        console.log(err);
                        callback(false);
                    }
                    else {
                        callback(data);
                    }
                }
            );
        },
        'select': function(collection_name, condition, callback) {
            this.models[collection_name].find(
                condition,
                {},
                { multi: true },
                function(err, data) {
                    if(err) {
                        console.log(err);
                        callback(false);
                    }
                    else {
                        callback(data);
                    }
                }
            );
        }
    };
    obc.set_models();
    return obc;
};
