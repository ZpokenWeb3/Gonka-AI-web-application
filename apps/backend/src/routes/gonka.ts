import { Router } from 'express';
import {
  gonkaChatController,
  gonkaEndpointsController,
} from '../controllers/gonka.controller';

const router = Router();

router.post('/chat', gonkaChatController);
router.get('/endpoints', gonkaEndpointsController);

export default router;
