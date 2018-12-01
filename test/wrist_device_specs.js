const expect = require('chai').expect;
const WristDevice = require('../src/WristDevice.js');


describe('WristDevice', () => {
  it('should exist', () => {
    expect(new WristDevice()).to.not.be.undefined;
  });

  it('should have a frequency of < 0 > when instance is created without any argument', () => {
    const myWristDevice = new WristDevice();
    expect(myWristDevice.frequency).to.equal(0);
  });

  describe('#adjustFrequency', () => {
    let myWristDevice;

    beforeEach(() => {
      myWristDevice = new WristDevice();
    });

    it('should increment by specified number when receiving an argument starting with < + > followed by a number', () => {
      const anIncrement = aNumber();

      verifyAdjustment('+' + anIncrement, anIncrement);
    });

    it('should continue to increment properly when called multiple times with arguments starting with < + > followed by a number', () => {
      const firstIncrement = aNumber();
      const secondIncrement = aNumber();
      const thirdIncrement = aNumber();

      verifyAdjustment('+' + firstIncrement, firstIncrement);
      verifyAdjustment('+' + secondIncrement, firstIncrement + secondIncrement);
      verifyAdjustment('+' + thirdIncrement, firstIncrement + secondIncrement + thirdIncrement);
    });

    it('should decrement by specified number when receiving an argument starting with < - > followed by a number', () => {
      const aDecrement = aNumber();
      verifyAdjustment('-' + aDecrement, -aDecrement);
    });

    it('should continue to decrement properly when called multiple times with argumennts starting with < - > followed by a number', () => {
      const firstDecrement = aNumber();
      const secondDecrement = aNumber();
      const thirdDecrement = aNumber();

      verifyAdjustment('-' + firstDecrement, -firstDecrement);
      verifyAdjustment('-' + secondDecrement, -(firstDecrement + secondDecrement));
      verifyAdjustment('-' + thirdDecrement, -(firstDecrement + secondDecrement + thirdDecrement));
    });

    it('should throw an error when receiving an argument that neither starts with < + > nor < - >', () => {
      expect(myWristDevice.adjustFrequency.bind(myWristDevice, '' + aNumber())).to.throw(TypeError);
      expect(myWristDevice.adjustFrequency.bind(myWristDevice, aNumber())).to.throw(TypeError);
    });

    it('should throw an error when receiving an argument starting with < + > or < - > but not followed by a number', () => {
      expect(myWristDevice.adjustFrequency.bind(myWristDevice, '+NotANumber')).to.throw(TypeError);
      expect(myWristDevice.adjustFrequency.bind(myWristDevice, '-NotANumber')).to.throw(TypeError);
    });

    aNumber = function() {
      return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    };

    verifyAdjustment = function(adjustment, expectedResult) {
      myWristDevice.adjustFrequency(adjustment);
      expect(myWristDevice.frequency).to.equal(expectedResult);
    };
  });
});

