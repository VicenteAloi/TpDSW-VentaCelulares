"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_1 = require("../controllers/sales");
const router = (0, express_1.Router)();
router.get('/', sales_1.getSales);
router.get('/:dniCustomer', sales_1.getOneSales);
router.post('/', sales_1.postSell);
exports.default = router;
