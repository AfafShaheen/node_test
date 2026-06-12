const router=require('express').Router();
const get_all_user=require('../controllers/getController.js').get_con.get_all_user;
const update_password_user=require('../controllers/updateController.js').update_password_user;
const active_deactive_user=require('../controllers/updateController.js').active_deactive_user;
const create_user=require('../controllers/insertControoler.js').insertController.create_user;
const get_all_premission= require('../controllers/getController.js').get_con.get_all_premission;
const get_all_interface=require('../controllers/getController.js').get_con.get_all_interface;
const get_permissions_by_user_type=require('../controllers/getController.js').get_con.get_permissions_by_user_type;
const get_list_by_tablename=require('../controllers/getController.js').get_con.get_list_by_tablename;
const delete_interface_by_id=require('../controllers/deletController.js').delete_con.delete_interface_by_id;
const delete_list_by_id=require('../controllers/deletController.js').delete_con.delete_list_by_id;
const delete_premission_by_id=require('../controllers/deletController.js').delete_con.delete_premission_by_id;
const delete_premission=require('../controllers/deletController.js').delete_con.delete_premission;
const insert_interface=require('../controllers/insertControoler.js').insertController.insert_interface;
const add_premission=require('../controllers/insertControoler.js').insertController.add_premission;
const insert_list_by_tablename=require('../controllers/insertControoler.js').insertController.insert_list_by_tablename;
const check_con = require('../controllers/checkController.js').check_con;

// #swagger.tags = ['User']
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { name: 'string', password: 'string', full_name: 'string', user_type: 'string' } }
router.post('/create_user',create_user);

router.use(check_con.authentication);

// #swagger.tags = ['User']
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { id: 1, password: 'string' } }
router.put('/update_password_user',update_password_user);

// #swagger.tags = ['User']
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { id: 1 } }
router.put('/active_deactive_user',active_deactive_user);

// #swagger.tags = ['User']
router.get('/get_all_user',get_all_user);

// #swagger.tags = ['Permission']
router.get('/get_all_premission',get_all_premission);

// #swagger.tags = ['Lookup']
// #swagger.parameters['tablename'] = { in: 'path', required: true, type: 'string' }
router.get('/get_list_by_tablename/:tablename',get_list_by_tablename);

// #swagger.tags = ['Permission']
// #swagger.parameters['user_type'] = { in: 'path', required: true, type: 'string' }
router.get('/get_permissions_by_user_type/:user_type',get_permissions_by_user_type);

// #swagger.tags = ['Interface']
router.get('/get_all_interface',get_all_interface);

router.delete('/delete_interface_by_id/:id',delete_interface_by_id);

router.delete('/delete_list_by_id/:tablename/:id',delete_list_by_id);

router.delete('/delete_premission_by_id/:id',delete_premission_by_id);

router.delete('/delete_premission/:user_type_id/:interface_id',delete_premission);

// #swagger.tags = ['Interface']
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { english_name: 'string', arabic_name: 'string', father_id: 1 } }
router.post('/insert_interface',insert_interface);

// #swagger.tags = ['Permission']
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { user_type_id: 1, interface_id: 1 } }
router.post('/add_premission',add_premission);

// #swagger.tags = ['Lookup']
// #swagger.parameters['body'] = { in: 'body', required: true, schema: { tablename: 'string', name: 'string' } }
router.post('/insert_list_by_tablename',insert_list_by_tablename);

module.exports=router;