"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = require('../controllers/notes');
const router = (0, express_1.Router)();
router.post('/:username', controller.getNotes);
router.post('/create/:username', controller.addNote);
router.put('/updateNote/:username', controller.updateNote);
exports.default = router;
