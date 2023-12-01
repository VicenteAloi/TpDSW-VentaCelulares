import { Router } from 'express';
import { getOneSales, getSales, postSell } from '../controllers/sales';

const router = Router();

router.get('/', getSales)//SEQUELIZE;
router.get('/:dniCustomer', getOneSales)//SEQUELIZE;
router.post('/', postSell)//SEQUELIZE;
export default router;