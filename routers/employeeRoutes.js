const express = require("express");
const router = express.Router();
const { checkAuth, checkRoles } = require("../middlewares/authMiddleware.js");

const {
  tokenValidation,
  validationMiddleware,
} = require("../validators/authValidator.js");
const {
  viewAllTickets,
  updateTicketStatus,
  addcommentTicket,
  viewcommentTicket,
} = require("../controllers/employeeController.js");

//routes
router.post(
  "/viewTickets",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  checkRoles("employee"),
  viewAllTickets,
);
router.put(
  "/updateTicketStatus/:ticketID",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  checkRoles("employee"),
  updateTicketStatus,
);
router.post(
  "/addCommentTicket/:ticketID",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  checkRoles("employee"),
  addcommentTicket,
);
router.get(
  "/viewCommentTicket/:ticketID",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  checkRoles("employee"),
  viewcommentTicket,
);
module.exports = router;
