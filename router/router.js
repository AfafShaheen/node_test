const router=require('express').Router();
const get_all_user=require('../controllers/getController.js').get_con.get_all_user;
const update_password_user=require('../controllers/updateController.js').update_password_user;
const active_deactive_user=require('../controllers/updateController.js').active_deactive_user;
const create_user=require('../controllers/insertControoler.js').insertController.create_user;

router.post('/create_user',create_user);
router.put('/update_password_user',update_password_user);
router.put('/active_deactive_user',active_deactive_user);
router.get('/get_all_user',get_all_user);

module.exports=router;