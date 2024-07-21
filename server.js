const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./app');

const LocalDB = process.env.DATABASE_LOCAL; // Mongo Local
mongoose.connect(LocalDB).then(() => console.log('DB Connection successful!'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})