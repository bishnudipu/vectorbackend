const express = require('express');
const router = express.Router();
const rfp = require('../services/rfp');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await rfp.getrfps(req.query.page));
  } catch (err) {
    console.error(`Error while getting rfps `, err.message);
    next(err);
  }
});


router.post('/', async function(req, res, next) {
  try {
    res.json(await rfp.createrfps(req));
 
  } catch (err) {
    console.error(`Error while creating Rfp`, err.message);
    next(err);
  }
});

router.get('/rfpVendors', async function(req, res, next) {
  try {
  	
    res.json(await rfp.getrfpvendors(req.query.rfpId));
  } catch (err) {
    console.error(`Error while getting rfp vendors `, err.message);
    next(err);
  }
});


router.get('/:id', async function(req, res, next) {
  try {
  	
    res.json(await rfp.getRfpById(req.params.id));
  } catch (err) {
    console.error(`Error while getting rfp vendors `, err.message);
    next(err);
  }
});



router.post("/createbids", async function (req, res, next) {
  try {
    res.json(await rfp.createbids(req));
  } catch (err) {
    console.error(`Error while creating Bid`, err.message);
    next(err);
  }
});

router.post("/updateRfpStatus", async function (req, res, next) {
  try {
    res.json(await rfp.updateRfpStatus(req));
  } catch (err) {
    console.error(`Error while Updating Status`, err.message);
    next(err);
  }
});




module.exports = router;