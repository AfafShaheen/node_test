const pool=require('../database/database.js');
const delete_con={
    delete_interface_by_id: async(req,res)=>{
        try {
            const token = req.userToken;
            const {id} = req.body;
            const delete_interface = await pool.query('SELECT * FROM delete_interface_by_id($1,$2)',[id, token]);
            res.json(delete_interface.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }           
    },
    delete_list_by_id : async(req,res) => {
        try {   
            const token = req.userToken;
            const {tablename,id} = req.body;
            const delete_list = await pool.query('SELECT * FROM delete_list_by_id($1,$2,$3)',[tablename,id, token]);
            res.json(delete_list.rows[0]);
    }   
    catch(error){
        console.error(error);
        res.status(404).json({ error: error.message });
        }
    },
    delete_premission_by_id : async(req,res) => {
        try{
            const token = req.userToken;
            const {id}=req.body;
            const delete_premission_by_id = await pool.query('SELECT * FROM delete_premission_by_id($1,$2)',[id, token]);
            res.json(delete_premission_by_id.rows[0]);
        }
        catch(error){   
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = { delete_con };