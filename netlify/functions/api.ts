let mysql = require("mysql");
let config = require("./config.js");
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const serverless = require('serverless-http')
const { response } = require("express");
const app = express;
const router = express.Router();
router.use(cors());

router.post("/loadUserSettings", (req, res) => {
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

router.post("/addRoom", (req, res) => {
  let connection = mysql.createConnection(config);
  let addRoomSQL = `INSERT INTO roomies_db.Room (roomName) VALUES (?)`;
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

router.post("/addGroceryItem", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `INSERT INTO roomies_db.GroceryItem (item, brand, store, price, idRoomate) VALUES (?,?,?,?,(SELECT id from roomies_db.Roomate WHERE firebaseUID = ?));`;
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

router.post("/addGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `INSERT INTO roomies_db.Grocery (idRoomate, idGroceryItem, Quantity, tDate) VALUES (?,?,?,NOW())`;
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

router.post("/viewGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `
		SELECT id, item, brand, store, price, idRoomate
		FROM roomies_db.GroceryItem
		WHERE idRoomate = (SELECT id from roomies_db.Roomate WHERE firebaseUID = ?)`;
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

router.post("/viewGroupGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `
		SELECT Grocery.id, GroceryItem.item, GroceryItem.brand, GroceryItem.store, GroceryItem.price, GroceryItem.idRoomate, Grocery.Quantity
		From roomies_db.GroceryItem, roomies_db.Grocery
		Where GroceryItem.id in (
			Select idGroceryItem 
			From roomies_db.Grocery
			WHERE idRoomate in (
				Select Roomate.id
				From roomies_db.Roomate
				WHERE idRoom = (
					SELECT idRoom 
					FROM roomies_db.Roomate
					WHERE Roomate.id = (SELECT id from roomies_db.Roomate WHERE firebaseUID = ?))))
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

router.post("/deleteGroceryItem", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `DELETE FROM roomies_db.GroceryItem WHERE id = ?;`;
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

router.post("/deleteGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  let sql = `Delete from roomies_db.Grocery 
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

router.post("/addUserToNewRoom", (req, res) => {
  let connection = mysql.createConnection(config);
  let addRoomSQL = `UPDATE roomies_db.Roomate SET idRoom = (SELECT MAX(id) FROM roomies_db.Room) WHERE firebaseUID = (?)`;
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

router.post("/addUserToExistingRoom", (req, res) => {
  let connection = mysql.createConnection(config);
  let addRoomSQL = `UPDATE roomies_db.Roomate SET idRoom = (?) WHERE firebaseUID = (?)`;
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

router.post("/addUser", (req, res) => {
  let connection = mysql.createConnection(config);
  let addUserSQL = `INSERT INTO roomies_db.Roomate (idRoom, firstName, lastName, firebaseUID, owed) VALUES (-1, ?, ?, ?, 0)`;
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

router.post("/checkIfRoomExists", (req, res) => {
  let connection = mysql.createConnection(config);
  let checkIfRoomExistsSQL = `SELECT CAST((EXISTS (SELECT id FROM roomies_db.Room WHERE id = ? AND (SELECT COUNT(idRoom) FROM roomies_db.Roomate WHERE idRoom = ?) < 5)) AS UNSIGNED) AS value`;
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

router.post("/getOwedSummary", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: Firebase ID
  //Output: Total amount user is owed
  let getOwedSummarySQL = `SELECT firstName, lastName, owed FROM roomies_db.Roomate WHERE firebaseUID = (?)`;
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

router.post("/getOwedByPerson", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: Firebase ID
  //Output: Table of summarized expenses
  let getOwedPersonSQL = `
	SET @roomie := (Select id from roomies_db.Roomate where firebaseUID = (?));

	DROP TABLE IF EXISTS roomies_db.ExpSummary;

	CREATE TEMPORARY TABLE roomies_db.ExpSummary Select  CONCAT(firstName, ' ', lastName) as otherPerson, IF(idDebtor = @roomie, idDebtor, idSpender) AS userID, IF(idDebtor = @roomie, idSpender, idDebtor) AS otherID, 
	IF(idDebtor= @roomie, -1*SUM(amount), SUM(amount)) AS amountOwed from roomies_db.Expenses left join roomies_db.Roomate ON Expenses.idDebtor = Roomate.id
	where (idSpender = @roomie or idDebtor = @roomie) Group by idSpender, idDebtor, firstName, lastName;

	Select CONCAT(firstName, ' ', lastName) as otherPerson, SUM(amountOwed) AS amountTheyOwe From roomies_db.ExpSummary left join roomies_db.Roomate on ExpSummary.otherID = Roomate.id 
	Group by otherID, userID, firstName, lastName;

	DROP TABLE roomies_db.ExpSummary;
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

router.post("/getExpenseReport", (req, res) => {
  let connection = mysql.createConnection(config);
  //8 Inputs: (Firebase ID,
  //			Whether or not you only want to look at the user's tracactions(Boolean: True = just user, False = everything))
  //Output: Table of Transactions sorted and filtered.
  let getExpensesSQL = `
	SET @roomie := (Select id from roomies_db.Roomate where firebaseUID = (?)); 
    SET @justuser := (?);
	
	DROP TABLE IF EXISTS roomies_db.ExpLog;
	CREATE TEMPORARY TABLE roomies_db.ExpLog Select Expenses.id as ExpenseID, CONCAT(firstName, ' ', lastName) as Spender, idDebtor, amount, tag, comments, tDate
		From roomies_db.Expenses left join roomies_db.Roomate on Expenses.idSpender = Roomate.id where 
		CASE @justUser WHEN TRUE THEN (idSpender = @roomie or idDebtor = @roomie) ELSE idSpender IN 
			(SELECT id FROM roomies_db.Roomate WHERE idRoom = 
				(SELECT idRoom FROM roomies_db.Roomate WHERE id = @roomie)) END
		;
		
	Select ExpenseID as id, Spender, CONCAT(Roomate.firstName, ' ', Roomate.lastName) as Debtor, amount, tDate, tag, comments
		From roomies_db.ExpLog left join roomies_db.Roomate on ExpLog.idDebtor = Roomate.id;
	
	DROP TABLE IF EXISTS roomies_db.ExpLog;
	`;
  let getExpensesData = [req.body.firebaseUID, req.body.justUser];

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

router.post("/addExpense", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let addExpenseSQL = `
	SET @amt = (?);
	SET @spender = (Select id from roomies_db.Roomate where firebaseUID = (?));
	SET @debtor = (Select id from roomies_db.Roomate where firebaseUID = (?));
	INSERT INTO roomies_db.Expenses (idSpender, idDebtor, amount, tag, comments, tDate) VALUES (@spender, @debtor, @amt, ?, ?, ?);
	Update roomies_db.Roomate set owed = owed + @amt where id = @spender;
	Update roomies_db.Roomate set owed = owed - @amt where id = @debtor;
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

router.post("/addExpenseGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let addExpenseSQL = `
	SET @amt = (?);
	SET @spender = (Select id from roomies_db.Roomate where firebaseUID = (?));
	SET @debtor = (?);
	INSERT INTO roomies_db.Expenses (idSpender, idDebtor, amount, tag, comments, tDate) VALUES (@spender, @debtor, @amt, ?, ?, ?);
	Update roomies_db.Roomate set owed = owed + @amt where id = @spender AND @spender <> @debtor;
	Update roomies_db.Roomate set owed = owed - @amt where id = @debtor AND @spender <> @debtor;
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

router.post("/deleteExpense", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: Expense Trasaction ID
  //Output: None
  let delExpenseSQL = `
	SET @expID = (?);
	SET @oldAmt = (SELECT amount from roomies_db.Expenses where id = @expID);
	SET @oldS = (SELECT idSpender from roomies_db.Expenses where id = @expID);
	SET @oldD = (SELECT idDebtor from roomies_db.Expenses where id = @expID);

	Update roomies_db.Roomate set owed = owed - @oldAmt where id = @oldS;
	Update roomies_db.Roomate set owed = owed + @oldAmt where id = @oldD;
	DELETE FROM roomies_db.Expenses WHERE id = @expID;
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

router.post("/editExpense", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Expense ID, Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let editExpenseSQL = `
	SET @expID = (?);
	SET @amt = (?);
	SET @spender = (Select id from roomies_db.Roomate where firebaseUID = (?));
	SET @debtor = (Select id from roomies_db.Roomate where firebaseUID = (?));
	SET @oldAmt = (SELECT amount from roomies_db.Expenses where id = @expID);
	SET @oldS = (SELECT idSpender from roomies_db.Expenses where id = @expID);
	SET @oldD = (SELECT idDebtor from roomies_db.Expenses where id = @expID);

	Update roomies_db.Roomate set owed = owed - @oldAmt where id = @oldS;
	Update roomies_db.Roomate set owed = owed + @oldAmt where id = @oldD;
	UPDATE roomies_db.Expenses SET idSpender = @spender, idDebtor = @debtor, amount = @amt, tag = (?), comments = (?), tDate = (?) WHERE id = @expID;
	Update roomies_db.Roomate set owed = owed + @amt where id = @spender;
	Update roomies_db.Roomate set owed = owed - @amt where id = @debtor;
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

router.post("/shortExchange", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: FireBase ID
  //Output:
  let shortExchangeSQL = `
  SET @roomie := (Select id from roomies_db.Roomate where firebaseUID = (?)); 

  SELECT Rm8.id, SUM(amount) as amount, CONCAT(CONCAT(Rm8.firstName, ' ', Rm8.lastName), ' pays ', CONCAT(Roomate.firstName, ' ', Roomate.lastName), ' $', SUM(amount)) AS transaction
  FROM roomies_db.Expenses
  LEFT JOIN roomies_db.Roomate on Expenses.idSpender = Roomate.id
  LEFT JOIN roomies_db.Roomate AS Rm8 on Expenses.idDebtor = Rm8.id
  JOIN (SELECT id1, firstName FROM (SELECT idDebtor AS id1 FROM roomies_db.Expenses UNION SELECT idSpender AS id FROM roomies_db.Expenses) AS allID JOIN roomies_db.Roomate ON allID.id1 = roomies_db.Roomate.id) AS debtor ON Expenses.idDebtor = debtor.id1
  JOIN (SELECT id1, firstName FROM (SELECT idDebtor AS id1 FROM roomies_db.Expenses UNION SELECT idSpender AS id FROM roomies_db.Expenses) AS allID JOIN roomies_db.Roomate ON allID.id1 = roomies_db.Roomate.id) AS spender ON Expenses.idSpender = spender.id1

  WHERE (debtor.id1 != spender.id1) AND debtor.id1 IN 
            (SELECT id FROM roomies_db.Roomate WHERE idRoom = 
                (SELECT idRoom FROM roomies_db.Roomate WHERE id = @roomie))
  GROUP BY debtor.id1, spender.id1, Roomate.firstname, Roomate.lastname, Rm8.firstname, Rm8.lastname
  HAVING SUM(CASE WHEN idDebtor = debtor.id1 THEN amount ELSE -amount END) <> 0
  ORDER BY SUM(CASE WHEN idDebtor = debtor.id1 THEN amount ELSE -amount END);
	`;
  let shortExchangeData = [req.body.firebaseUID];

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

router.post("/addEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let addEventSQL = `
	INSERT INTO roomies_db.Calendar (idRoomate, title, startdate, enddate, tag, eventDescription, Consequence, allDay) 
  VALUES (
    (SELECT id FROM roomies_db.Roomate WHERE firebaseUID = ?), 
    ?, 
    CASE WHEN ? = 1 THEN ? ELSE CONVERT_TZ(?, "+0:00", "-4:00") END, 
    CASE WHEN ? = 1 THEN ? ELSE CONVERT_TZ(?, "+0:00", "-4:00") END, 
    ?, 
    ?, 
    ?, 
    ?
  );
	`;
  let addEventData = [
    req.body.firebaseUID,
    req.body.title,
    req.body.allDay,
    req.body.start,
    req.body.start,
    req.body.allDay,
    req.body.end,
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

router.post("/deleteEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: Expense Trasaction ID
  //Output: None
  let delEventSQL = `
	DELETE FROM roomies_db.Calendar WHERE id = ?;
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

router.post("/editEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Expense ID, Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let editEventSQL = `
	UPDATE roomies_db.Calendar SET idRoomate = (Select id from roomies_db.Roomate where firebaseUID = (?)), title = ?, startdate = ?, enddate = ?, tag = ?, eventDescription = ?, Consequence = ?, allDay = ? WHERE id =?;
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

  connection.query(editEventSQL, editEventData, (error, results, fields) => {
    if (error) {
      console.log(error.message);
    }
    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

router.post("/viewEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let viewEventSQL = `
	SELECT c.id, c.title, c.startdate as start, c.enddate as end, CONCAT(r.firstName, ' ', r.lastName) AS creator, c.allDay
  FROM roomies_db.Calendar AS c 
  LEFT JOIN roomies_db.Roomate AS r ON c.idRoomate = r.id 
  WHERE c.idRoomate IN (
    SELECT r1.id 
    FROM roomies_db.Roomate AS r1
    WHERE r1.idRoom = (
        SELECT r2.idRoom 
        FROM roomies_db.Roomate AS r2 
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

router.post("/viewEvent", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (Amount, Spender firebase ID, Debtor firebase ID, Tag, Comment, Date in 'yyyy-mm-dd')
  //Output: None
  let viewEventSQL = `
	SELECT c.id, c.title, c.startdate as start, c.enddate as end, CONCAT(r.firstName, ' ', r.lastName) AS creator
  FROM roomies_db.Calendar AS c 
  LEFT JOIN roomies_db.Roomate AS r ON c.idRoomate = r.id 
  WHERE c.idRoomate IN (
    SELECT r1.id 
    FROM roomies_db.Roomate AS r1
    WHERE r1.idRoom = (
        SELECT r2.idRoom 
        FROM roomies_db.Roomate AS r2 
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

router.post("/getUpcomingEvents", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: (firebase ID)
  //Output: None
  let viewEventSQL = `
	SELECT c.title, c.startdate as start, c.enddate as end, CONCAT(r.firstName, ' ', r.lastName) AS creator, c.allDay
  FROM roomies_db.Calendar AS c 
  LEFT JOIN roomies_db.Roomate AS r ON c.idRoomate = r.id 
  WHERE c.idRoomate IN (
    SELECT r1.id 
    FROM roomies_db.Roomate AS r1
    WHERE r1.idRoom = (
      SELECT r2.idRoom 
      FROM roomies_db.Roomate AS r2 
      WHERE r2.firebaseUID = (?)
    )
  )
  AND (
    c.startdate >= CONVERT_TZ(NOW() , "+0:00", "-4:00") 
    OR (c.allDay = 1 AND c.startdate <= CURDATE() AND c.enddate >= CURDATE())
  )
  ORDER BY ABS(TIMESTAMPDIFF(SECOND, c.startdate, NOW())) ASC 
  LIMIT 4;
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

router.post("/getRoomates", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: User Firebase ID
  //Output: Names and Firebase IDs of roomates (for use in Dropdowns and such)
  let getOwedSummarySQL = `
	SELECT CONCAT(firstName, ' ', lastName) AS Roomate, firebaseUID FROM roomies_db.Roomate WHERE idRoom = (Select idRoom FROM roomies_db.Roomate WHERE firebaseUID = (?));
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
router.post("/getRoomPageInfo", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: User Firebase ID
  let sql = `
  SELECT r.id, r.firstName, r.lastName, r.idRoom, r.owed * -1 AS owed, rm.roomName, r.firebaseUID 
  FROM roomies_db.Roomate r 
  INNER JOIN roomies_db.Room rm ON r.idRoom = rm.id 
  WHERE r.idRoom = (SELECT idRoom FROM roomies_db.Roomate WHERE firebaseUID = (?))
	`;
  let data = [req.body.firebaseUID];

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

router.post("/getTopGrocery", (req, res) => {
  let connection = mysql.createConnection(config);
  //Input: User Firebase ID
  let sql = `
  SELECT gi.item, gi.price, g.Quantity
  FROM roomies_db.GroceryItem gi
  JOIN roomies_db.Grocery g ON gi.id = g.idGroceryItem
  WHERE gi.id IN (
      SELECT g2.idGroceryItem 
      FROM roomies_db.Grocery g2
      WHERE g2.idRoomate IN (
          SELECT r.id
          FROM roomies_db.Roomate r
          WHERE r.idRoom = (
              SELECT r2.idRoom 
              FROM roomies_db.Roomate r2
              WHERE r2.id = (
                  SELECT id 
                  FROM roomies_db.Roomate 
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

app.use('/api/', router);

export const handler = serverless(api); // for netlify
