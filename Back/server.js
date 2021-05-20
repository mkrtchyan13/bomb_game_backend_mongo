const express = require('express');
const cors = require('cors');

  
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ 
    extended: true 
}));
app.use(express.json());

const db = require('./src/models');
db.start();
// routes
require('./src/routes/auth')(app);
require('./src/routes/user')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
