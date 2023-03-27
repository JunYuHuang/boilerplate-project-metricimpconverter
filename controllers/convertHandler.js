// GLOBALS
const initToReturnUnit = {
  kg: "lbs",
  lbs: "kg",
  l: "gal",
  gal: "L",
  km: "mi",
  mi: "km",
};

const abbrevToFullUnit = {
  kg: "kilograms",
  lbs: "pounds",
  l: "liters",
  gal: "gallons",
  km: "kilometers",
  mi: "miles",
};

const alphaRegex = /[a-z]/i;
const invalidNumMsg = "invalid number";
const invalidUnitMsg = "invalid unit";

function roundAccurately(number, decimalPlaces) {
  return Number(
    Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces
  );
}

function firstAlphaCharPos(input) {
  let inputArr = input.split("");
  for (let i = 0; i < inputArr.length; i++) {
    if (alphaRegex.test(inputArr[i])) return i;
  }
  // couldn't find it
  return -1;
}

// CLASS
function ConvertHandler() {
  this.getNum = function (input) {
    if (input == undefined || input == null || input.length < 1)
      return invalidNumMsg;
    const alphaPos = firstAlphaCharPos(input);
    if (alphaPos === -1) return invalidNumMsg;
    const result = input.slice(0, alphaPos);
    // console.log(result);
    if (result === "") return 1;
    if (result.includes("/")) {
      const fract = result.split("/");
      if (fract.length !== 2) return invalidNumMsg;
      let numer = Number(fract[0]);
      let deno = Number(fract[1]);
      if (Number.isNaN(numer) || Number.isNaN(deno) || deno === 0)
        return invalidNumMsg;
      return roundAccurately(numer / deno, 5);
    } else if (!Number.isNaN(Number(result))) {
      const num = Number(result);
      return Number.isInteger(num) ? num : roundAccurately(num, 5);
    }
    return invalidNumMsg;
  };

  this.getUnit = function (input) {
    if (input == undefined || input == null || input.length < 1)
      return invalidUnitMsg;
    const alphaPos = firstAlphaCharPos(input);
    if (alphaPos === -1) return invalidUnitMsg;
    const res = input.slice(alphaPos).toLowerCase();
    if (!initToReturnUnit.hasOwnProperty(res)) return invalidUnitMsg;
    return res === "l" ? "L" : res;
  };

  this.getReturnUnit = function (initUnit) {
    return initToReturnUnit[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    return abbrevToFullUnit[unit.toLowerCase()];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result = -1;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        console.error("invalid unit");
    }
    return roundAccurately(result, 5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
