const pool=require('../database/database.js');
const delete_con={
    delete_interface_by_id: async(req,res)=>{
        try {
            const token = req.headers.token;
            const { id } = req.body;
            const delete_interface = await pool.query('SELECT * FROM delete_interface_by_id($1,$2)',[id, token]);
            res.status(200).json({ success: delete_interface.rows[0] });

        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'حدث خطأ' })
        }           
    },
    delete_list_by_id : async(req,res) => {
        try {   
            const token = req.headers.token;
            const {tablename,id} = req.body;
            const delete_list = await pool.query('SELECT * FROM delete_list_by_id($1,$2,$3)',[tablename,id, token]);
            res.status(200).json({ success: delete_list.rows[0] });
    }   
    catch(error){
        console.error(error);
        res.status(404).json({ error: 'حدث خطأ' })
        }
    },
    delete_premission_by_id : async(req,res) => {
        try{
            const token = req.headers.token;
            const {id}=req.body;
            const delete_premission_by_id = await pool.query('SELECT * FROM delete_premission_by_id($1,$2)',[id, token]);
            res.status(200).json({ success: delete_premission_by_id.rows[0] });
        }
        catch(error){   
            console.error(error);
            res.status(404).json({ error: 'حدث خطأ' });
        }
    },
    delete_premission: async(req,res) => {
        try{
            const token = req.headers.token;
            const {user_type_id,interface_id} = req.body;
            const delete_premission = await pool.query('SELECT * FROM delete_premission($1,$2,$3)',[user_type_id,interface_id, token]);   
            res.status(200).json({ success: delete_premission.rows[0] });
        }
        catch(error){
            console.error(error);
            res.status(404).json({ error: 'حدث خطأ' });
        }
    }
}

module.exports = { delete_con };