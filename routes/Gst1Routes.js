const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authorizeJWT = require("./authmiddleware");
const Gst1Controller = new (require("../Controller/Gst1Controller"))();



router.get("/getincomedetails", function (request, response) {
  Gst1Controller.getListGst1Controller(request, function ({ data }) {
    return response.send(data);
  });
});

module.exports = router;
