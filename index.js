const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.port;

const posts_Routes = require('./routes/posts_routes');
app.use('/posts', posts_Routes);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}!`);
});



