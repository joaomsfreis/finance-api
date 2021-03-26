const pg = require('../postgres').pool;
const {v4: uuidv4} = require('uuid');

module.exports = {
    index: async (req, res) => {
        await pg.connect((err, client) => {
            if (err) return res.status(500).send({err});

            client.query('SELECT * FROM types;', (err, result) => {
                if (err) return res.status(500).send({err});

                const response = {
                    amount: result.rowCount,
                    types: result.rows.map(row => ({
                        id: row.id,
                        name: row.name,
                        request: {
                            type: 'GET',
                            description: 'Retorna todos os tipos.'
                        }
                    }))
                }

                res.status(200).send(response);

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

                const response = {
                    message: "Tipo criado com sucesso!",
                    request: {
                        type: 'POST',
                        description: 'Cria um tipo.'
                    }
                }

                res.status(201).send(response);

            })

        });
    },

    show: async (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            const query = {
                text: 'SELECT * FROM types WHERE id = $1',
                values: [req.params.id],
            }


            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                if (result.rows.length === 0) return res.status(404).send({
                    message: "Item não encontrado!"
                });

                const response = {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                    request: {
                        type: 'GET',
                        description: 'Retorna um tipo específico.'
                    }
                }

                res.status(200).send(response);

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

                const response = {
                    message: "Tipo atualizado com sucesso!",
                    request: {
                        type: 'PATCH',
                        description: 'Atualiza um tipo.'
                    }
                }

                res.status(200).send(response);

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

                const response = {
                    message: "Tipo excluído com sucesso!",
                    request: {
                        type: 'DELETE',
                        description: 'Exclue um tipo.'
                    }
                }

                res.status(200).send(response);

            })
        });
    }
}