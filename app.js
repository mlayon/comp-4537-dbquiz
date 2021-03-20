const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = process.env.PORT || 3000;
app.use(express.json());

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "webdev_dbquiz",
});

// Connect DB
db.connect(function (err) {
	if (err) {
		return console.error("error: " + err.message);
	}
	console.log("Connected to mysql db");
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// GET all questions
app.get("/questions", (req, res) => {
	let sql = `SELECT * FROM Question`;
	db.query(sql, (err, result) => {
		if (err) {
			return console.log("error: " + err.message);
		}
		console.log(JSON.parse(JSON.stringify(result)));
		res.send(result);
	});
});

// POST a new question
app.post("/questions", (req, res) => {
	// let data = JSON.parse(req.body[0])
	let question = req.body.question;
	let choices = req.body.choices;
	let answer = req.body.answer;

	console.log(req.body); // sent JSON

	// Insert new question
	let qid = 0;
	let sql = `INSERT INTO Question (Body) VALUES('${question}')`;
	db.query(sql, (err, result) => {
		if (err) {
			return console.log("error: " + err.message);
		}

		// Get inserted row's ID
		qid = result.insertId;

		// Insert new choices according to new question ID
		for (let i = 0; i < choices.length; i++) {
			let isAnswer = false;
			if (i == answer) {
				isAnswer = true;
			}

			let sql = `INSERT INTO Choice(Body, IsAnswer, QuestionID) VALUES('${choices[i]}', ${isAnswer}, ${qid})`;
			db.query(sql, (err, result) => {
				if (err) {
					return console.log("error: " + err.message);
				}
				console.log("creating a new Choice success");
			});
		}
	});
	res.end("post received");
});

// Update an existing question
app.put("/questions", (req, res) => {
	let sql = `UPDATE Question
           SET Body = ?
           WHERE QuestionID = ?`;

	let question = req.body.question;
	let id = req.body.id;
	let choices = req.body.choices;
	let answer = req.body.answer;
	let data = [question, id];

	console.log(req.body); // sent JSON

	db.query(sql, data, (err, result) => {
		if (err) {
			return console.log("error: " + err.message);
		}
		// Get inserted row's ID
		qid = result.insertId;

		// Insert new choices according to new question ID
		for (let i = 0; i < choices.length; i++) {
			let isAnswer = false;
			if (i == answer) {
				isAnswer = true;
			}

			let sql = `INSERT INTO Choice(Body, IsAnswer, QuestionID) VALUES('${choices[i]}', ${isAnswer}, ${qid})`;
			db.query(sql, (err, result) => {
				if (err) {
					return console.log("error: " + err.message);
				}
				console.log("creating a new Choice success");
			});
		}
		res.send("updating question success");
	});
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
