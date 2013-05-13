
module.exports = function(mongoose) {
    var obc = {
        'version':'0.1.0',
        'database_name':'test_database',
        'mongoose':mongoose,
        'models':[],
        'collections':{
            'users':{
                'user_id':Number,
                'user_name':String,
                'user_surname':String,
                'user_address':String
            },
            'books': {
                'book_id':Number,
                'book_name':String,
                'book_author':String,
                'book_price':String
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
