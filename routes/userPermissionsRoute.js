const express = require('express');
const userPermissionsController = require('../controller/userPermissions');

const router = express.Router();

router.get('/', userPermissionsController.getUsers);
router.post('/', userPermissionsController.createUser);
router.get('/:user_id', userPermissionsController.getUserPermissions);
router.put('/:user_id', userPermissionsController.updateUserPermissions);
router.delete('/:user_id', userPermissionsController.deleteUser);

module.exports = router;
