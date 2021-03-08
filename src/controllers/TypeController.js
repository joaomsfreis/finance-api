const pg = require('../postgres').pool;
const {v4: uuidv4} = require('uuid');

module.exports = {
    index: async (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            client.query('SELECT * FROM types;', (err, result) => {
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
                text: 'INSERT INTO types (id, name) VALUES($1, $2)',
                values: [uuidv4(), req.body.name],
            }

            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                res.status(201).send({
                    response: result.rows
                });

            })

        });
    },

    show: async  (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            const query = {
                text: 'SELECT * FROM types WHERE id = $1',
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
                text: 'UPDATE types SET name = $1 WHERE id = $2',
                values: [req.body.name, req.body.id],
            }


            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                res.status(200).send({
                    message: 'Tipo atualizado com sucesso!'
                });

            })
        });
    },

    delete: async (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            const query = {
                text: 'DELETE FROM types WHERE id = $1',
                values: [req.body.id],
            }


            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                res.status(200).send({
                    message: 'Tipo excluido com sucesso!'
                });

            })
        });
    }
}