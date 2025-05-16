require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ingredientRoutes = require("./routes/ingredientRoutes");
const rhumRoutes = require("./routes/rhumRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(morgan('dev'));
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/rhums", rhumRoutes);
app.use("/api/recipes", recipeRoutes);


app.get('/', (req, res) => {
  res.send('API Rhum Arrangé OK');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Serveur lancé sur le port ${PORT}`)
);

module.exports = express;