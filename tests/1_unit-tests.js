const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input", () => {
    assert.strictEqual(convertHandler.getNum("4gal"), 4);
  });
  test("convertHandler should correctly read a decimal number input", () => {
    assert.strictEqual(convertHandler.getNum("3.1mi"), 3.1);
  });
  test("convertHandler should correctly read a fractional input", () => {
    assert.strictEqual(convertHandler.getNum("1/2km"), 0.5);
  });
  test("convertHandler should correctly read a fractional input with a decimal", () => {
    assert.strictEqual(convertHandler.getNum("5.4/3lbs"), 1.8);
    assert.strictEqual(convertHandler.getNum("5.4/3.0lbs"), 1.8);
  });
  test("convertHandler should correctly return an error on a double-fraction", () => {
    assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
  });
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", () => {
    assert.strictEqual(convertHandler.getNum("kg"), 1);
  });
  test("convertHandler should correctly read each valid input unit", () => {
    const inputToExp = [
      ["4gAl", "gal"],
      ["4.1L", "L"],
      ["1/2Km", "km"],
      ["2.2mi", "mi"],
      ["5.4/3LBS", "lbs"],
      ["45kg", "kg"],
    ];
    for (const pair of inputToExp) {
      assert.strictEqual(convertHandler.getUnit(pair[0]), pair[1]);
    }
  });
  test("convertHandler should correctly return an error for an invalid input unit", () => {
    const inputs = ["4galls", "1/2mk", "5.4/3#s", "kgs"];
    for (const input of inputs) {
      assert.equal(convertHandler.getUnit(input), "invalid unit");
    }
  });
  test("convertHandler should return the correct return unit for each valid input unit", () => {
    const inputToExp = [
      ["gAl", "L"],
      ["l", "gal"],
      ["Km", "mi"],
      ["mI", "km"],
      ["LBS", "kg"],
      ["kg", "lbs"],
    ];
    for (const pair of inputToExp) {
      assert.strictEqual(convertHandler.getReturnUnit(pair[0]), pair[1]);
    }
  });
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", () => {
    const inputToExp = [
      ["gAl", "gallons"],
      ["l", "liters"],
      ["Km", "kilometers"],
      ["mI", "miles"],
      ["LBS", "pounds"],
      ["kg", "kilograms"],
    ];
    for (const pair of inputToExp) {
      assert.strictEqual(convertHandler.spellOutUnit(pair[0]), pair[1]);
    }
  });
  test("convertHandler should correctly convert gal to L", () => {
    assert.approximately(convertHandler.convert(4, "gal"), 15.14164, 0.0001);
  });
  test("convertHandler should correctly convert L to gal", () => {
    assert.approximately(convertHandler.convert(4, "L"), 1.05669, 0.001);
  });
  test("convertHandler should correctly convert mi to km", () => {
    assert.approximately(convertHandler.convert(3.1, "mi"), 4.98895, 0.001);
  });
  test("convertHandler should correctly convert km to mi", () => {
    assert.approximately(convertHandler.convert(1.6, "km"), 0.9942, 0.001);
  });
  test("convertHandler should correctly convert lbs to kg", () => {
    assert.approximately(
      convertHandler.convert(5.4 / 3, "lbs"),
      0.81647,
      0.001
    );
  });
  test("convertHandler should correctly convert kg to lbs", () => {
    assert.approximately(convertHandler.convert(2.2, "kg"), 4.85017, 0.001);
  });
});
