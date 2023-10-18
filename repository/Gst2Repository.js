module.exports = function () {
  var mysqlExecute = require("../db/db");

  this.getListGst2Data = (req) => {
    return new Promise(async function (resolve) {
      try {
        var mysqlExecuteCall = new mysqlExecute();
        var query =
          "Select id,InvoiceNo,date,Company,amount,CGST,SGST,IGST,total from income_table where IsDeleted=0";
        var queryResponse = await mysqlExecuteCall.executeWithoutParams(query);
        if (queryResponse.error == "false") {
          resolve(queryResponse);
        } else {
          resolve(queryResponse);
        }
      } catch (err) {
        err.error = "true";
        err.message = "OOPS DAO Exception";
        resolve(err);
      }
    });
  };
};
