
module.exports = function() {

    var obc = {
        'output': function(res, status, message, data) {
            var response = {
                'status':status,
                'message':message,
                'date': new Date(),
                'res_data':data
            };
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Length', JSON.stringify(response).length);
            res.end(JSON.stringify(response));
        },
        'requester_check': function (remote_address) {
            var safe_ips = [
                "127.0.0.1"
            ];
            console.log(remote_address);
            for(ip in safe_ips) {
                if(remote_address === safe_ips[ip]) {
                    return true;
                }
            }
            return false;
        }
    };

    return obc;

};