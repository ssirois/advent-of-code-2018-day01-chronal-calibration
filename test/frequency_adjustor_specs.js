const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const FrequencyAdjustor = require('../src/FrequencyAdjustor.js');
const WristDevice = require('../src/WristDevice.js');

describe('FrequencyAdjustor', () => {
  it('should exist', () => {
    expect(new FrequencyAdjustor()).to.not.be.undefined;
  });

  it('should accept a wrist device and a sequence of changes in frequency as argument of the constructor', () => {
    expect(new FrequencyAdjustor(new WristDevice(), ['+1', '+1', '+1'])).to.not.be.undefined;
  });

  describe('#adjust', () => {
    let myWristDevice;
    let adjustFrequencySpy;
    let myFrequencyAdjustor;

    beforeEach(() => {
      myWristDevice = new WristDevice();
      adjustFrequencySpy = sinon.spy(myWristDevice, 'adjustFrequency');
      myFrequencyAdjustor = new FrequencyAdjustor(myWristDevice);
    });

    it('should not call WristDevice.adjustFrequency when received sequence of changes is empty', () => {
      myFrequencyAdjustor.adjust([]);

      expect(adjustFrequencySpy).to.have.not.been.called;
    });

    it('should call WristDevice.adjustFrequency once when sequence of changes contains only one change', () => {
      const aFrequencyChange = '+42';
      const sequenceOfChanges = [aFrequencyChange];

      myFrequencyAdjustor.adjust(sequenceOfChanges);

      expect(adjustFrequencySpy).to.have.been.calledOnceWith(aFrequencyChange);
    });

    it('should call WristDevice.adjustFrequency for each change in received sequence of changes', () => {
      const aFrequencyChange = '+42';
      const anotherFrequencyChange = '-10';
      const yetAnotherFrequencyChange = '+10';
      const sequenceOfChanges = [aFrequencyChange, anotherFrequencyChange, yetAnotherFrequencyChange];

      myFrequencyAdjustor.adjust(sequenceOfChanges);

      expect(adjustFrequencySpy).to.have.been.calledWith(aFrequencyChange);
      expect(adjustFrequencySpy).to.have.been.calledWith(anotherFrequencyChange);
      expect(adjustFrequencySpy).to.have.been.calledWith(yetAnotherFrequencyChange);
      expect(adjustFrequencySpy).to.have.been.calledThrice;
    });
  });
});

