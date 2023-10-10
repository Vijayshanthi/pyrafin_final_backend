const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const LoginController = new (require("../Controller/LoginController"))();

router.post(
  "/api/login",
  [
    check("email")
      .notEmpty()
      .isString()
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
    check("password")
      .notEmpty()
      .isString()
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
  ],

  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response.status(500).send(error.errors[0].msg);
    } else {
      LoginController.LoginDetailsController(
        request,
        function ({ message, status, token, id }) {

          return response
            .status(200)
            .send({ message: message, token: token, userId: id });
        }
      );
    }
  }
);
module.exports = router;
