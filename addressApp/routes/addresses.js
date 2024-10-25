const express = require('express');
const router = express.Router();
const AddressesController = require('../controllers/addresses');
const controller = new AddressesController();

router.get('/', (req, res) => controller.index(req, res));
router.get('/create', (req, res) => controller.create(req, res));
router.post('/create', (req, res) => controller.create(req, res));
router.get('/update/:id', (req, res) => controller.update(req, res));
router.post('/update/:id', (req, res) => controller.update(req, res));
router.get('/delete/:id', (req, res) => controller.delete(req, res));

module.exports = router;
