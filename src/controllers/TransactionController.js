const pg = require('../postgres').pool;
const {v4: uuidv4} = require('uuid');

module.exports = {
    index: async (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            client.query('SELECT transactions.*, types.name as type FROM transactions ' +
                'INNER JOIN types ON transactions.type_id = types.id;', (err, result) => {

                if (err) return res.status(500).send({err});

                res.status(200).send({
                    response: result.rows
                });

            })

        });
    },

    store: async (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            const query = {
                text: 'INSERT INTO transactions (id, type_id, value, description, date) VALUES($1, $2, $3, $4, $5)',
                values: [uuidv4(), req.body.type_id, req.body.value, req.body.description, req.body.date],
            }

            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                res.status(201).send({
                    message: 'Transação cadastrada com sucesso!'
                });

            })

        });
    },

    show: async  (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            const query = {
                text: 'SELECT transactions.*, types.name as type FROM transactions ' +
                    'INNER JOIN types ON transactions.type_id = types.id WHERE transactions.id = $1',
                values: [req.params.id],
            }


            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                res.status(200).send({
                    response: result.rows[0]
                });

            })
        });
    },

    update: async (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            const query = {
                text: 'UPDATE transactions SET type_id = $1, value = $2, description = $3, date = $4  WHERE id = $5',
                values: [ req.body.type_id, req.body.value, req.body.description, req.body.date, req.body.id],
            }


            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                res.status(200).send({
                    message: 'Transação atualizado com sucesso!'
                });

            })
        });
    },

    delete: async (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            const query = {
                text: 'DELETE FROM transactions WHERE id = $1',
                values: [req.body.id],
            }


            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                res.status(200).send({
                    message: 'Transação excluido com sucesso!'
                });

            })
        });
    }
}