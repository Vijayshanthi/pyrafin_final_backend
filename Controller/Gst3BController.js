module.exports = function () {
  var Gst3BService = require("../service/Gst3BService");

  this.getListGst1Controller = async (req, callback) => {
    var response = {};
    var Gst1ServiceObject = new gst1Service();
    var Gst1Service = await Gst1ServiceObject.getListIncomeService(
      req
    );

    if (Gst1Service.error == "true") {
      response.error = "true";
      response.message = Gst1Service.message;
      response.status = Gst1Service.status;
    } else {
      response.error = "false";
      response.data = Gst1Service.data;
    }

    callback(response);
  };

  this.getListGst2Controller = async (req, callback) => {
    var response = {};
    var Gst2ServiceObject = new Gst2Services();
    var Gst2Service = await Gst2ServiceObject.getListGst2Service(req);

    if (Gst2Service.error == "true") {
      response.error = "true";
      response.message = Gst2Service.message;
      response.status = Gst2Service.status;
    } else {
      response.error = "false";
      response.data = Gst2Service.data;
    }

    callback(response);
  };
};
