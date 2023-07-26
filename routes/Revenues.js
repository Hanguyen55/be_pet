module.exports = (app) => {
    var Revenue = require("../controller/Revenue");
    var router = require("express").Router();
  
    router.post("/", Revenue.create);
    router.patch("/:id", Revenue.update);
    app.use("/revenues", router);
  };