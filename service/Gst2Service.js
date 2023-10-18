module.exports = function () {
  var Gst2Repo = require("../repository/Gst2Repository");

  this.getListGst2Service = (incomeData) => {
    return new Promise(async function (resolve) {
      var response = {};
      var Gst2dataObject = new Gst2Repo();
      try {
        var Gst2result = await Gst2dataObject.getListGst2Data(
          incomeData
        );

        if (Gst2result.result.length > 0) {
          if (Gst2result.error == "false") {
            response.error = "false";
            response.data = Gst2result.result;

            resolve(response);
          } else {
            response.error = "true";
            response.message = "failed to fetch income rate";
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
};
