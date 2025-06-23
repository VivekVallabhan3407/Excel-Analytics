const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const requireAuth = require('../middleware/auth'); 
const requireAdmin = require('../middleware/requireAdmin'); 
const adminController = require('../controllers/adminController');
// GET /api/admin/users
router.get('/admin/users', requireAuth, requireAdmin, getAllUsers);
router.get('/users',requireAuth, adminController.getAllUsers);
module.exports = router;