import { Router } from "express";
import { getPublications } from "../controllers/publications";



const router = Router();

router.get('/:id', getPublications);



export default router;