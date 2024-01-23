const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./src/routes/route")

const port = 5000;

app.use(express.json());
app.use(cors());

const { htmlStructure, htmlStructureWithImage } = require("./structure");

app.use("/", router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
