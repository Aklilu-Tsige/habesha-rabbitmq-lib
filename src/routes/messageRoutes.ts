import { Router } from 'express';
import { sendMessage, consumeMessage } from '../controllers/messageController';

const router = Router();

router.post('/send', sendMessage);
router.post('/consume', consumeMessage);

export default router;
