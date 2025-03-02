const mysql = require('mysql2');

// connection pool
const pool = mysql.createPool({
   connectionLimit  : 100, //read documentation about what this means
   host             : process.env.DB_HOST,
   user             : process.env.DB_USER,
   password         : process.env.DB_PASSWORD,
   database         : process.env.DB_NAME
});

// view users
exports.view = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err;  //not connected to database
        console.log('Database connected successfully.');

        connection.query('SELECT * FROM userinfo;', (err, rows) => {
            // when done with connection, release it
            connection.release();
            if(!err){
                res.render('pages/home', { rows });
            }
            else {
                console.log(err);
            }

            console.log('The data from user table \n', rows);
        });
    });



};