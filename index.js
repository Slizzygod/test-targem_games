const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
const config = require("./config/config");
const express = require("express");
const app = express();

let stream = fs.createReadStream("./data/data.csv");
let csvData = [];
let dataIndata = [];
let csvStream = fastcsv
  .parse({ ltrim: true, rtrim: true, delimiter: ";" })
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    csvData.shift();

    const pool = new Pool({
      host: config.host,
      user: config.username,
      database: config.database,
      password: config.password,
      port: config.port,
    });

    const query =
      "INSERT INTO gamerslist (nickname, email, registrationdate, status) VALUES ($1, $2, $3, $4)";

    pool.connect((err, client, done) => {
      if (err) console.log(err);

      try {
        client.query(
          "CREATE TABLE gamerslist (id SERIAL PRIMARY KEY, nickname VARCHAR not null, email VARCHAR not null, registrationdate BIGINT not null, status VARCHAR not null)"
        );
        csvData.forEach((row) => {
          let data = row[2].replace(/[\.\/]/g, "/").split(" ");
          rep = data[0].split("/");
          let repp = rep[0];
          rep[0] = rep[2];
          rep[2] = repp;
          data[0] = rep;
          row[2] = new Date(data).getTime();
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            }
          });
        });

        client.query(
          "SELECT * from gamerslist WHERE status = 'On' ORDER BY registrationdate",
          (err, res) => {
            res.rows.map((row) => {
              regDate = new Date(Number(row.registrationdate));
              dataIndata.push(
                `<br> ${row.id} ${row.nickname} ${
                  row.email
                } ${regDate.getDate()}-${regDate.getMonth()}-${regDate.getFullYear()} ${regDate.getHours()}:${regDate.getMinutes()}:${regDate.getSeconds()} ${
                  row.status
                }`
              );
              console.log(
                `${row.id} ${row.nickname} ${
                  row.email
                } ${regDate.getDate()}-${regDate.getMonth()}-${regDate.getFullYear()} ${regDate.getHours()}:${regDate.getMinutes()}:${regDate.getSeconds()} ${
                  row.status
                }`
              );
            });
          }
        );
      } finally {
        done();
      }
    });
  });

app.get("/", async function (req, res) {
  res.send(dataIndata + "<br>");
});

stream.pipe(csvStream);
app.listen(4000);
