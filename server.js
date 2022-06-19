if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');

const IndexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expresslayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myLibrary',
 { useNewUrlParser: true ,
   useUnifiedTopology: true
 });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
}).on('disconnected', function() {
    console.log('Disconnected from MongoDB');
}).on('reconnected', function() {
    console.log('Reconnected to MongoDB');
}).on('timeout', function() {
    console.log('Timeout from MongoDB');
}).on('close', function() {
    console.log('Close from MongoDB');
});


app.use('/', IndexRouter);

const server = app.listen(process.env.PORT || 3000);
console.log('Listening on port %d w %s mode!',server.address().port, app.settings.env);



