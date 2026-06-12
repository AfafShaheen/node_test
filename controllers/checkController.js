const pool = require('../database/database.js');

const check_con = {
    authentication: async (req, res, next) => {
        const token = req.headers.token;
        await pool.query("select * from authentication($1)", [token])
        .then(result => {
            if (result.rows[0].authentication > 0) {
                next();
            } else {
                console.log('error_authentication');
                res.status(404).send({ message: 'حدث خطأ أثناء المصادقة' });
            }
        }).catch(error => {
            console.log('from catch error_authentication');
            res.status(404).send({ message: 'حدث خطأ' });
        });
    }
}

module.exports = { check_con };