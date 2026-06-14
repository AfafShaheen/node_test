const pool=require('../database/database.js');

const update_con ={
    update_password_user: async (req,res)=>{
        try {
            const token = req.headers.token;
            const {id,password}=req.body;
            const update_password=await pool.query('SELECT * FROM update_password_user($1,$2,$3)',[id,password, token]);
            res.status(200).json({ success: update_password.rows[0] });
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
    active_deactive_user: async (req,res)=>{
        try {
            const token = req.headers.token;
            const {id}=req.body;
            const active_deactive=await pool.query('SELECT * FROM active_deactive_user($1,$2)',[id, token]);
            res.status(200).json({ success: active_deactive.rows[0] });
        }
        catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
}

module.exports = update_con;