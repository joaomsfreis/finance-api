const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const transactionsRoute = require('./routes/transactions');
const typesRoute = require('./routes/types');
const usersRoute = require('./routes/users');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors(corsOptions));

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