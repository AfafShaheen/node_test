const pool = require('../database/database.js');

const insertController = {
    create_user: async (req, res) => {
        const { name, password, full_name, user_type } = req.body;
        try {
            const new_user = await pool.query('SELECT * FROM create_user($1,$2,$3,$4)', [name, password, full_name, user_type]);
            res.json(new_user.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = { insertController };