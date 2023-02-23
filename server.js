//ec2-18-216-101-119.us-east-2.compute.amazonaws.com

let mysql = require("mysql");
let config = require("./config.js");
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/loadUserSettings", (req, res) => {
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

app.post("/api/addRoom", (req, res) => {
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

app.post("/api/addUserToNewRoom", (req, res) => {
  let connection = mysql.createConnection(config);
  let addRoomSQL = `UPDATE zzammit.Roomate SET idRoom = (SELECT MAX(id) FROM zzammit.Room) WHERE firebaseUID = (?)`;
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

app.post("/api/addUserToExistingRoom", (req, res) => {
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

app.post("/api/addUser", (req, res) => {
  let connection = mysql.createConnection(config);
  let addUserSQL = `INSERT INTO zzammit.Roomate (idRoom, firstName, lastName, firebaseUID, owed) VALUES (-1, ?, ?, ?, 0)`;
  let addUserData = [
    req.body.firstName,
    req.body.lastName,
    req.body.firebaseUID,
  ];

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

app.post("/api/checkIfRoomExists", (req, res) => {
  let connection = mysql.createConnection(config);
  let checkIfRoomExistsSQL = `SELECT CAST((EXISTS (SELECT id FROM zzammit.Room WHERE id = ?)) AS UNSIGNED) AS value`;
  let checkIfRoomExistsData = [req.body.idRoom];

  // console.log(req.body);

  connection.query(
    checkIfRoomExistsSQL,
    checkIfRoomExistsData,
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
      }

      let string = JSON.stringify(results);
      //let obj = JSON.parse(string);
      res.send({ express: string });
    }
  );
  connection.end();
});

//Expenses APIs

app.post("/api/getOwedSummary", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: Firebase ID
  //Output: Total amount user is owed
  let getOwedSummarySQL = `SELECT firstName, lastName, owed FROM zzammit.Roomate WHERE firebaseUID = (?)`;
  let getOwedSummary = [req.body.user];

  // console.log(req.body);

  connection.query(
    getOwedSummarySQL,
    getOwedSummary,
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
      }

      let string = JSON.stringify(results);
      //let obj = JSON.parse(string);
      res.send({ express: string });
    }
  );
  connection.end();
});

app.post("/api/getOwedByPerson", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: Firebase ID
  //Output: Table of summarized expenses
  let getOwedPersonSQL = `
	SET @roomie := (Select id from zzammit.Roomate where firebaseUID = (?));

	DROP TABLE IF EXISTS zzammit.ExpSummary;

	CREATE TEMPORARY TABLE zzammit.ExpSummary Select  CONCAT(firstName, ' ', lastName) as otherPerson, IF(idDebtor = @roomie, idDebtor, idSpender) AS userID, IF(idDebtor = @roomie, idSpender, idDebtor) AS otherID, 
	IF(idDebtor= @roomie, -1*SUM(amount), SUM(amount)) AS amountOwed from zzammit.Expenses left join zzammit.Roomate ON Expenses.idDebtor = Roomate.id
	where (idSpender = @roomie or idDebtor = @roomie) Group by idSpender, idDebtor, firstName, lastName;

	Select CONCAT(firstName, ' ', lastName) as otherPerson, SUM(amountOwed) AS amountTheyOwe From zzammit.ExpSummary left join zzammit.Roomate on ExpSummary.otherID = Roomate.id 
	Group by otherID, userID, firstName, lastName;

	DROP TABLE zzammit.ExpSummary;
	`;
  let getOwedPersonData = [req.body.user];

  // console.log(req.body);

  connection.query(
    getOwedPersonSQL,
    getOwedPersonData,
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
      }

      let string = JSON.stringify(results);
      //let obj = JSON.parse(string);
      res.send({ express: string });
    }
  );
  connection.end();
});

app.post("/api/getExpenseReport", (req, res) => {
  let connection = mysql.createConnection(config);
  //8 Inputs: (Firebase ID, Sort Value (4 Character String see below), Start of Date Range, End of Date Range, Tag to filter by,
  //			Spender Firebase ID to filter by, Debtor Firebase ID to filter by,
  //			Whether or not you only want to look at the user's tracactions(Empty String = Yes, Anything Else = No))
  //Output: Table of Transactions sorted and filtered.
  let getExpensesSQL = `
	SET @roomie := (Select id from zzammit.Roomate where firebaseUID = (?)); 
	SET @orderV := (?);
	
	SET @DateStart := (?);
	SET @DateEnd := (?);
	SET @Tag := (?);
	SET @Spender := (?);
	SET @Debtor := (?);
	SET @justUser := (?);
	
	DROP TABLE IF EXISTS zzammit.ExpLog;
	CREATE TEMPORARY TABLE zzammit.ExpLog Select Expenses.id as ExpenseID, CONCAT(firstName, ' ', lastName) as Spender, idDebtor, amount, tag, comments, tDate 
		From zzammit.Expenses left join zzammit.Roomate on Expenses.idSpender = Roomate.id where 
		CASE @justUser WHEN '' THEN (idSpender = @roomie or idDebtor = @roomie) ELSE idSpender IN 
			(SELECT id FROM zzammit.Roomate WHERE idRoom = 
				(SELECT idRoom FROM zzammit.Roomate WHERE id = @roomie)) END
		;
		
	Select ExpenseID, Spender, CONCAT(Roomate.firstName, ' ', Roomate.lastName) as Debtor, amount, tDate, tag, comments 
		From zzammit.ExpLog left join zzammit.Roomate on ExpLog.idDebtor = Roomate.id
		WHERE
			CASE @Tag WHEN '' THEN tDate >= '1900-01-01' ELSE tag = @Tag END AND
			CASE @Spender WHEN '' THEN tDate >= '1900-01-01' ELSE Spender = (Select CONCAT(firstName, ' ', lastName) from zzammit.Roomate where firebaseUID = @Spender) END AND
			CASE @Debtor WHEN '' THEN tDate >= '1900-01-01' ELSE idDebtor = (Select id from zzammit.Roomate where firebaseUID = @Debtor) END AND
			CASE @DateStart WHEN '' THEN tDate >= '1900-01-01' ELSE tDate >= @DateStart END AND
			CASE @DateEnd WHEN '' THEN tDate >= '1900-01-01' ELSE tDate <= @DateEnd END
		Order By 
		CASE @orderV WHEN 'TagA' THEN tag END ASC,
		CASE @orderV WHEN 'TagD' THEN tag END DESC,
		CASE @orderV WHEN 'SpdA' THEN Spender END ASC,
		CASE @orderV WHEN 'SpdD' THEN Spender END DESC,
		CASE @orderV WHEN 'DbtA' THEN Debtor END ASC,
		CASE @orderV WHEN 'DbtD' THEN Debtor END DESC,
		CASE @orderV WHEN 'AmtA' THEN amount END ASC,
		CASE @orderV WHEN 'AmtD' THEN amount END DESC,
		CASE @orderV WHEN 'DatA' THEN tDate END ASC,
		CASE @orderV WHEN 'DatD' THEN tDate END DESC;
	
	DROP TABLE IF EXISTS zzammit.ExpLog;
	`;
  let getExpensesData = [
    req.body.user,
    req.body.sort,
    req.body.dateStart,
    req.body.dateEnd,
    req.body.tag,
    req.body.spenderID,
    req.body.debtorID,
    req.body.justUser,
  ];

  // console.log(req.body);

  connection.query(
    getExpensesSQL,
    getExpensesData,
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
      }

      let string = JSON.stringify(results);
      //let obj = JSON.parse(string);
      res.send({ express: string });
    }
  );
  connection.end();
});
app.post("/api/getAllExpenses", (req, res) => {
  let connection = mysql.createConnection(config);

  let getExpensesSQL = `
  SELECT * FROM zzammit.Expenses where idSpender = (select id from zzammit.Roomate where firebaseUID = (?)) OR idDebtor = (select id from zzammit.Roomate where firebaseUID = (?));
	`;
  let getExpensesData = [req.body.spenderID, req.body.debtorID];

  // console.log(req.body);

  connection.query(
    getExpensesSQL,
    getExpensesData,
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
      }

      let string = JSON.stringify(results);
      //let obj = JSON.parse(string);
      res.send({ express: string });
    }
  );
  connection.end();
});
app.post("/api/addExpense", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let addExpenseSQL = `
	SET @amt = (?);
	SET @spender = (Select id from zzammit.Roomate where firebaseUID = (?));
	SET @debtor = (Select id from zzammit.Roomate where firebaseUID = (?));
	INSERT INTO zzammit.Expenses (idSpender, idDebtor, amount, tag, comments, tDate) VALUES (@spender, @debtor, @amt, ?, ?, ?);
	Update zzammit.Roomate set owed = owed + @amt where id = @spendor;
	Update zzammit.Roomate set owed = owed - @amt where id = @debtor;
	`;
  let addExpenseData = [
    req.body.amount,
    req.body.spender,
    req.body.debtor,
    req.body.tag,
    req.body.comment,
    req.body.date,
  ];

  // console.log(req.body);

  connection.query(addExpenseSQL, addExpenseData, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/deleteExpense", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: Expense Trasaction ID
  //Output: None
  let delExpenseSQL = `
	DELETE FROM zzammit.Expenses WHERE id = (?);
	`;
  let delExpenseData = [req.body.expenseID];

  // console.log(req.body);

  connection.query(delExpenseSQL, delExpenseData, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/editExpense", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Expense ID, Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let editExpenseSQL = `
	SET @expID = (?);
	SET @amt = (?);
	SET @spender = (Select id from zzammit.Roomate where firebaseUID = (?));
	SET @debtor = (Select id from zzammit.Roomate where firebaseUID = (?));
	UPDATE zzammit.Expenses SET idSpender = @spender, idDebtor = @debtor, amount = @amt, tag = (?), comments = (?), tDate = (?) WHERE id = @expID;
	Update zzammit.Roomate set owed = owed + @amt where id = @spendor;
	Update zzammit.Roomate set owed = owed - @amt where id = @debtor;
	`;
  let editExpenseData = [
    req.body.expenseID,
    req.body.amount,
    req.body.spender,
    req.body.debtor,
    req.body.tag,
    req.body.comment,
    req.body.date,
  ];

  // console.log(req.body);

  connection.query(
    editExpenseSQL,
    editExpenseData,
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
      }

      let string = JSON.stringify(results);
      //let obj = JSON.parse(string);
      res.send({ express: string });
    }
  );
  connection.end();
});

//Basic Use APIs

app.post("/api/getRoomates", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: User Firebase ID
  //Output: Names and Firebase IDs of roomates (for use in Dropdowns and such)
  let getOwedSummarySQL = `
	SELECT CONCAT(firstName, ' ', lastName) AS Roomate, firebaseUID FROM zzammit.Roomate WHERE idRoom = (Select idRoom FROM zzammit.Roomate WHERE firebaseUID = (?));
	`;
  let getOwedSummary = [req.body.user];

  // console.log(req.body);

  connection.query(
    getOwedSummarySQL,
    getOwedSummary,
    (error, results, fields) => {
      if (error) {
        console.log(error.message);
      }

      let string = JSON.stringify(results);
      //let obj = JSON.parse(string);
      res.send({ express: string });
    }
  );
  connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
