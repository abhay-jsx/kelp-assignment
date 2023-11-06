const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');
const fastcsv = require('fast-csv');
require('dotenv').config();
const app = express();
const port = 3000; // Set your desired port number
const { Pool } = require('pg')

app.use(express.json());
const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    database: 'kelpassignment',
    password: 'Ronaldo',
    port: 5432,
    host: 'localhost',
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.post('/convert', (req, res) => {
    const jsonArray = [];
  
    const stream = fs.createReadStream(process.env.CSV_FILE_PATH);
  
    stream
      .pipe(csvParser())
      .on('data', (row) => {
        const obj = {};
  
        for (const key in row) {
          const parts = key.split('.');
          let tempObj = obj;
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === parts.length - 1) {
              tempObj[part] = row[key];
            } else {
              tempObj[part] = tempObj[part] || {};
              tempObj = tempObj[part];
            }
          }
        }
  
        jsonArray.push(obj);
      })
      .on('end', () => {
        res.json(jsonArray);
      });
  });
  
  // Handle errors
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

