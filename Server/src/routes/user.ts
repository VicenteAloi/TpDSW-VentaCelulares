import { Router } from "express";
import { loginUser, newUser } from "../controllers/user";
import { getCustomer } from "../controllers/customers";



const router = Router();


router.post('/login', loginUser);
router.get('/login/:email', getCustomer)
router.post('/', newUser)
export default router;