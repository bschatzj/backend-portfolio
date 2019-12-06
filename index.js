const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 4030;


const sendGrid = require('@sendGrid/mail');


const app = express();


app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.get('/api', (req, res, next) => {
    res.send('API Status: I DID IT!!!!')
});


app.post('/api/email', (req, res, next) => {

    console.log(req.body);

    sendGrid.setApiKey('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');
    const msg = {
        to: 'brendanschatz97@gmail.com',
        from: req.body.email,
        subject: req.body.name,
        text: req.body.message,
    }

    sendGrid.send(msg)
        .then(result => {

            res.status(200).json({
                success: true
            });

        })
        .catch(err => {

            console.log('error: ', err);
            res.status(401).json({
                success: false
            });

        });
});


app.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});