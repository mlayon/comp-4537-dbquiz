const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = process.env.PORT || 3000;
app.use(express.json());

const db = mysql.createConnection({
	host: "glowhost.com",
	user: "mlayonco_root",
	password: "password",
	database: "mlayonco_quotes",
});

// Connect DB
db.connect(function (err) {
	if (err) {
		return console.error("error: " + err.message);
	}
	console.log("Connected to mysql db");
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods","*");
	next();
  });

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// GET all questions
app.get("/quotes", (req, res) => {
	let sql = `SELECT * FROM Quote`;
	db.query(sql, (err, result) => {
		if (err) {
			return console.log("error: " + err.message);
		}
		console.log(JSON.parse(JSON.stringify(result)));
		res.send(result);
	});
});

// GET most recent question
app.get("/quotes/recent", (req, res) => {
	let sql = `SELECT * from Quote ORDER BY QuoteID DESC LIMIT 1`;
	db.query(sql, (err, result) => {
		if (err) {
			return console.log("error: " + err.message);
		}
		console.log(JSON.parse(JSON.stringify(result)));
		res.send(result);
	});
});

// POST a new quote
app.post("/quotes", (req, res) => {
	let quote = req.body.Quote;
	let author = req.body.Author;

	console.log(req.body); // sent JSON

	// Insert new quote
	let sql = `INSERT INTO Quote (Body, Author) VALUES('${quote}', '${author}')`;
	db.query(sql, (err, result) => {
		if (err) {
			return console.log("error: " + err.message);
		}
		res.end("post received");
	});
});

// Update an existing question
app.put("/quotes", (req, res) => {
	let sql = `UPDATE Quote
           SET Body = ?, Author = ?
           WHERE QuoteID = ?`;

	let quote = req.body.Quote;
	let id = req.body.QuoteID;
	let author = req.body.Author;
	let data = [quote, author, id];

	console.log(req.body); // sent JSON

	db.query(sql, data, (err, result) => {
		if (err) {
			return console.log("error: " + err.message);
		}
		res.send("updating quote success");
	});
});

app.delete("/quotes", (req, res) => {
	let id = req.body.QuoteID;
	id = parseInt(id);
	let sql = `DELETE FROM Quote WHERE QuoteID = ?`;

	console.log(req.body); // sent JSON

	db.query(sql, id, (err, result) => {
		if (err) {
			return console.log("error: " + err.message);
		}
		res.send("deleting quote success");
	});
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
