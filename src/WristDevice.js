function WristDevice() {
  let _frequency = 0;

  Object.defineProperty(this,
    'frequency', {
      get: function() { return _frequency; }
    }
  );

  this.adjustFrequency = function(adjustment) {
    if (adjustment.startsWith('+')) {
      augmentFrequency(Number(adjustment.substring(1, adjustment.length)));
    }
    else if (adjustment.startsWith('-')) {
      reduceFrequency(Number(adjustment.substring(1, adjustment.length)));
    }
    else {
      throw new TypeError();
    }
  }

  augmentFrequency = function(augmentation) {
    if (Number.isNaN(augmentation)) {
      throw new TypeError();
    }

    _frequency = _frequency + augmentation;
  }

  reduceFrequency = function(reduction) {
    if (Number.isNaN(reduction)) {
      throw new TypeError();
    }

    _frequency = _frequency - reduction;
  }
};

module.exports = WristDevice;

