var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM account;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(account_id, callback) {
    var query = 'SELECT * FROM account WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

    exports.insert = function(params, callback) {
        // FIRST INSERT THE COMPANY
        var query = 'INSERT INTO account (first_name, last_name) VALUES (?, ?)';

        var queryData = [params.first_name];

        connection.query(query, params.company_name, function(err, result) {

            // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
            var company_id = result.insertId;

            // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
            var query = 'INSERT INTO company_address (company_id, address_id) VALUES ?';

            // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
            var companyAddressData = [];
            for(var i=0; i < params.address_id.length; i++) {
                companyAddressData.push([company_id, params.address_id[i]]);
            }

            // NOTE THE EXTRA [] AROUND companyAddressData
            connection.query(query, [companyAddressData], function(err, result){
                callback(err, result);
            });
        });


    }

    exports.delete = function(account_id, callback) {
        var query = 'DELETE FROM account WHERE account_id = ?';
        var queryData = [account_id];

        connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });


};