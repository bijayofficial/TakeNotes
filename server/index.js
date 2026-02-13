const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors")
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 8000;
const app = express();

const authRoutes = require('./routes/auth.js')
const fileRoutes = require('./routes/notes.js')
dotenv.config();
app.use(cors());

app.use(bodyParser.json());


try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`connection successful`);


} catch (error) {
    console.log(error);

}


app.get('/', (req, res) => {
    res.send('server is running ')
})

app.use("/api/auth", authRoutes);

app.use("/api/file", fileRoutes);


app.listen(PORT, () => {
    console.log(`running at ${PORT}`);

})