require("dotenv").config()
const express = require("express");
const app = express();
const port = 5500;

const cors = require('cors')

//* db connection
const dbConnection = require("./db/dbConfig");
app.use(cors())

//* user routes middleware file
const userRoutes = require("./routes/userRoutes");
//* question routes middleware file
const questionRoute = require("./routes/questionRoute");
//* answers routes middleware file
const answerRoute = require("./routes/answerRoute");

//* authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");


//* json middleware to extract json data
app.use(express.json());

//* user routes middleware
app.use("/api/users", userRoutes);
//* questions routes middleware ??
app.use("/api/questions", authMiddleware, questionRoute);
//* Answers routes middleware ??
app.use("/api/answers", authMiddleware, answerRoute);



async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established ");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();


