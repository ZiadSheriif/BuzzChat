import express from 'express';
const groupController = require('../controllers/groups-controllers');

const router = express.Router();

router.post('/create', groupController.createGroup);
router.get('/', groupController.getGroups);
router.get('/:groupId', groupController.getGroupsDetails);

module.exports = router;