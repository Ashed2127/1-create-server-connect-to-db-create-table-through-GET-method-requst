const mysql = require("mysql");
const express = require("express");

app = express();
app.listen(1100, () => console.log("listening on port 1100"));

//to reate a connection with database using db, user, password, host
var mysqlConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "ashed",
  password: "1234",
  database: "ashed",
});

mysqlConnection.connect((err) => {
  if (err) throw err;
  else console.log("connected to mysql database");
});

app.get("/install", (req, res) => {
  let message = "Table is Created";
  let createProducts = `CREATE TABLE if not exists Products(
  product_id int auto_increment,
  product_url varchar(255) not null,
  product_name varchar(255) not null,
  PRIMARY KEY (product_id)
)`;

  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
  description_id int auto_increment,
  product_id int(11) not null,
  product_brief_description TEXT not null,
  product_description TEXT not null,
  PRIMARY KEY (description_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
)`;

  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
  price_id int auto_increment,
  product_id int(11) not null,
  starting_price varchar(255) not null,
  PRIMARY KEY (price_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
)`;
  mysqlConnection.query(createProducts, (err, results, fields) => {
    if (err) console.log(err);
  });

  mysqlConnection.query(createProductDescription, (err, results, fields) => {
    if (err) console.log(err);
  });

  mysqlConnection.query(createProductPrice, (err, results, fields) => {
    if (err) console.log(err);
  });
  res.end(message);
});
