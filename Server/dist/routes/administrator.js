"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const administrator_1 = require("../controllers/administrator");
const router = (0, express_1.Router)();
router.get('/:dni', administrator_1.getOneAdministrator);
router.delete('/:dni', administrator_1.deleteAdministrator);
router.put('/:dni', customers_1.updateCustomer);
router.post('/login', validate_token_1.default, user_1.loginUser);
router.get('/', administrator_1.getAdministrators);
router.post('/', user_1.newUser);
exports.default = router;
