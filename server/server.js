const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');

const { xss } =  require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize');

const routes = require('./routes');

const { handleError,convertToApiError } = require('./middleware/apiError');

// JWT
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');


const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri)

// PARSING
app.use(bodyParser.json());

// SANITIZE
app.use(xss());
app.use(mongoSanitize());

// PASSPORT JWT
app.use(passport.initialize());
passport.use('jwt',jwtStrategy)

// ROUTES
app.use('/api',routes);

// ERROR HANDLING
app.use(convertToApiError)
app.use((err,req,res,next)=>{
    handleError(err,res)
});

//HEROKU
app.use(express.static('client/build'));
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    });
}


const port =  process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
});