import { Router } from "express";
import { deleteCustomer, getCustomers, getSalesUser, updateCustomer } from "../controllers/customers";
import { loginUser } from "../controllers/user";
import validateToken from "./validate-token";


const router = Router();

router.get('/', getCustomers);
router.delete('/:dni', validateToken, deleteCustomer);
router.patch('/:dni', validateToken, updateCustomer);
router.post('/login', loginUser);
router.get('/:id', validateToken, getSalesUser)//QUERY;



export default router;