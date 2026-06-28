const router=require('express').Router();
const get_con = require('../controllers/getController.js').get_con;
const update_con = require('../controllers/updateController.js').update_con;
const insertController = require('../controllers/insertControoler.js').insertController;
const delete_con = require('../controllers/deletController.js').delete_con;
const check_con = require('../controllers/checkController.js').check_con;


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - password
 *             properties:
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns the token
 */
router.post('/login',check_con.login);

/**
 * @swagger
 * /create_user:
 *   post:
 *     summary: Create a new user (staff member)
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - full_name
 *               - user_type
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               full_name:
 *                 type: string
 *               user_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post('/create_user',insertController.create_user);


router.use(check_con.authentication);


/**
 * @swagger
 * /update_password_user:
 *   put:
 *     summary: Update a user's password
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - password
 *             properties:
 *               id:
 *                 type: integer
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.put('/update_password_user',update_con.update_password_user);

/**
 * @swagger
 * /active_deactive_user:
 *   put:
 *     summary: Activate or deactivate a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User status updated successfully
 */
router.put('/active_deactive_user',update_con.active_deactive_user);

/**
 * @swagger
 * /get_all_user:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/get_all_user',get_con.get_all_user);

/**
 * @swagger
 * /get_all_premission:
 *   get:
 *     summary: Get all permissions
 *     tags:
 *       - Permission
 *     responses:
 *       200:
 *         description: List of all permissions
 */
router.get('/get_all_premission',get_con.get_all_premission);

/**
 * @swagger
 * /get_list_by_tablename:
 *   get:
 *     summary: Get a list of items by table name
 *     tags:
 *       - Lookup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tablename
 *             properties:
 *               tablename:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of items for the given table
 */
router.get('/get_list_by_tablename',get_con.get_list_by_tablename);

/**
 * @swagger
 * /get_permissions_by_user_type:
 *   get:
 *     summary: Get permissions by user type
 *     tags:
 *       - Permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_type
 *             properties:
 *               user_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of permissions for the given user type
 */
router.get('/get_permissions_by_user_type',get_con.get_permissions_by_user_type);

/**
 * @swagger
 * /get_all_interface:
 *   get:
 *     summary: Get all interfaces
 *     tags:
 *       - Interface
 *     responses:
 *       200:
 *         description: List of all interfaces
 */
router.get('/get_all_interface',get_con.get_all_interface);

/**
 * @swagger
 * /delete_interface_by_id:
 *   delete:
 *     summary: Delete an interface by id
 *     tags:
 *       - Interface
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Interface deleted successfully
 */
router.delete('/delete_interface_by_id',delete_con.delete_interface_by_id);

/**
 * @swagger
 * /delete_list_by_id:
 *   delete:
 *     summary: Delete a list item by id
 *     tags:
 *       - Lookup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tablename
 *               - id
 *             properties:
 *               tablename:
 *                 type: string
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: List item deleted successfully
 */
router.delete('/delete_list_by_id',delete_con.delete_list_by_id);

/**
 * @swagger
 * /delete_premission_by_id:
 *   delete:
 *     summary: Delete a permission by id
 *     tags:
 *       - Permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 */
router.delete('/delete_premission_by_id',delete_con.delete_premission_by_id);

/**
 * @swagger
 * /delete_premission:
 *   delete:
 *     summary: Delete a permission link between a user type and an interface
 *     tags:
 *       - Permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_type_id
 *               - interface_id
 *             properties:
 *               user_type_id:
 *                 type: integer
 *               interface_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 */
router.delete('/delete_premission',delete_con.delete_premission);

/**
 * @swagger
 * /insert_interface:
 *   post:
 *     summary: Create a new interface
 *     tags:
 *       - Interface
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - english_name
 *               - arabic_name
 *               - father_id
 *             properties:
 *               english_name:
 *                 type: string
 *               arabic_name:
 *                 type: string
 *               father_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Interface created successfully
 */
router.post('/insert_interface',insertController.insert_interface);

/**
 * @swagger
 * /add_premission:
 *   post:
 *     summary: Add a permission link between a user type and an interface
 *     tags:
 *       - Permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_type_id
 *               - interface_id
 *             properties:
 *               user_type_id:
 *                 type: integer
 *               interface_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Permission added successfully
 */
router.post('/add_premission',insertController.add_premission);

/**
 * @swagger
 * /insert_list_by_tablename:
 *   post:
 *     summary: Insert a new item into a lookup table
 *     tags:
 *       - Lookup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tablename
 *               - name
 *             properties:
 *               tablename:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item inserted successfully
 */
router.post('/insert_list_by_tablename',insertController.insert_list_by_tablename);

module.exports=router;