const pool = require('../database/database.js');

const insertController = {
    create_user: async (req, res) => {
        try {
            const token = req.headers.token;
            const { name, password, full_name, user_type } = req.body;
            const new_user = await pool.query('SELECT * FROM create_user($1,$2,$3,$4,$5)', [name, password, full_name, user_type, token]);
            res.status(200).json({ success: new_user.rows });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'حدث خطأ' })        }
    },
    add_premission: async (req,res) => {
        try {
            const token = req.headers.token;
            const {user_type_id,interface_id} = req.body;
            const new_premission = await pool.query('SELECT * FROM add_premission($1,$2,$3)', [user_type_id,interface_id, token]);
            res.status(200).json({ success: new_premission.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'حدث خطأ' });
        }
    },
    insert_list_by_tablename : async(req,res)=>{
        try{
            const token = req.headers.token;
            const {tablename, name} = req.body;
            const new_list = await pool.query('SELECT * FROM insert_list_by_tablename($1,$2,$3)', [tablename,name, token]);
            res.status(200).json({ success: new_list.rows[0] });
        }
        catch(error){
            console.error(error);
            res.status(404).json({ error: 'حدث خطأ' });
        }
    },
    insert_interface: async(req,res) =>{
        try{
            const token = req.headers.token;
            const {english_name,arabic_name,father_id} = req.body;
            const new_interface = await pool.query('SELECT * FROM insert_interface($1,$2,$3,$4)', [english_name, arabic_name, father_id, token]);
            res.status(200).json({ success: new_interface.rows[0] });
        }
        catch(error){
            console.error(error);
            res.status(404).json({ error: 'حدث خطأ' });
        }
    }
};

module.exports = { insertController };