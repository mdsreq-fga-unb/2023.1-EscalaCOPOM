const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const database = require("./models");
const userRoute = require("./routes/User");
const passwordRoute = require("./routes/Password");
const employeeRoute = require("./routes/Employee");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/auth", userRoute);
app.use("/api/password-reset", passwordRoute);
app.use("/registration", employeeRoute);

database.sequelize.sync().then(() => {
  app.listen(3005, () => {
    console.log("Servidor está rodando na porta 3005");
  });
});