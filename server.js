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

app.post("/api/addGroceryItem", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `INSERT INTO zzammit.GroceryItem (item, brand, store, price, idRoomate) VALUES (?,?,?,?,(SELECT id from zzammit.Roomate WHERE firebaseUID = ?));`;
  let data = [
    req.body.item,
    req.body.brand,
    req.body.store,
    req.body.price,
    req.body.idRoomate,
  ];

  // console.log(req.body);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/addGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `INSERT INTO zzammit.Grocery (idRoomate, idGroceryItem, Quantity, tDate) VALUES (?,?,?,NOW())`;
  let data = [req.body.idRoomate, req.body.idGroceryItem, req.body.Quantity];

  // console.log(req.body);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/viewGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `
		SELECT id, item, brand, store, price, idRoomate
		FROM zzammit.GroceryItem
		WHERE idRoomate = (SELECT id from zzammit.Roomate WHERE firebaseUID = ?)`;
  let data = [req.body.idRoomate];

  // console.log(req.body);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/viewGroupGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `
		SELECT Grocery.id, GroceryItem.item, GroceryItem.brand, GroceryItem.store, GroceryItem.price, GroceryItem.idRoomate, Grocery.Quantity
		From zzammit.GroceryItem, zzammit.Grocery
		Where GroceryItem.id in (
			Select idGroceryItem 
			From zzammit.Grocery
			WHERE idRoomate in (
				Select Roomate.id
				From zzammit.Roomate
				WHERE idRoom = (
					SELECT idRoom 
					FROM zzammit.Roomate
					WHERE Roomate.id = (SELECT id from zzammit.Roomate WHERE firebaseUID = ?))))
		And GroceryItem.id = Grocery.idGroceryItem;`;
  let data = [req.body.idRoomate];

  // console.log(req.body);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/deleteGroceryItem", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `DELETE FROM zzammit.GroceryItem
		WHERE id = ?;`;
  let data = [req.body.id];

  // console.log(req.body);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/deleteGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `Delete from zzammit.Grocery 
		where id = ?; `;
  let data = [req.body.id];

  // console.log(req.body);

  connection.query(sql, data, (error, results, fields) => {
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
  let checkIfRoomExistsSQL = `SELECT CAST((EXISTS (SELECT id FROM zzammit.Room WHERE id = ? AND (SELECT COUNT(idRoom) FROM zzammit.Roomate WHERE idRoom = ?) < 5)) AS UNSIGNED) AS value`;
  let checkIfRoomExistsData = [req.body.idRoom, req.body.idRoom];

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
  //8 Inputs: (Firebase ID,
  //			Whether or not you only want to look at the user's tracactions(Boolean: True = just user, False = everything))
  //Output: Table of Transactions sorted and filtered.
  let getExpensesSQL = `
	SET @roomie := (Select id from zzammit.Roomate where firebaseUID = (?)); 
    SET @justuser := (?);
	
	DROP TABLE IF EXISTS zzammit.ExpLog;
	CREATE TEMPORARY TABLE zzammit.ExpLog Select Expenses.id as ExpenseID, CONCAT(firstName, ' ', lastName) as Spender, idDebtor, amount, tag, comments, tDate
		From zzammit.Expenses left join zzammit.Roomate on Expenses.idSpender = Roomate.id where 
		CASE @justUser WHEN TRUE THEN (idSpender = @roomie or idDebtor = @roomie) ELSE idSpender IN 
			(SELECT id FROM zzammit.Roomate WHERE idRoom = 
				(SELECT idRoom FROM zzammit.Roomate WHERE id = @roomie)) END
		;
		
	Select ExpenseID as id, Spender, CONCAT(Roomate.firstName, ' ', Roomate.lastName) as Debtor, amount, tDate, tag, comments
		From zzammit.ExpLog left join zzammit.Roomate on ExpLog.idDebtor = Roomate.id;
	
	DROP TABLE IF EXISTS zzammit.ExpLog;
	`;
  let getExpensesData = [
    req.body.firebaseUID,
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

app.post("/api/addExpense", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let addExpenseSQL = `
	SET @amt = (?);
	SET @spender = (Select id from zzammit.Roomate where firebaseUID = (?));
	SET @debtor = (Select id from zzammit.Roomate where firebaseUID = (?));
	INSERT INTO zzammit.Expenses (idSpender, idDebtor, amount, tag, comments, tDate) VALUES (@spender, @debtor, @amt, ?, ?, ?);
	Update zzammit.Roomate set owed = owed + @amt where id = @spender;
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

app.post("/api/addExpenseGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let addExpenseSQL = `
	SET @amt = (?);
	SET @spender = (Select id from zzammit.Roomate where firebaseUID = (?));
	SET @debtor = (?);
	INSERT INTO zzammit.Expenses (idSpender, idDebtor, amount, tag, comments, tDate) VALUES (@spender, @debtor, @amt, ?, ?, ?);
	Update zzammit.Roomate set owed = owed + @amt where id = @spender AND @spender <> @debtor;
	Update zzammit.Roomate set owed = owed - @amt where id = @debtor AND @spender <> @debtor;
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
	SET @expID = (?);
	SET @oldAmt = (SELECT amount from zzammit.Expenses where id = @expID);
	SET @oldS = (SELECT idSpender from zzammit.Expenses where id = @expID);
	SET @oldD = (SELECT idDebtor from zzammit.Expenses where id = @expID);

	Update zzammit.Roomate set owed = owed - @oldAmt where id = @oldS;
	Update zzammit.Roomate set owed = owed + @oldAmt where id = @oldD;
	DELETE FROM zzammit.Expenses WHERE id = @expID;
	`;
  let delExpenseData = [req.body.ExpenseID];

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
	SET @oldAmt = (SELECT amount from zzammit.Expenses where id = @expID);
	SET @oldS = (SELECT idSpender from zzammit.Expenses where id = @expID);
	SET @oldD = (SELECT idDebtor from zzammit.Expenses where id = @expID);

	Update zzammit.Roomate set owed = owed - @oldAmt where id = @oldS;
	Update zzammit.Roomate set owed = owed + @oldAmt where id = @oldD;
	UPDATE zzammit.Expenses SET idSpender = @spender, idDebtor = @debtor, amount = @amt, tag = (?), comments = (?), tDate = (?) WHERE id = @expID;
	Update zzammit.Roomate set owed = owed + @amt where id = @spender;
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

app.post("/api/shortExchange", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: FireBase ID
  //Output:
  let shortExchangeSQL = `
  SET @roomie := (Select id from zzammit.Roomate where firebaseUID = (?)); 

	SELECT CONCAT(CONCAT(Rm8.firstName, ' ', Rm8.lastName), ' pays ', CONCAT(Roomate.firstName, ' ', Roomate.lastName), ' $', MIN(amount)) AS transaction
	FROM zzammit.Expenses
	LEFT JOIN zzammit.Roomate on Expenses.idSpender = Roomate.id
    LEFT JOIN zzammit.Roomate AS Rm8 on Expenses.idDebtor = Rm8.id
    JOIN (SELECT id1, firstName FROM (SELECT idDebtor AS id1 FROM zzammit.Expenses UNION SELECT idSpender AS id FROM zzammit.Expenses) AS allID JOIN zzammit.Roomate ON allID.id1 = zzammit.Roomate.id) AS debtor ON Expenses.idDebtor = debtor.id1
	JOIN (SELECT id1, firstName FROM (SELECT idDebtor AS id1 FROM zzammit.Expenses UNION SELECT idSpender AS id FROM zzammit.Expenses) AS allID JOIN zzammit.Roomate ON allID.id1 = zzammit.Roomate.id) AS spender ON Expenses.idSpender = spender.id1

	WHERE (debtor.id1 != spender.id1) AND debtor.id1 IN 
  			(SELECT id FROM zzammit.Roomate WHERE idRoom = 
  				(SELECT idRoom FROM zzammit.Roomate WHERE id = @roomie))
	GROUP BY debtor.id1, spender.id1, Roomate.firstname, Roomate.lastname, Rm8.firstname, Rm8.lastname
	HAVING SUM(CASE WHEN idDebtor = debtor.id1 THEN amount ELSE -amount END) <> 0
	ORDER BY SUM(CASE WHEN idDebtor = debtor.id1 THEN amount ELSE -amount END);
	`;
  let shortExchangeData = [
    req.body.firebaseUID,
  ];


  // console.log(req.body);

  connection.query(
    shortExchangeSQL,
    shortExchangeData,
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

//Calendar APIs

app.post("/api/addEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let addEventSQL = `
	INSERT INTO zzammit.Calendar (idRoomate, title, startdate, enddate, tag, eventDescription, Consequence, allDay) VALUES ((Select id from zzammit.Roomate where firebaseUID = (?)), ?, ?, ?, ?, ?, ?, ?);
	`;
  let addEventData = [
    req.body.firebaseUID,
    req.body.title,
    req.body.start,
    req.body.end,
    req.body.tag,
    req.body.description,
    req.body.consequence,
    req.body.allDay,
  ];

  // console.log(req.body);

  connection.query(addEventSQL, addEventData, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }
    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/deleteEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: Expense Trasaction ID
  //Output: None
  let delEventSQL = `
	DELETE FROM zzammit.Expenses WHERE id = ?;
	`;
  let delEventData = [req.body.eventID];

  // console.log(req.body);

  connection.query(delEventSQL, delEventData, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }
    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/editEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Expense ID, Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let editEventSQL = `
	UPDATE zzammit.Calendar SET idRoomate = (Select id from zzammit.Roomate where firebaseUID = (?)), title = ?, startdate = ?, enddate = ?, tag = ?, eventDescription = ?, Consequence = ?, allDay = ? WHERE id =?;
	`;
  let editEventData = [
    req.body.firebaseUID,
    req.body.title,
    req.body.start,
    req.body.end,
    req.body.tag,
    req.body.description,
    req.body.consequence,
    req.body.allDay,
    req.body.eventID,
  ];
  // console.log(req.body);

  connection.query(
    editEventSQL,
    editEventData,
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
app.post("/api/viewEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let viewEventSQL = `
	SELECT c.title, c.startdate as start, c.enddate as end
  FROM zzammit.Calendar AS c 
  LEFT JOIN zzammit.Roomate AS r ON c.idRoomate = r.id 
  WHERE c.idRoomate IN (
    SELECT r1.id 
    FROM zzammit.Roomate AS r1
    WHERE r1.idRoom = (
        SELECT r2.idRoom 
        FROM zzammit.Roomate AS r2 
        WHERE r2.firebaseUID = (?)
    )
  );
  `;
  let viewEventData = [req.body.firebaseUID];

  // console.log(req.body);

  connection.query(viewEventSQL, viewEventData, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }
    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
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

//Room Page APIs
app.post("/api/getRoomPageInfo", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: User Firebase ID
  let sql = `
  SELECT r.firstName, r.lastName, r.idRoom, r.owed * -1 AS owed, rm.roomName, r.firebaseUID 
  FROM zzammit.Roomate r 
  INNER JOIN zzammit.Room rm ON r.idRoom = rm.id 
  WHERE r.idRoom = (SELECT idRoom FROM zzammit.Roomate WHERE firebaseUID = (?))
	`;
  let data = [req.body.firebaseUID];

  // console.log(req.body);

  connection.query(
    sql,
    data,
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

app.post("/api/getTopGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: User Firebase ID
  let sql = `
  SELECT gi.item, gi.price, g.Quantity
  FROM zzammit.GroceryItem gi
  JOIN zzammit.Grocery g ON gi.id = g.idGroceryItem
  WHERE gi.id IN (
      SELECT g2.idGroceryItem 
      FROM zzammit.Grocery g2
      WHERE g2.idRoomate IN (
          SELECT r.id
          FROM zzammit.Roomate r
          WHERE r.idRoom = (
              SELECT r2.idRoom 
              FROM zzammit.Roomate r2
              WHERE r2.id = (
                  SELECT id 
                  FROM zzammit.Roomate 
                  WHERE firebaseUID = (?)
              )
          )
      )
  )
  ORDER BY g.tDate DESC
  LIMIT 4;
    `;
  let data = [req.body.firebaseUID];

  // console.log(req.body);

  connection.query(
    sql,
    data,
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