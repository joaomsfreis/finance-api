const pg = require('../postgres').pool;
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');

module.exports = {
    register: async (req, res) => {
        await pg.connect((err, client) => {

            if (err) return res.status(500).send({err});

            const query = {
                text: 'SELECT * FROM users WHERE email = $1',
                values: [req.body.email],
            }


            client.query(query, (err, result) => {
                if (err) return res.status(500).send({err});

                if (result.rows.length > 0) {
                    res.status(409).send({
                        message: "Email já cadastrado!"
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                        if (errBcrypt) return res.status(500).send({errBcrypt});

                        const query = {
                            text: 'INSERT INTO users (id, email, password) VALUES($1, $2, $3)',
                            values: [uuidv4(), req.body.email, hash],
                        }

                        client.query(query, (err, result) => {
                            if (err) return res.status(500).send({err});

                            const response = {
                                message: "Usuário cadastrado com sucesso!",
                                request: {
                                    type: 'POST',
                                    description: 'Cadastra usuário.'
                                }
                            }

                            res.status(201).send(response);

                        })
                    });
                }
            })
        });
    },

}