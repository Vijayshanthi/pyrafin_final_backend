module.exports = function () {
  var Gst2Services = require("../service/Gst2Service");



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
