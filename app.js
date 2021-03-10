const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "webdev_dbquiz",
});

// Connect DB
db.connect(function (err) {
  if (err) {
      return console.error('error: ' + err.message);
  }
  console.log("Connected to mysql db");
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// GET all questions
app.get('/questions', (req, res) => {
  let sql = `SELECT * FROM Question`;
  let query = db.query(sql, (err, result) => {
      if (err) {
          return console.log('error: ' + err.message);
      }
      console.log(JSON.parse(JSON.stringify(result)));
      res.send(JSON.stringify(result));
  });
});

// app.post('/questions', (req, res) => {
  
// })


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})