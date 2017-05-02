"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (mu, sigma, rand) {
  var x, r;
  mu = mu == null ? 0 : +mu;
  sigma = sigma == null ? 1 : +sigma;
  rand = rand == null ? Math.random : rand;
  return function () {
    var y;

    // If available, use the second previously-generated uniform random.
    if (x != null) {
      y = x;
      x = null;
      // eslint-disable-next-line
    } else do {
      // Otherwise, generate a new x and y.
      x = rand() * 2 - 1;
      y = rand() * 2 - 1;
      r = x * x + y * y;
    } while (!r || r > 1);

    return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
  };
};