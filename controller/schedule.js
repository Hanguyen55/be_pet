var Schedule = require("../models").Schedule;
var RevenueServices = require("../models").RevenueService;
var Service = require("../models").Service;
require("dotenv").config();
let PAGE_SIZE = parseInt(process.env.PAGE_SIZE);
exports.create = (req, res) => {
  console.log(req.body);
  Schedule.create(req.body)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.revenueservice = (req, res) => {
    var status = req.query.status;
    Schedule.findAndCountAll({
        where: { status: status },
      })
        .then((data) => {
            let date = new Date();
            let month = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
            let year = date.getFullYear();
            let monthList = [];
            let serviceListHas = [];
            let serviceList = [];
            let present = month+"/"+year;
            let presentData;
            let dataNew
            let totalMoney = 0;
            let quantity = 0;
            function findValue(haystack,needle) {
                for(const item of haystack) {
                   if(item === needle) {
                      return true;
                   }
                }
                return false;
             }
            Service.findAndCountAll().then((data2) => {
                for (let i = 0; i < data2.count; i++) {
                    serviceList.push(data2.rows[i].dataValues.id)
                }
                RevenueServices.findAndCountAll().then((data3) => {
                    for (let i = 0; i < data3.count; i++) {
                        monthList.push(data3.rows[i].dataValues.name)
                        monthList = Array.from(new Set(monthList))
                        serviceListHas.push(data3.rows[i].dataValues.serviceId)
                        serviceListHas = Array.from(new Set(serviceListHas))
                        // if(data3.rows[i].dataValues.serviceId === serviceListHas[j] && data3.rows[i].dataValues.name === present){
                        //     presentData = data3.rows[i].dataValues
                        // }
                    }
                    for (let i = 0; i < serviceList.length; i++) {
                        if(findValue(serviceListHas,serviceList[i])) {
                            if(findValue(monthList,present)) {
                                for (let j = 0; j < data.count; j++) {
                                        if(data.rows[j].dataValues.serviceId === serviceList[i]
                                            && present === ((((new Date(data.rows[i].dataValues.updatedAt)).getMonth() + 1) < 10 ? "0" + ((new Date(data.rows[i].dataValues.updatedAt)).getMonth() + 1) : ((new Date(data.rows[i].dataValues.updatedAt)).getMonth() + 1)) + "/" + (new Date(data.rows[i].dataValues.updatedAt)).getFullYear())
                                        ) {
                                            totalMoney+=Number(data.rows[j].dataValues.result)
                                            quantity+=1
                                        }
                                    }
                                    for (let n = 0; n < data3.count; n++) {
                                        if(data3.rows[n].dataValues.serviceId === serviceList[i] && data3.rows[n].dataValues.name === present){
                                            presentData = data3.rows[n].dataValues
                                        }
                                    }
                                dataNew = {name: present, serviceId: serviceList[i],quantity: quantity, money: totalMoney}
                                    RevenueServices.update(dataNew, { where: { id: presentData.id } })
                                console.log("có1",dataNew,presentData);
                                quantity = 0
                                totalMoney = 0
                            }
                            else {
                                dataNew = {name: present, serviceId: serviceList[i],quantity: 0, money: 0}
                                    RevenueServices.create(dataNew)
                                console.log("ko1",dataNew);
                            }
                        }
                        else {
                            dataNew = {name: present, serviceId: serviceList[i],quantity: 0, money: 0}
                                RevenueServices.create(dataNew)
                            console.log("ko",dataNew);
                        }
                    }
                    // for (let i = 0; i < serviceList.length; i++) {
                    //     for (let j = 0; j < serviceListHas.length; j++) {
                    //         if(findValue(serviceListHas,serviceList[i])) {
                    //             if(findValue(monthList,present)) {
                    //                 for (let h = 0; h < data3.count; h++) {
                    //                     if(data3.rows[h].dataValues.serviceId === serviceListHas[j] && data3.rows[h].dataValues.name === present){
                    //                                     presentData = data3.rows[i].dataValues
                    //                     }
                    //                 }
                    //                 // for (let s = 0; s < data.count; s++) {
                    //                 //     if(
                    //                 //         present === ((((new Date(data.rows[s].dataValues.updatedAt)).getMonth() + 1) < 10 ? "0" + ((new Date(data.rows[s].dataValues.updatedAt)).getMonth() + 1) : ((new Date(data.rows[s].dataValues.updatedAt)).getMonth() + 1)) + "/" + (new Date(data.rows[s].dataValues.updatedAt)).getFullYear())
                    //                 //     ) {
                    //                 //         totalMoney+=Number(data.rows[s].dataValues.result)
                    //                 //         quantity+=1
                    //                 //     }
                    //                 // }
                    //                 dataNew = {name: present, serviceId: serviceList[i],quantity: quantity, money: totalMoney}
                    //                 // RevenueServices.update(dataNew, { where: { id: presentData.id } })
                    //                 console.log("đúng1",dataNew);
                    //             } else {
                    //                 dataNew = {name: present, serviceId: serviceList[i],quantity: 0, money: 0}
                    //                 // RevenueServices.create(dataNew)
                    //                 console.log("test",
                    //                 ((((new Date(data.rows[i].dataValues.updatedAt)).getMonth() + 1) < 10 ? "0" + ((new Date(data.rows[i].dataValues.updatedAt)).getMonth() + 1) : ((new Date(data.rows[i].dataValues.updatedAt)).getMonth() + 1)) + "/" + (new Date(data.rows[i].dataValues.updatedAt)).getFullYear())
                    //                 );
                    //                 console.log("sai1",dataNew);
                    //             }
                    //         } else {
                    //             dataNew = {name: present, serviceId: serviceList[i],quantity: 0, money: 0}
                    //             // RevenueServices.create(dataNew)
                    //             console.log("sai",dataNew);
                    //         }
                    //     }
                    // }
                })
            })
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
}
exports.findall = (req, res) => {
  var page = req.query.page;
  var status = req.query.status;
  page = parseInt(page);
  let soLuongBoQua = (page - 1) * PAGE_SIZE;
  if (page || status) {
    if (page && !status) {
      Schedule.findAndCountAll({
        order: [["id", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else if (status && !page) {
      Schedule.findAndCountAll({
        where: { status: status },
        order: [["id", "DESC"]],
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    } else {
      Schedule.findAndCountAll({
        where: { status: status },
        order: [["id", "DESC"]],
        offset: soLuongBoQua,
        limit: PAGE_SIZE,
      })
        .then((data) => {
          res.json({ data: data });
        })
        .catch((er) => {
          throw er;
        });
    }
  } else {
    Schedule.findAndCountAll({ order: [["id", "DESC"]] })
      .then((data) => {
        res.json({ data: data });
      })
      .catch((er) => {
        throw er;
      });
  }
};
exports.findone = (req, res) => {
  Schedule.findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.delete = (req, res) => {
  Schedule.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
exports.update = (req, res) => {
  Schedule.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      throw er;
    });
};
