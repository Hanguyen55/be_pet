module.exports = (app) => {
    var PriceService = require("../controller/PriceService");
    var router = require("express").Router();
  
    router.post("/", PriceService.create);
    router.get("/", PriceService.findall);
    router.get("/all", PriceService.findallprice);
    router.get("/:id", PriceService.findone);
    router.delete("/:id", PriceService.delete);
    router.patch("/:id", PriceService.update);
    app.use("/priceServices", router);
  };
  