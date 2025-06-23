const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const requireAuth = require('../middleware/auth'); 
const requireAdmin = require('../middleware/requireAdmin'); 

// GET /api/admin/users
router.get('/admin/users', requireAuth, requireAdmin, getAllUsers);

module.exports = router;