const express = require("express");
const router = express.Router();
const vendors = require("../services/vendors");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await vendors.getvendors());
  } catch (err) {
    console.error(`Error while getting vendors `, err.message);
    next(err);
  }
});

router.get("/rfps", async function (req, res, next) {
  try {
    res.json(await vendors.getvendorrfps(req.query.vendorId));
  } catch (err) {
    console.error(`Error while getting vendors `, err.message);
    next(err);
  }
});

router.get("/rfpById", async function (req, res, next) {
  try {
    res.json(
      await vendors.getvendorrfpsById(req.query.vendorId, req.query.rfpId)
    );
  } catch (err) {
    console.error(`Error while getting vendors `, err.message);
    next(err);
  }
});

router.post("/updateParticipationStatus", async function (req, res, next) {
  try {
    res.json(await vendors.updateParticipationStatus(req));
  } catch (err) {
    console.error(`Error while Updating records `, err.message);
    next(err);
  }
});

router.get("/rfpBids", async function (req, res, next) {
  try {
    res.json(await vendors.getrfpBids(req.query.rfpId));
  } catch (err) {
    console.error(`Error while getting rfp bids `, err.message);
    next(err);
  }
});

router.get("/rfpBidsByVendor", async function (req, res, next) {
  try {
    res.json(await vendors.getrfpBidsByVendor(req));
  } catch (err) {
    console.error(`Error while getting rfp bids `, err.message);
    next(err);
  }
});



module.exports = router;
