const pool = require("../database/database.js");

const get_con = {
    get_all_user: async (req, res) => {
        try {
            const all_user = await pool.query("SELECT * FROM get_all_users()");
            res.json(all_user.rows);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },
    get_all_premission: async (req, res) => {
        try {
            const all_premission = await pool.query(
                "SELECT * FROM get_all_permissions()",
            );
            res.json(all_premission.rows);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },
    get_all_interface: async (req, res) => {
        try {
            const all_interface = await pool.query(
                "SELECT * FROM get_all_interfaces()",
            );
            res.json(all_interface.rows);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },
    get_list_by_tablename: async (req, res) => {
        try {
            const { tablename } = req.body;
            if (!tablename) {
            res.status(404).json({ error: error.message });            }
            const list = await pool.query("SELECT * FROM get_list_by_tablename($1)", [
                tablename,
            ]);
            res.json(list.rows);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },
    get_permissions_by_user_type: async (req, res) => {
        try {
            const { user_type } = req.body;
            const permissions = await pool.query(
                "SELECT * FROM get_permissions_by_user_type($1)",
                [user_type],
            );
            res.json(permissions.rows);
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    },
};
module.exports = { get_con };