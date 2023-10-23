const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authorizeJWT = require("./authmiddleware");

const Gst2Controller = new (require("../Controller/Gst2Controller"))();


router.get("/getexpensedetails", authorizeJWT, function (request, response) {
  Gst2Controller.getListGst2Controller(request, function ({ data }) {
    return response.send(data);
  });
});

module.exports = router;
