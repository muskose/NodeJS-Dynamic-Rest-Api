
module.exports = function() {
    var obc = {
        'routes': ['insert', 'update', 'select', 'delete'],
        'insert': {
            'needed_fields': ['collection_name', 'information'],
            'rest_data':{},
            'check_and_get_fields': function(req_body) {
                for(index in this.needed_fields) {
                    if((typeof this.needed_fields[index]) === "string") {
                        if(req_body[this.needed_fields[index]] === undefined) {
                            return false;
                        }
                        else {
                            var key = this.needed_fields[index];
                            this.rest_data[key] = req_body[this.needed_fields[index]];
                        }
                    }
                }
                return true;
            }
        },
        'update': {
            'needed_fields': ['collection_name', 'information', 'rules'],
            'rest_data':{},
            'check_and_get_fields': function(req_body) {
                for(index in this.needed_fields) {
                    if((typeof this.needed_fields[index]) === "string") {
                        if(req_body[this.needed_fields[index]] === undefined) {
                            return false;
                        }
                        else {
                            var key = this.needed_fields[index];
                            this.rest_data[key] = req_body[this.needed_fields[index]];
                        }
                    }
                }
                return true;
            }
        },
        'delete': {
            'needed_fields': ['collection_name', 'rules'],
            'rest_data':{},
            'check_and_get_fields': function(req_body) {
                for(index in this.needed_fields) {
                    if((typeof this.needed_fields[index]) === "string") {
                        if(req_body[this.needed_fields[index]] === undefined) {
                            return false;
                        }
                        else {
                            var key = this.needed_fields[index];
                            this.rest_data[key] = req_body[this.needed_fields[index]];
                        }
                    }
                }
                return true;
            }
        },
        'select': {
            'needed_fields': ['collection_name', 'rules'],
            'rest_data':{},
            'check_and_get_fields': function(req_body) {
                for(index in this.needed_fields) {
                    if((typeof this.needed_fields[index]) === "string") {
                        if(req_body[this.needed_fields[index]] === undefined) {
                            return false;
                        }
                        else {
                            var key = this.needed_fields[index];
                            this.rest_data[key] = req_body[this.needed_fields[index]];
                        }
                    }
                }
                return true;
            }
        }
    };
    return obc;
};