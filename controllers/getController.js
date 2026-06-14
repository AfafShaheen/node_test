const pool = require("../database/database.js");

const get_con = {
    get_all_user: async (req, res) => {
        try {
            const all_user = await pool.query("SELECT * FROM get_all_users()");
            res.status(200).json({ success: all_user.rows });
        } catch (err) {
            res.status(404).json({ error: 'حدث خطأ' });
        }
    },
    get_all_premission: async (req, res) => {
        try {
            const all_premission = await pool.query(
                "SELECT * FROM get_all_permissions()",
            );
            res.status(200).json({ success: all_premission.rows });
        } catch (err) {
            res.status(404).json({ error: 'حدث خطأ' });
        }
    },
    get_all_interface: async (req, res) => {
        try {
            const all_interface = await pool.query(
                "SELECT * FROM get_all_interfaces()",
            );
            res.status(200).json({ success: all_interface.rows });
        } catch (err) {
            res.status(404).json({ error: 'حدث خطأ' });
        }
    },
    get_list_by_tablename: async (req, res) => {
        try {
            const { tablename } = req.params;
            if (!tablename) {
                return res.status(400).json({ message: "tablename is required" });
            }
            const list = await pool.query("SELECT * FROM get_list_by_tablename($1)", [
                tablename,
            ]);
            res.status(200).json({ success: list.rows });
        } catch (err) {
            res.status(404).json({ error: 'حدث خطأ' });
        }
    },
    get_permissions_by_user_type: async (req, res) => {
        try {
            const { user_type } = req.params;
            const permissions = await pool.query(
                "SELECT * FROM get_permissions_by_user_type($1)",
                [user_type],
            );
            res.status(200).json({ success: permissions.rows });
        } catch (err) {
            res.status(404).json({ error: 'حدث خطأ' });
        }
    },
};
module.exports = { get_con };
