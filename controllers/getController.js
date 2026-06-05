const pool=require('../database/database.js');

const get_con ={
    get_all_user: async (req,res)=>{
        try {
            const all_user=await pool.query('SELECT * FROM get_all_users()')
            res.json(all_user.rows);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports={get_con};