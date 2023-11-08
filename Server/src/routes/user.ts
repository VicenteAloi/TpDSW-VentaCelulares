import { Router } from "express";
import { getCustomer, loginUser } from "../controllers/user";
import { newUser } from "../controllers/user";
import validateToken from "./validate-token";



const router = Router();


router.post('/login', loginUser);
router.get('/login/:email', getCustomer)
router.post('/', newUser)
export default router;