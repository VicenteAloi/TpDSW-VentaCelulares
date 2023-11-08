import { Router } from 'express';
import { getOneSales, getSales, postSell } from '../controllers/sales';

const router = Router();

router.get('/',getSales);
router.get('/:dniCustomer',getOneSales);
router.post('/',postSell);
export default router;