const express = require('express');
const router = express.Router();
const categories = require('../services/categories');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await categories.getCategories());
  } catch (err) {
    console.error(`Error while getting categories `, err.message);
    next(err);
  }
});

module.exports = router;