"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = require('../controllers/events');
const router = (0, express_1.Router)();
router.get('/:username', controller.getAllUserEvents);
router.post('/updatePost/:id', controller.updatePost);
router.post('/create/:username', controller.addEvent);
exports.default = router;
