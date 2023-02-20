let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addRoom', (req, res) => {

	let connection = mysql.createConnection(config);
	let addRoomSQL = `INSERT INTO zzammit.Room (roomName) VALUES (?)`;
	let addRoomData = [req.body.roomName];

	// console.log(req.body);

	connection.query(addRoomSQL, addRoomData, (error, results, fields) => { 
		if (error) {
			console.log(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addUserToNewRoom', (req, res) => {

	let connection = mysql.createConnection(config);
	let addRoomSQL = `UPDATE zzammit.Roomate SET idRoom = (SELECT MAX(id) FROM zzammit.Room) WHERE firebaseUID = (?);`;
	let addRoomData = [req.body.firebaseUID];

	// console.log(req.body);

	connection.query(addRoomSQL, addRoomData, (error, results, fields) => { 
		if (error) {
			console.log(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addUserToExistingRoom', (req, res) => {

	let connection = mysql.createConnection(config);
	let addRoomSQL = `UPDATE zzammit.Roomate SET idRoom = (?) WHERE firebaseUID = (?)`;
	let iaddRoomData = [req.body.idRoom, req.body.firebaseUID];

	// console.log(req.body);

	connection.query(addRoomSQL, iaddRoomData, (error, results, fields) => { 
		if (error) {
			console.log(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/addUser', (req, res) => {

	let connection = mysql.createConnection(config);
	let addUserSQL = `INSERT INTO zzammit.Roomate (idRoom, firstName, lastName, firebaseUID, owed) VALUES (-1, ?, ?, ?, 0)`;
	let addUserData = [req.body.firstName, req.body.lastName, req.body.firebaseUID];

	// console.log(req.body);

	connection.query(addUserSQL, addUserData, (error, results, fields) => { 
		if (error) {
			console.log(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
