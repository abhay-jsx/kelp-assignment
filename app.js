const express = require('express');
const fs = require('fs');
const fastcsv = require('fast-csv');
require('dotenv').config();
const app = express();
const port = 3000; // Set your desired port number
const { Pool } = require('pg')
const pgp = require('pg-promise')();
const routes = require('./src/routes/v1');

app.use(express.json());
const router = express.Router();

const db = pgp({
    user: 'postgres',
    database: 'kelpassignment',
    password: 'Ronaldo',
    port: 5432,
    host: 'localhost',

  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(router);  // tell the app this is the router we are using
    //healthcheck routes
app.use('/v1', routes);

// app.post('/convert', async (req, res) => {
//     const jsonArray = [];
  
//     const stream = fs.createReadStream(process.env.CSV_FILE_PATH);

//     stream
//       .pipe(csvParser())
//       .on('data', async (row) => {
//         const obj = {};
  
//         for (const key in row) {
//           const parts = key.split('.');
//           let tempObj = obj;
//           for (let i = 0; i < parts.length; i++) {
//             const part = parts[i];
//             if (i === parts.length - 1) {
//               tempObj[part] = row[key];
//             } else {
//               tempObj[part] = tempObj[part] || {};
//               tempObj = tempObj[part];
//             }
//           }
//         }
//         const {
//             name: { firstName, lastName },
//             age,
//             address,
//             gender,
//             ...additional_info
//           } = obj;
//           const { rows } = await db.query(
//             "INSERT INTO users (name,age, address,additional_info) VALUES ($1, $2, $3,$4)",
//             [`${firstName} ${lastName}`,age,address, additional_info]
//           );
//           jsonArray.push({
//             name: `${firstName} ${lastName}`,
//             age: parseInt(age, 10),
//             address,
//             gender,
//             additional_info,
//           });
//       })
//       .on('end', () => {

// db.manyOrNone(`
//   SELECT
//     age_group,
//     COUNT(*) * 100.0 / total_count AS percentage
//   FROM (
//     SELECT
//       CASE
//         WHEN age < 20 THEN '< 20'
//         WHEN age >= 20 AND age <= 40 THEN '20 to 40'
//         WHEN age > 40 AND age <= 60 THEN '40 to 60'
//         ELSE '> 60'
//       END AS age_group
//     FROM users
//   ) AS subquery
//   CROSS JOIN (
//     SELECT COUNT(*) AS total_count FROM users
//   ) AS total
//   GROUP BY age_group, total_count
//   ORDER BY age_group;
// `)
//   .then((result) => {
//     // Print the report on the console
//     console.log('Age-Group % Distribution');
//     for (const row of result) {
//       console.log(`${row.age_group}: ${parseInt(row.percentage).toFixed(2)}`);
//     }
//   })
//   .catch((error) => {
//     console.error('Error fetching age distribution:', error);
//   })
//   .finally(() => {
    
//   });

//         res.json(jsonArray);
//       });
//   });
  
  // Handle errors
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

