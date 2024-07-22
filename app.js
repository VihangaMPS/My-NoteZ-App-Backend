const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const globalErrorHandler = require('./controller/errorController');
const AppError = require("./utils/appError");
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');

const app = express();

app.use(express.json( {limit: "15kb"}));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({ origin: "*" }));


app.use('/api/users',userRouter);
app.use('/api/notes',noteRouter);
app.all('*', (req, res, next) => {
    next(  new AppError(`Can't find ${req.originalUrl} on this server!`, 404) );
});


// ========== Global Error Handling Middleware ==============
app.use(globalErrorHandler);

module.exports = app;