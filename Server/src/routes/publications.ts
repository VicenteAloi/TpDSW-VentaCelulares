import { Router } from "express";
import { getPublications, newPublication } from "../controllers/publications";



const router = Router();

router.get('/:id', getPublications);
router.post('/:id',newPublication);



export default router;