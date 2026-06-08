const pool=require('../database/database.js');

const delete_con={
    delete_interface_by_id: async(req,res)=>{
        try {
            const {id} = req.params;
            const delete_interface = await pool.query('SELECT * FROM delete_interface_by_id($1)',[id]);
            res.json(delete_interface.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }           
    },
    delete_list_by_id : async(req,res) => {
        try {   
            const {tablename,id} = req.params;
            const delete_list = await pool.query('SELECT * FROM delete_list_by_id($1,$2)',[tablename,id]);
            res.json(delete_list.rows[0]);
    }   
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    delete_premission_by_id : async(req,res) => {
        try{
            const {id}=req.params;
            const delete_premission_by_id = await pool.query('SELECT * FROM delete_premission_by_id($1)',[id]);
            res.json(delete_premission_by_id.rows[0]);
        }
        catch(error){   
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    delete_premission: async(req,res) => {
        try{
            const {user_type_id,interface_id} = req.params;
            const delete_premission = await pool.query('SELECT * FROM delete_premission($1,$2)',[user_type_id,interface_id]);   
            res.json(delete_premission.rows[0]);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = { delete_con };