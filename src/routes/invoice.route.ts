import express from 'express';
import InvoiceController from '~/controllers/InvoiceController';
import {use} from '~/middleware';

const router = express.Router();

router.post('/', use(InvoiceController.create));

export default router;
