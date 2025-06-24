const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const requireAuth = require('../middleware/auth'); 
const requireAdmin = require('../middleware/requireAdmin'); 
const adminController = require('../controllers/adminController');
const {updateUserRole, deleteUser} = require('../controllers/adminController');
// GET /api/admin/users
router.get('/users', requireAuth, requireAdmin, getAllUsers);
router.put('/users/:id/role',requireAuth, requireAdmin,updateUserRole) ;
router.delete('/users/:id', requireAuth, requireAdmin, deleteUser);

module.exports = router;