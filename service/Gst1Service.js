module.exports = function () {
  var Gst1Repo = require("../repository/Gst1Repository");


  this.getListGst1Service = (incomeData) => {
    return new Promise(async function (resolve) {
      var response = {};

      var Gst1dataObject = new Gst1Repo();
      try {
        var getTotalGst1result = await Gst1dataObject.getListGst1Data(
          Gst1Data
        );

        if (getTotalGst1result.result.length > 0) {
          if (getTotalGst1result.error == "false") {
            response.error = "false";
            response.data = getTotalGst1result.result;

            resolve(response);
          } else {
            response.error = "true";
            response.message = "failed to fetch Gst1 rate";
            resolve(response);
          }
        } else {
          response.error = "true";
          response.message = "No data";
          resolve(response);
        }
      } catch (err) {
        response.error = "true";
        response.message = "OOPS Service Error";
        resolve(response);
      }
    });
  };

}