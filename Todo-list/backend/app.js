// External Module
const express = require("express");
const cors = require("cors");

// Local Module
const errorsController = require("./controllers/errors");
const todoRouter = require("./routes/todoRouter");
const connectDB = require("./utils/db");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors()); 

app.use("/api/todo", todoRouter);
app.use(errorsController.pageNotFound);

const PORT = 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`server is running on http://localhost:${PORT}`);
})