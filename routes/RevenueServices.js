module.exports = (app) => {
    var RevenueService = require("../controller/RevenueServices");
    var router = require("express").Router();
  
    router.post("/", RevenueService.create);
    router.patch("/:id", RevenueService.update);
    app.use("/revenues", router);
  };