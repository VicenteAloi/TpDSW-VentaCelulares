"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publications_1 = require("../controllers/publications");
const router = (0, express_1.Router)();
router.get('/:id', publications_1.getPublications);
router.post('/:id', publications_1.newPublication);
exports.default = router;
