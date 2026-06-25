const pool = require("../database/database.js");

const check_con = {
    authentication: async (req, res, next) => {
        const token = req.headers.token;
        await pool
            .query("select * from authentication($1)", [token])
            .then((result) => {
                if (result.rows[0].authentication > 0) {
                    next();
                } else {
                    console.log("error_authentication");
                    res.status(404).json({ error: error.message });
                }
            })
            .catch((error) => {
                console.log("from catch error_authentication");
                res.status(404).json({ error: error.message });
            });
    },
    login: async (req, res) => {
        try {
            const { user_name, password } = req.body;
            const result = await pool.query("SELECT * FROM login($1, $2)", [
                user_name,
                password,
            ]);
            res.json(result.rows[0]);
        } catch (err) {
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = { check_con };
