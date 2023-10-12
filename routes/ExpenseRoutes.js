const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authorizeJWT = require("./authmiddleware");

const ExpenseController = new (require("../Controller/ExpenseController"))();

router.post(
  "/addexpense",

  [
    check("TDSStatus")
      .notEmpty()
      .isString()
      .isIn(["Applicable", "Not Applicable"])
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
    check("PaymentType")
      .notEmpty()
      .isString()
      .isIn(["Direct", "Indirect"])
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
    check("AccountType")
      .notEmpty()
      .isString()
      .isIn(["Cash", "Solution", "Workz", "Digital", "Director Fund"])
      .withMessage(
        "Invalid Account Type must be one of: Cash, Solution, Workz, Digital,Director Fund"
      ),
    check("Particulars")
      .isLength({ min: 1 })
      .withMessage("Invalid: Particulars must have at least 1 character"),
    check("Section")
      .isLength({ min: 1 })
      .withMessage("Invalid: Section must have at least 1 character"),
    check("CGST").optional().isNumeric(),
    check("SGST").optional().isNumeric(),
    check("IGST").optional().isNumeric(),
    check("TDS").optional().isNumeric(),
    check("TotalAmount").notEmpty().isNumeric(),
    check("TDSAmount").notEmpty().isNumeric(),
    check("Amount")
      .isLength({ min: 1, max: 8 })
      .notEmpty()
      .isNumeric()
      .withMessage("Rate out of range.Please enter again"),
    check("DueDate").notEmpty().isISO8601(),
    check("ActionDate").notEmpty().isISO8601(),
    check("InvoiceNumber")
      .notEmpty()
      .isString()
      .withMessage("Provide Invoice Number"),
  ],
  authorizeJWT,
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response
        .status(500)
        .send({ msg: error.errors[0].msg, path: error.errors[0].path });
    } else {
      ExpenseController.addExpenseController(
        request.body,
        function ({ message, status }) {
          return response.status(status).send(message);
        }
      );
    }
  }
);

router.get("/getexpensedetails", authorizeJWT, function (request, response) {
  ExpenseController.getListExpenseController(request, function ({ data }) {
    return response.send(data);
  });
});

router.put(
  "/updateexpense/:id",

  [
    check("id").isLength({ min: 1 }).isNumeric().withMessage("Invalid id"),
    check("PaymentType")
      .notEmpty()
      .isString()
      .isIn(["Direct", "Indirect"])
      .withMessage("Invalid status. Status must be one of: Direct,Indirect"),
    check("AccountType")
      .notEmpty()
      .isString()
      .isIn(["Cash", "Solution", "Workz", "Digital", "Director Fund"])
      .withMessage(
        "Invalid Account Type must be one of: Cash, Solution, Workz, Digital,Director Fund"
      ),
    check("Particulars")
      .isLength({ min: 1 })
      .withMessage("Invalid: Particulars must have at least 1 character"),

    check("CGST").optional().isNumeric(),
    check("TDS").optional().isNumeric(),
    check("SGST").optional().isNumeric(),
    check("IGST").optional().isNumeric(),
    check("TDS").optional().isNumeric(),
    check("TDSAmount").notEmpty().isNumeric(),
    check("TotalAmount").notEmpty().isNumeric(),
    check("Section")
      .isLength({ min: 1 })
      .withMessage("Invalid: Section must have at least 1 character"),
    check("Amount")
      .isLength({ min: 1, max: 8 })
      .notEmpty()
      .isNumeric()
      .withMessage("Rate out of range.Please enter again"),
    check("DueDate").notEmpty().isISO8601(),
    check("ActionDate").notEmpty().isISO8601(),
    check("InvoiceNumber")
      .notEmpty()
      .isString()
      .withMessage("Provide Invoice Number"),
  ],
  authorizeJWT,
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response
        .status(500)
        .send({ msg: error.errors[0].msg, path: error.errors[0].path });
    } else {
      ExpenseController.updateExpenseController(
        request,
        function ({ message, status }) {
          return response.status(status).send(message);
        }
      );
    }
  }
);

router.put(
  "/deletesingleexpenserecord/:id",

  [check("id").isLength({ min: 1 }).isNumeric().withMessage("Invalid id")],
  authorizeJWT,
  function (request, response) {
    const error = validationResult(request);
    if (error.array().length) {
      return response.status(500).send(error.errors[0].msg);
    } else {
      ExpenseController.deleteExpenseController(
        request,
        function ({ message, status }) {
          return response.status(status).send(message);
        }
      );
    }
  }
);

router.get(
  "/getDirectTotalExpenseRate",
  authorizeJWT,
  function (request, response) {
    ExpenseController.getTotalExpenseController(request, function ({ data }) {
      return response.send(data);
    });
  }
);

router.get(
  "/getIndirectTotalExpenseRate",
  authorizeJWT,
  function (request, response) {
    ExpenseController.getIndirectTotalExpenseController(
      request,
      function ({ data }) {
        return response.send(data);
      }
    );
  }
);

module.exports = router;
