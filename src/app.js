const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const transactionsRoute = require('./routes/transactions');
const typesRoute = require('./routes/types');
const usersRoute = require('./routes/users');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Request-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPITIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/transactions', transactionsRoute);
app.use('/types', typesRoute);
app.use('/users', usersRoute);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado.');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            message: error.message
        }
    })
})

module.exports = app;