import { Router } from "express";
import {  updateCustomer } from "../controllers/customers";
import {  loginUser, newUser } from "../controllers/user";
import validateToken from "./validate-token";
import { deleteAdministrator, getAdministrators, getOneAdministrator } from "../controllers/administrator";


const router = Router();


router.get('/:dni', getOneAdministrator);
router.delete('/:dni', deleteAdministrator);
router.put('/:dni', updateCustomer)
router.post('/login', validateToken, loginUser);
router.get('/', getAdministrators);
router.post('/',newUser);


export default router;