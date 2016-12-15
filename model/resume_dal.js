var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM resume_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(resume_id, callback) {
    var query = 'SELECT * FROM resume_view WHERE resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });

}

    exports.insert = function(params, callback) {
        // FIRST INSERT THE COMPANY
        var query = 'INSERT INTO resume (resume_name) VALUES (?)';

        var queryData = [params.resume_name];

        connection.query(query, params.resume_name, function(err, result) {

            // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
            var resume_id = result.insertId;

            // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
            var query = 'INSERT INTO account_resume (resume_id, account_id) VALUES ?';

            // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
            var account_resumeData = [];
            for(var i=0; i < params.account_id.length; i++) {
                account_resumeData.push([resume_id, params.account_id[i]]);
            }

            // NOTE THE EXTRA [] AROUND companyAddressData
            connection.query(query, [resume_accountData], function(err, result){
                callback(err, result);
            });
        });


    }

    exports.delete = function(resume_id, callback) {
        var query = 'DELETE FROM resume WHERE resume_id = ?';
        var queryData = [resume_id];

        connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });

};
