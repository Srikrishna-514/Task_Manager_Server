const { userModel } = require("../models/authModel.js");
const createTicket = async (req, res, next) => {
  try {
    // console.log(req.userInfo);
    // const id = req.userInfo._id;
    const user = await userModel.find();
    // console.log(user);

    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
};
const getAllTickets = (req, res) => {
  try {
    res.send("all tickets");
  } catch (error) {
    res.send(error.message);
  }
};
const getTicketById = (req, res) => {
  try {
    res.send("getTicketById");
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { createTicket, getAllTickets, getTicketById };
