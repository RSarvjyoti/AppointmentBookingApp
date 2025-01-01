const express = require("express");
const {config} = require("dotenv");
config();
const cors =  require("cors");
const connectDB = require("./src/db/config");
const router = require("./src/routes/appointmentRoutes");
const app = express();

const PORT = process.env.PORT || 8090
const MONGO_URL = process.env.MONGO_URL;

app.get('/', (req, res) => {
    res.send("This is home route");
})

app.use(express.json());
app.use(cors());
app.use('/api', router)

app.listen(PORT , async () => {
    await connectDB(MONGO_URL);
    console.log(`Serer is running at http://localhost:${PORT}`);
})
