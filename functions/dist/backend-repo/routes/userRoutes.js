import express from 'express';
import userApi from '../controller/api.js';
const router = express.Router();
router.use('/', userApi);
export default router;
