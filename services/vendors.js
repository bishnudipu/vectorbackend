const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getvendors() {
   let status ;
   let message ;
  const rows = await db.query(`SELECT * FROM vendors WHERE  delflag = 'N'`);
  const data = helper.emptyOrRows(rows);

  if (!rows.length) {
     status = 500;
     message = "No Data Found";
  } else {
    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}

async function getvendorrfps(vendorId) {
   let status ;
   let message ;
  const rows = await db.query(
    `SELECT id AS rfpVendorId, RfpTID AS rfpId,vendor,VNID AS vendorId, company,category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details,  participationStatus, notParticipationReason FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM rfpvendors WHERE vendorId = '${vendorId}' ) RFPVENDOR INNER JOIN( SELECT id AS VNID, vendor, company FROM vendors WHERE delflag = 'N' ) VENDORS ON RFPVENDOR.vendorId = VENDORS.VNID ) VNDRRFP INNER JOIN( SELECT id AS rID, rfpId AS RfpTID, categories, subcategories, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM rfp ) RFP ON VNDRRFP.rfpId = RFP.rID ) RFPDETAILS INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFPDETAILS.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID`
  );
  const data = helper.emptyOrRows(rows);

  if (!rows.length) {
     status = 500;
     message = "No Data Found";
  } else {
    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}

async function getvendorrfpsById(vendorId, rfpId) {
   let status ;
   let message ;
  const rows = await db.query(
    `SELECT RfpTID AS rfpId,vendor,VNID AS vendorId, company,category, subcategory, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details,  participationStatus, notParticipationReason FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM ( SELECT * FROM rfpvendors WHERE vendorId = '${vendorId}' ) RFPVENDOR INNER JOIN( SELECT id AS VNID, vendor, company FROM vendors WHERE delflag = 'N' ) VENDORS ON RFPVENDOR.vendorId = VENDORS.VNID ) VNDRRFP RIGHT OUTER JOIN( SELECT id AS rID, rfpId AS RfpTID, categories, subcategories, releaseDate, closureDate, document, quantity, bidDate, rfpCost, rfpStatus, details FROM rfp WHERE rfpId = '${rfpId}' ) RFP ON VNDRRFP.rfpId = RFP.rID ) RFPDETAILS INNER JOIN( SELECT id AS CATID, category FROM category ) CATEGORIES ON RFPDETAILS.categories = CATEGORIES.CATID ) RFPCATS INNER JOIN( SELECT id AS SUBCATID, subcategory FROM subcategory ) SUBCATS ON RFPCATS.subcategories = SUBCATS.SUBCATID`
  );
  const data = helper.emptyOrRows(rows);

  if (!rows.length) {
     status = 500;
     message = "No Data Found";
  } else {
    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}

async function updateParticipationStatus(req) {
  let updateVendorParticipation = `UPDATE rfpvendors SET participationStatus = '${req.body.participationStatus}', notParticipationReason ='${req.body.reason}',modified = NOW() WHERE id =  '${req.body.rfpVendorId}'`;

  const result = await db.query(updateVendorParticipation);

  if (result.affectedRows) {
    status = 200;

    message = "records updated Successfully";
  }

  return {
    status,
    message,
  };
}

async function getrfpBids(rfpId) {
  let status ;
  let message ;
  
  var getrfpquery = `SELECT vendorId,vendor,RRID AS rfpId,bidPrice,quantity,descrption,created FROM ( SELECT * FROM ( SELECT * FROM vendor_bids WHERE rfpId = '${rfpId}')VENDORBIDS INNER JOIN (SELECT id AS VID,vendor,company FROM vendors )VENDORS ON VENDORBIDS.vendorId = VENDORS.VID)VENDORBIDDETAILS INNER JOIN ( SELECT rfpId AS RRID,id AS RID,quantity FROM rfp)RFPDETAILS ON VENDORBIDDETAILS.rfpId = RFPDETAILS.RRID;`;

  const rows = await db.query(getrfpquery);
  const data = helper.emptyOrRows(rows);
  if (!rows.length) {
     status = 500;
     message = "No data found";
  } else {
    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}

async function getrfpBidsByVendor(req) {
  let status ;
  let message ;
  
  var getrfpquery = `SELECT vendorId,vendor,RRID AS rfpId,bidPrice,quantity,descrption,created FROM ( SELECT * FROM ( SELECT * FROM vendor_bids WHERE rfpId = '${req.query.rfpId}')VENDORBIDS INNER JOIN (SELECT id AS VID,vendor,company FROM vendors WHERE id = '${req.query.vendorId}' )VENDORS ON VENDORBIDS.vendorId = VENDORS.VID)VENDORBIDDETAILS INNER JOIN ( SELECT rfpId AS RRID,id AS RID,quantity FROM rfp)RFPDETAILS ON VENDORBIDDETAILS.rfpId = RFPDETAILS.RRID;`;

  const rows = await db.query(getrfpquery);
  const data = helper.emptyOrRows(rows);
  if (!rows.length) {
     status = 500;
     message = "No data found";
  } else {
    status = 200;
    message = "Data fetched Successfully";
  }

  return {
    status,
    message,
    data,
  };
}







module.exports = {
  getvendors,
  getvendorrfps,
  getvendorrfpsById,
  updateParticipationStatus,
  getrfpBids,
  getrfpBidsByVendor,
};
