const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const roomRouter = require('./routes/roomRoute');

const app = express();
const PORT = 8000;

app.use(cors())
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server Running on port http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome To JKT48 SHOWROOM API',
        author: 'https://github.com/ikhbaldwiyan'
    })
});

app.use('/rooms', roomRouter);