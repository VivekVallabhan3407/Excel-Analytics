const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const requireAuth = require('../middleware/auth'); 
const requireAdmin = require('../middleware/requireAdmin'); 
const adminController = require('../controllers/adminController');
const {updateUserRole, deleteUser} = require('../controllers/adminController');
const { getChartTypeStats } = require("../controllers/chartController");
const { getMonthlyUserStats } = require("../controllers/adminController");

// GET /api/admin/users
router.get('/users', requireAuth, requireAdmin, getAllUsers);
router.put('/users/:id/role',requireAuth, requireAdmin,updateUserRole) ;
router.delete('/users/:id', requireAuth, requireAdmin, deleteUser);
router.get("/chartTypeStats", requireAdmin, getChartTypeStats);
router.get("/userStats", requireAdmin, getMonthlyUserStats);

module.exports = router;