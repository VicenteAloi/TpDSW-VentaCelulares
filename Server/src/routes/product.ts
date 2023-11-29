import { Router } from 'express'
import { deleteProduct, getOneProduct, getProducts, updateProduct, newProduct, getProductsByName } from '../controllers/product';
import validateToken from './validate-token';

import multer from "multer";
const storage = require('../db/multer')
const uploader = multer({ storage })

const router = Router();

router.get('/', getProducts);
router.put('/:id', validateToken, updateProduct);
router.delete('/:id', validateToken, deleteProduct);
router.post('/', validateToken, uploader.single('file'), newProduct);
router.get('/:id', getOneProduct);
router.get('/pbn/:name', getProductsByName);

export default router;