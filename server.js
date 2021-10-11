const express = require('express');
const path = require('path');
const connectDb = require('./config/db');
const usersRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const entryRoute = require('./routes/api/entries');

const app = express();

// connect to DB
connectDb();

// init middleware
// no need for bodyParser.json() anymore they included req.body handling in Express
app.use(express.json({ extended: false }));

// define routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/entries', entryRoute);

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`DevConnector with Hooks is running on port ${PORT}.`));
