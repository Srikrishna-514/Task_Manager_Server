const viewAllTickets = async (req, res) => {
  res.send("viewTickets");
};
const updateTicketStatus = async (req, res) => {
  res.send("updateTicketStatus");
};
const addcommentTicket = async (req, res) => {
  res.send("add comment");
};
const viewcommentTicket = async (req, res) => {
  res.send("view Comment");
};
module.exports = {
  viewAllTickets,
  updateTicketStatus,
  addcommentTicket,
  viewcommentTicket,
};
