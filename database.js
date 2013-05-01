
module.exports = {
    'mongoose':'',
    'version':'0.1.0',
    'output':function(message) {
        console.log(message);
    },
    'schema': '',
    'schema_builder': function(colleciton_name, structure) {
        console.log(structure);
        var struc = {user_ID: Number};
        this.schema = this.mongoose.Schema(struc, {collection: colleciton_name});
    },
    'insert': function(information) {
        var dynamicModel = mongoose.model('dynamicModel', this.schema);
        var infoObject = new dynamicModel(information);
        infoObject.save(function(err, infoObject) {
            if(err) {
                this.output('insert_error');
                console.log(err);
            }
            else {
                this.output('insert_succes');
            }
        });
    },
    'update': function(collection_name, rules, updateinfo) {
        return this.DB.collection(collection_name, function(err, collection) {
            if(err) {
                console.log(err);
            }

            rules = JSON.parse(rules);
            for(var field in rules) {
                console.log(field);
                for(var operator in rules[field]) {
                    console.log(operator);
                    console.log(rules[field][operator]);
                }
            }
        });
    }
};

