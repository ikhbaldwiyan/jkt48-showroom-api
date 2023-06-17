const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const roomRouter = require('./routes/roomRoute');
const liveRouter = require('./routes/liveRoute');
const userRouter = require('./routes/userPermissionsRoute');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Set up routes
    app.get('/', (req, res) => {
      res.send({
        message: 'Welcome To JKT48 SHOWROOM API',
        author: 'https://github.com/ikhbaldwiyan',
        repository: 'https://github.com/ikhbaldwiyan/jkt48-showroom-api',
      });
    });

    app.use('/api/rooms', roomRouter);
    app.use('/api/lives', liveRouter);
    app.use('/api/users', userRouter);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server Running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
