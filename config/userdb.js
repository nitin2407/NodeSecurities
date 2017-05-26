var mysql = require('mysql');

var pool = require('./ConnectionPool');

function select_emp(req, res, data) {

    var emp_id = data;
    
    pool.getConnection(function (err, connection) {
        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from p_mstr_employee where emp_id = ?",emp_id, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
                console.log(rows);
            }
        });

        connection.on('error', function (err) {
            res.status(400);
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        });
    });
}

/*function login(req, res, data){
    var username = data.username;
    var pass = data.password;

    pool.getConnection(function (err, connection) {
        if (err) {
            res.status(400);
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from p_mstr_employee where emp_id = ?",emp_id, function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
                console.log(rows);
            }
        });

        connection.on('error', function (err) {
            res.status(400);
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        });
    });

}*/


function login(email,password,req, done) {
    
    pool.getConnection(function (err, connection) {
                if (err) {
                    return done(err, req.flash('ErrorMessage', 'Error in connection database.'));
                }

                console.log('connected as id ' + connection.threadId);

                connection.query("select * from emp where email = ?", email, function (err, rows) {
                    connection.release();
                    if (!err) {
                        if (!rows.length) {
                            return done(err, req.flash('ErrorMessage', 'No user found.'));
                        }
                        if (!(rows[0].password == password))
                            return done(err, req.flash('ErrorMessage', 'Oops! Wrong password.'));

                        return done(null, rows[0]);
                    }
                });

                connection.on('error', function (err) {
                    return done(err, req.flash('ErrorMessage', 'Error in connection database.'));
                });
            });
    
    /*pool.getConnection(function (err, connection) {
        if (err) {
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from p_mstr_employee where emp_id = ?",emp_id, function (err, rows) {
            connection.release();
            if (!err) {
                //res.json(rows);
                //console.log(rows);
            }
        });

        connection.on('error', function (err) {
            res.status(400);
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        });
    });*/
}

function find_emp(email,req, done) {
    
    pool.getConnection(function (err, connection) {
                if (err) {
                    return done(err, req.flash('ErrorMessage', 'Error in connection database.'));
                }

                console.log('connected as id ' + connection.threadId);

                connection.query("select * from emp where email = ?", email, function (err, rows) {
                    connection.release();
                    if (!err) {
                        if (!rows.length) {
                            return done(err, req.flash('ErrorMessage', 'No user found.'));
                        }
                        return done(null, rows[0]);
                    }
                });

                connection.on('error', function (err) {
                    return done(err, req.flash('ErrorMessage', 'Error in connection database.'));
                });
            });

}

function register(email,password,req, done) {
    
    pool.getConnection(function (err, connection) {
                if (err) {
                    return done(err, req.flash('ErrorMessage', 'Error in connection database.'));
                }

                console.log('connected as id ' + connection.threadId);

                connection.query("Insert into emp values(null,?,?,?,?)", [email,password,req.body.fname,req.body.lname], function (err, result) {
                    connection.release();
                    if (!err) {
                        if (result<=0) {
                            return done(err, req.flash('ErrorMessage', 'User already exists'));
                        }
                        return done(null, result);
                    }
                });

                connection.on('error', function (err) {
                    return done(err, req.flash('ErrorMessage', 'Error in connection database.'));
                });
            });

}




module.exports = {
    select_emp,
    login,
    find_emp,
    register
}