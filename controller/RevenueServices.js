var RevenueService = require("../models").RevenueService;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
    RevenueService.create(req.body)
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  };
  exports.update = (req, res) => {
    RevenueService.update(req.body, { where: { id: req.params.id } })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  };