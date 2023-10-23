const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authorizeJWT = require("./authmiddleware");
const Gst1Controller = new (require("../Controller/Gst1Controller"))();
const Gst2Controller = new (require("../Controller/Gst2Controller"))();
const Gst3BController = new (require("../Controller/Gst3BController"))();


router.get("/getincomedetails", function (request, response) {
  Gst1Controller.getListGst1Controller(request, function ({ data }) {
    return response.send(data);
  });
});


router.get("/getGst2details", authorizeJWT, function (request, response) {
  Gst2Controller.getListGst2Controller(request, function ({ data }) {
    return response.send(data);
  });
});


// router.get("/getGst3Bdetails", authorizeJWT, function (request, response) {
//   Gst2Controller.getListGst2Controller(request, function ({ data }) {
//     return response.send(data);
//   });



module.exports = router;
