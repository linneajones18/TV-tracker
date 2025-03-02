const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing Middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// Parse application/json
app.use(bodyParser.json());


// static files
app.use(express.static('public'));

// templating engine - handlebars
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// connection pool
const pool = mysql.createPool({
   connectionLimit  : 100, //read documentation about what this means
   host             : process.env.DB_HOST,
   user             : process.env.DB_USER,
   password         : process.env.DB_PASSWORD,
   database         : process.env.DB_NAME
});


pool.getConnection((err, connection) => {
    if(err) throw err;  //not connected to database
    console.log('Database connected successfully.');
});


const routes = require('./server/routes/user');
app.use('/', routes);



app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});

