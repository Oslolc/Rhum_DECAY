require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('API Rhum Arrangé OK');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Serveur lancé sur le port ${PORT}`)
);