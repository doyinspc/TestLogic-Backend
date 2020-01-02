
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.enable('trust proxy');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, XMLHttpRequest, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
  );
  next();
});


app.use(bodyparser.json());
app.listen(3001, ()=>console.log('Express Server running'));
app.use('/', indexRouter);

module.exports = app;
