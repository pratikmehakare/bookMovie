const express = require('express');
const app = express();
const cors = require("cors");
const ConnectDb = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 5000

app.use(express.json());

app.use(cors());

ConnectDb();

const routes = require("./routes/routes");
app.use('/api/v1',routes)

app.listen(PORT,()=>{
   console.log(`Server Running at ${PORT}`)
})