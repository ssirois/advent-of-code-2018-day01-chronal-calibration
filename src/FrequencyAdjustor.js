function FrequencyAdjustor(deviceToAdjust) {
  let _device = deviceToAdjust;

  this.adjust = function(sequenceOfChanges) {
    sequenceOfChanges.forEach((change) => {
      _device.adjustFrequency(change);
    });
  }
};

module.exports = FrequencyAdjustor;

