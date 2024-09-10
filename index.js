const express = require('express');
const routes = require('./routes/router');

const app = express();

app.use(express.json());
app.use('/api', routes);
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})