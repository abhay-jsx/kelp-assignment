# kelp-assignment

About the Project:
This Node.js Express application offers a CSV to JSON converter API. The API takes the path to a CSV file from environment configuration and converts it into JSON format. The JSON data is then interpreted, with fields such as name, age, address, and additional_info. Notably, name and age are mandatory fields.

Key Features:

* CSV to JSON Conversion: The API reads the specified CSV file and converts its contents into JSON format, with each row representing an object.

* Database Integration: The JSON data is sent to a PG database using a POST request. The database table structure accommodates fields like name, age, address, and additional_info. Name and age are mandatory fields and mapped accordingly.

* Age-Wise Distribution: After the data is successfully added to the database, the application calculates the percentage age-wise distribution of all users. It categorizes users into age groups and prints the distribution on the console.


# How to Use:
* Configure the path to the CSV file in the environment configuration.

* Start the Express application.

* Send a POST request with the CSV data to the appropriate locahost:port/v1/api/convert.

* Observe the age-wise distribution report on the console.

* This project simplifies the process of converting CSV data into a structured JSON format, storing it in a PG database, and providing insights through age-wise distribution statistics.

```


# Setup Codebase
-> setup/create .env file
```env
CSV_FILE_PATH=./dumpcsv.csv
PORT = node-port
PG_USER = user
PG_DATABASE = database
PG_PASSWORD = password
PG_PORT= port
PG_HOST = hostname
```

```npm

-> npm install
-> npm start

-->>Ready to go
```