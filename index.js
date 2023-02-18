const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userrouter } = require("./routes/user.route");
const { notesrouter } = require("./routes/notes.route");
const { auth } = require("./middlewares/authentication.middleware");
require("dotenv").config();
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

let app = express();
app.use(express.json());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learning Swagger for frist time",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec=swaggerjsdoc(options)
app.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec))

app.use("/user", userrouter);
app.use(auth);
app.use("/notes", notesrouter);

//get

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
