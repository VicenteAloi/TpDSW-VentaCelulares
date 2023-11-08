import { Router } from "express";
import { deleteCustomer, getCustomers, getSalesUser,updateCustomer } from "../controllers/customers";
import { loginUser } from "../controllers/user";
import validateToken from "./validate-token";


const router = Router();

router.get('/', getCustomers);
router.delete('/:dni', deleteCustomer);
router.patch('/:dni', updateCustomer);
router.post('/login', loginUser);
router.get('/:id', getSalesUser);



export default router;