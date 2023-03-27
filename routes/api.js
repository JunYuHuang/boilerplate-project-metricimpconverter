"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const { input } = req.query;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      res.json("invalid number and unit");
      return;
    }
    if (initNum === "invalid number") {
      res.json(initNum);
      return;
    }
    if (initUnit === "invalid unit") {
      res.json(initUnit);
      return;
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    const response = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    };
    // console.log(response);
    res.json(response);
  });
};
