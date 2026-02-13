const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {uploadProfileImage} = require('../controllers/authController');
const { 
  register, 
  login, 
  getUsers, 
  updateUser, 
  deleteUser 
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:id/profile-image', upload.single('profileImage'), uploadProfileImage);
router.post("/upload/:id", upload.single("Image"), uploadProfileImage);
module.exports = router;