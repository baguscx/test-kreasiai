const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const categoryRouter = require("./routes/feedback");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/feedback", categoryRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
