import express from 'express';
import userApi from '../controller/api';

const router = express.Router();

router.use('/', userApi);

export default router;