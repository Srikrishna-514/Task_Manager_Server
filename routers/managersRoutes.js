const express = require("express");
const { checkAuth, checkRoles } = require("../middlewares/authMiddleware.js");
const {
  createTicket,
  getAllTickets,
  getTicketById,
} = require("../controllers/managerController.js");
const {
  tokenValidation,
  validationMiddleware,
} = require("../validators/authValidator.js");
const router = express.Router();
router.post(
  "/create",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  checkRoles("manager"),
  createTicket,
);
router.get(
  "/allTickets",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  checkRoles("manager"),
  getAllTickets,
);
router.get(
  "/ticketById/:ID",
  tokenValidation,
  validationMiddleware,
  checkAuth,
  checkRoles("manager"),
  getTicketById,
);
module.exports = router;
