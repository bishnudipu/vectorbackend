const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getCategories(){
	let status;
  	let message;
  const rows = await db.query(
    `SELECT * FROM category WHERE delflag = 'N'`
  );
  const data = helper.emptyOrRows(rows);


  	if (!rows.length) 
	{
	    status = 500;
  	    message = 'No Data Found';
	}
	else
	{
		status = 200;
  	    message = 'Data fetched Successfully';
	}
	
  return {
  	status,
  	message,
    data
  }
}




module.exports = {
  getCategories
}