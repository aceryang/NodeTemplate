import express from 'express';

import bodyParser from 'body-parser';
// import router from './routes/basic_routes'; //check out routes/basic_route.js file for more info about routes
import routes from './api';
const app = express();
const port = process.env.PORT || 9002;

// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json());

// Middleware that transforms the values into a nested objects
app.use(bodyParser.urlencoded({
  extended: true
}))

//router will deal with all of the other routes
// app.use('/api', router); 
app.use('/', routes());

app.use('/*', async (req, res) => {
    res.status(404).send("<h1>404 Not found</h1>")
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    console.log('inside error handler');
    res.status(500).json({'Something broke.': err});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));