const pool=require('../database/database.js');

const update_con ={
    update_password_user: async (req,res)=>{
        try {
            const {id,password}=req.body;
            const update_password=await pool.query('SELECT * FROM update_password_user($1,$2)',[id,password]);
            res.json(update_password.rows[0]);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    active_deactive_user: async (req,res)=>{
        try {
            const {id}=req.body;
            const active_deactive=await pool.query('SELECT * FROM active_deactive_user($1)',[id]);
            res.json(active_deactive.rows[0]);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = update_con;