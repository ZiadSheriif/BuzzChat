import express from 'express';
const messageController = require('../controllers/messages-controllers');

const router = express.Router();

router.post('/create', messageController.createMessage);
router.get('/:groupId', messageController.getMessages);

module.exports = router;