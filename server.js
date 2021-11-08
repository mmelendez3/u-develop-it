const express = require('express')
const db = require('./db/connection');
// Add near the top of the file
const apiRoutes = require('./routes/apiRoutes');
  //moved to connection.js
// const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
 
const app = express();

const inputCheck = require('./utils/inputCheck');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Add after Express middleware
app.use('/api', apiRoutes);

// Connect to database
    //moved to connection.js
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // Your MySQL username,
//       user: 'root',
//       // Your MySQL password
//       password: '',
//       database: 'election'
//     },
//     console.log('Connected to the election database.')
//   );



            //CODE FOR TESTING.  CODE BELOW ALL COMMENTED OUT IS THE CODE TO CONNECT MYSQL TO EXPRESS
//   db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
//   });

// // GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(row);
//   });

//   // Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

//   // Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
// VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
// if (err) {
// console.log(err);
// }
// console.log(result);
// });

            //same code as above just wrapped in Express .js
            //MOVED ALL CANDIDATE ROUTES TO candidateRoutes.js
// // Get all candidates
// app.get('/api/candidates', (req, res) => {
//   const sql = `SELECT candidates.*, parties.name 
//   AS party_name 
//   FROM candidates 
//   LEFT JOIN parties 
//   ON candidates.party_id = parties.id`;
  
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

//   // Get a single candidate
// app.get('/api/candidate/:id', (req, res) => {
//   const sql = `SELECT candidates.*, parties.name 
//   AS party_name 
//   FROM candidates 
//   LEFT JOIN parties 
//   ON candidates.party_id = parties.id 
//   WHERE candidates.id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
//   });




//   // Delete a candidate
// app.delete('/api/candidate/:id', (req, res) => {
//     const sql = `DELETE FROM candidates WHERE id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: res.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Candidate not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted',
//           changes: result.affectedRows,
//           id: req.params.id
//         });
//       }
//     });
//   });

//   // Create a candidate
// app.post('/api/candidate', ({ body }, res) => {
//     const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
//     if (errors) {
//       res.status(400).json({ error: errors });
//       return;
//     }
//     const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
//   VALUES (?,?,?)`;
// const params = [body.first_name, body.last_name, body.industry_connected];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     res.status(400).json({ error: err.message });
//     return;
//   }
//   res.json({
//     message: 'success',
//     data: body
//   });
// });
//   });

// Update a candidate's party
// app.put('/api/candidate/:id', (req, res) => {
//   const errors = inputCheck(req.body, 'party_id');

    


//moved all party routes to partyRoute.js

// //route to get all parties
//     app.get('/api/parties', (req, res) => {
//       const sql = `SELECT * FROM parties`;
//       db.query(sql, (err, rows) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: rows
//         });
//       });
//     });
  
//     //route to get a single party
//     app.get('/api/party/:id', (req, res) => {
//       const sql = `SELECT * FROM parties WHERE id = ?`;
//       const params = [req.params.id];
//       db.query(sql, params, (err, row) => {
//         if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: row
//         });
//       });
//     });

    
//         //route to delete a party
//     app.delete('/api/party/:id', (req, res) => {
//       const sql = `DELETE FROM parties WHERE id = ?`;
//       const params = [req.params.id];
//       db.query(sql, params, (err, result) => {
//         if (err) {
//           res.status(400).json({ error: res.message });
//           // checks if anything was deleted
//         } else if (!result.affectedRows) {
//           res.json({
//             message: 'Party not found'
//           });
//         } else {
//           res.json({
//             message: 'deleted',
//             changes: result.affectedRows,
//             id: req.params.id
//           });
//         }
//       });
//     });

    


  // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });


  //updated this app.listen to the one below db.connect
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });

  // Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});