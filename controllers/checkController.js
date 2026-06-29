const pool = require("../database/database.js");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const check_con = {
    authentication: async (req, res, next) => {
        const token = req.headers.token;

        if (!token) {
            return res.status(404).json({ error: 'حدث خطأ أثناء المصادقة' });
        }

        const secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                console.log("error_authentication");
                return res.status(404).json({ error: 'حدث خطأ أثناء المصادقة' });
            }

            req.userToken = payload.userToken;
            req.userRole = payload.role;

            next();
        });
    },
    login: async (req, res) => {
        try {
            const { user_name, password } = req.body;
            const result = await pool.query("SELECT * FROM login($1, $2)", [
                user_name,
                password,
            ]);

            if (!result.rows || result.rows.length === 0) {
                return res.status(404).json({ error: 'حدث خطأ أثناء المصادقة' });
            }

            const user = result.rows[0];

            if (!user.token_val) {
                return res.status(404).json({ error: 'حدث خطأ أثناء المصادقة' });
            }

            const payload = {
                userToken: user.token_val,
                role: user.type_id,
            };

            const secret = process.env.JWT_SECRET;
            const expiresIn = process.env.JWT_EXPIRES_IN;

            const jwtToken = jwt.sign(payload, secret, { expiresIn });

            res.json({
                token: jwtToken,
                type_id: user.type_id,
                full_name: user.full_name,
                user_name: user.user_name,
                is_active: user.is_active,
            });
        } catch (err) {
            return res.status(404).json({ error: 'حدث خطأ أثناء المصادقة' });
        }
    },
};

module.exports = { check_con };