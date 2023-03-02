const express = require('express');
const router = express.Router();
const categories = require('../services/subCategories');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await categories.getsubCategories(req.query.categoryId));
  } catch (err) {
    console.error(`Error while getting subcategories `, err.message);
    next(err);
  }
});

module.exports = router;