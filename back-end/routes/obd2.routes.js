const express = require('express');

const { getOBD2ById, getAllOBD2 } = require('../controllers/obd2.controller.js');

const router = express.Router();

router.get('/:id', getOBD2ById);
router.get('/', getAllOBD2);

export default router;