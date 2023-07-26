module.exports = (app) => {
  var CategoryPet = require("../controller/CategoryPet");
  var router = require("express").Router();

  router.post("/", CategoryPet.create);
  router.get("/", CategoryPet.findall);
  router.get("/all", CategoryPet.countTypePet);
  router.get("/:id", CategoryPet.findone);
  router.delete("/:id", CategoryPet.delete);
  router.patch("/:id", CategoryPet.update);
  app.use("/categorysPet", router);
};
