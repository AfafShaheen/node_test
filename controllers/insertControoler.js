const pool = require('../database/database.js');

const insertController = {
    create_user: async (req, res) => {
        try {
            const { name, password, full_name, user_type } = req.body;
            const new_user = await pool.query('SELECT * FROM create_user($1,$2,$3,$4)', [name, password, full_name, user_type]);
            res.json(new_user.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    add_premission: async (req,res) => {
        try {
            const {user_type_id,interface_id} = req.body;
            const new_premission = await pool.query('SELECT * FROM add_premission($1,$2)', [user_type_id,interface_id]);
            res.json(new_premission.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    insert_list_by_tablename : async(req,res)=>{
        try{
            const {tablename, name} = req.body;
            const new_list = await pool.query('SELECT * FROM insert_list_by_tablename($1,$2)', [tablename,name]);
            res.json(new_list.rows[0]);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    insert_interface: async(req,res) =>{
        try{
            const {english_name,arabic_name,father_id} = req.body;
            const new_interface = await pool.query('SELECT * FROM insert_interface($1,$2,$3)', [english_name, arabic_name, father_id]);
            res.json(new_interface.rows[0]);
        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = { insertController };