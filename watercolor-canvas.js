(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.WatercolorCanvas = factory());
}(this, (function () { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$2 = newArray;

function newArray (n, value) {
  n = n || 0;
  var array = new Array(n);
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array
}

var create_1 = create;

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
    var out = new Float32Array(2);
    out[0] = 0;
    out[1] = 0;
    return out
}

var clone_1 = clone;

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
function clone(a) {
    var out = new Float32Array(2);
    out[0] = a[0];
    out[1] = a[1];
    return out
}

var fromValues_1 = fromValues;

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
function fromValues(x, y) {
    var out = new Float32Array(2);
    out[0] = x;
    out[1] = y;
    return out
}

var copy_1 = copy;

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out
}

var set_1 = set;

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out
}

var add_1 = add;

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out
}

var subtract_1 = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out
}

var multiply_1 = multiply;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out
}

var divide_1 = divide;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out
}

var min_1 = min;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out
}

var max_1 = max;

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out
}

var scale_1 = scale;

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out
}

var scaleAndAdd_1 = scaleAndAdd;

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out
}

var distance_1 = distance;

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y)
}

var squaredDistance_1 = squaredDistance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y
}

var length_1 = length;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y)
}

var squaredLength_1 = squaredLength;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y
}

var negate_1 = negate;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out
}

var normalize_1 = normalize;

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out
}

var dot_1 = dot;

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1]
}

var cross_1 = cross;

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out
}

var lerp_1 = lerp;

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out
}

var random_1 = random;

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
function random(out, scale) {
    scale = scale || 1.0;
    var r = Math.random() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out
}

var transformMat2_1 = transformMat2;

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out
}

var transformMat2d_1 = transformMat2d;

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out
}

var transformMat3_1 = transformMat3;

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat3(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out
}

var transformMat4_1 = transformMat4;

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat4(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out
}

var forEach_1 = forEach;

var vec = create_1();

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
function forEach(a, stride, offset, count, fn, arg) {
    var i, l;
    if(!stride) {
        stride = 2;
    }

    if(!offset) {
        offset = 0;
    }
    
    if(count) {
        l = Math.min((count * stride) + offset, a.length);
    } else {
        l = a.length;
    }

    for(i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i+1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i+1] = vec[1];
    }
    
    return a
}

var index$4 = {
  create: create_1
  , clone: clone_1
  , fromValues: fromValues_1
  , copy: copy_1
  , set: set_1
  , add: add_1
  , subtract: subtract_1
  , multiply: multiply_1
  , divide: divide_1
  , min: min_1
  , max: max_1
  , scale: scale_1
  , scaleAndAdd: scaleAndAdd_1
  , distance: distance_1
  , squaredDistance: squaredDistance_1
  , length: length_1
  , squaredLength: squaredLength_1
  , negate: negate_1
  , normalize: normalize_1
  , dot: dot_1
  , cross: cross_1
  , lerp: lerp_1
  , random: random_1
  , transformMat2: transformMat2_1
  , transformMat2d: transformMat2d_1
  , transformMat3: transformMat3_1
  , transformMat4: transformMat4_1
  , forEach: forEach_1
};

function lerp$1(v0, v1, t) {
    return v0*(1-t)+v1*t
}
var index$6 = lerp$1;

var normal = createCommonjsModule(function (module, exports) {
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
});

var index = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = watercolor;



var _newArray2 = _interopRequireDefault(index$2);



var _glVec2 = _interopRequireDefault(index$4);



var _lerp2 = _interopRequireDefault(index$6);



var _normal2 = _interopRequireDefault(normal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultSettings = {
  shapePoints: 5,
  colorSize: 300,
  deformations: 2,
  layers: 55,
  sigma: 2,
  blend: 'lighten',
  mask: true,
  maskCircles: 300,
  maskCircleSize: 50,
  random: Math.random
};

function watercolor(settings) {
  settings = Object.assign({}, defaultSettings, settings);
  var _settings = settings,
      context = _settings.context,
      randomFn = _settings.randomFn;


  context.globalCompositeOperation = settings.blend;

  var shapes = settings.colors.map(function (_ref) {
    var color = _ref.color,
        position = _ref.position;

    var points = (0, _newArray2.default)(settings.shapePoints).map(function (_, i) {
      var rads = Math.PI * 2 / settings.shapePoints * i;
      return [Math.cos(rads) * settings.colorSize + position[0], Math.sin(rads) * settings.colorSize + position[1]];
    });

    var j = settings.deformations + 2;
    while (j--) {
      points = deformPolygon(points);
    }

    // fix this to turn any color representation into rgb
    var rgb = color;

    return { points: points, rgb: rgb };
  });

  return function draw() {
    var q = shapes.length * settings.layers;
    while (q--) {
      var _shapes = shapes[q % shapes.length],
          points = _shapes.points,
          rgb = _shapes.rgb;

      var detailedDeform = points.slice();
      var k = settings.deformations;
      while (k--) {
        detailedDeform = deformPolygon(detailedDeform);
      }
      var opacity = 1 / (settings.layers + 4);
      var color = 'rgba(' + rgb.join(', ') + ', ' + opacity + ')';
      drawPolygonWithMask(context, detailedDeform, color);
    }
  };

  function deformPolygon(points) {
    var newPoints = [];
    for (var i = 0; i < points.length; i++) {
      newPoints.push(points[i]);
      var nextPoint = points[i + 1] || points[0];
      newPoints.push(_glVec2.default.lerp([], points[i], nextPoint, randomFn()));
    }
    newPoints = newPoints.map(function (pt, i) {
      var lastPt = newPoints[i - 1] || newPoints[newPoints.length - 1];
      var nextPt = newPoints[i + 1] || newPoints[0];
      var distToClosestPt = (_glVec2.default.distance(pt, lastPt) + _glVec2.default.distance(pt, nextPt)) / 2;
      var r = (0, _normal2.default)(0, distToClosestPt / settings.sigma, randomFn);
      return [r() + pt[0], r() + pt[1]];
    });
    return newPoints;
  }

  function setMask(context, bounds) {
    var _bounds$ = _slicedToArray(bounds[0], 2),
        xMin = _bounds$[0],
        yMin = _bounds$[1];

    var _bounds$2 = _slicedToArray(bounds[1], 2),
        xMax = _bounds$2[0],
        yMax = _bounds$2[1];

    context.beginPath();
    var j = settings.maskCircles;
    while (j--) {
      var x = (0, _lerp2.default)(xMin, xMax, randomFn());
      var y = (0, _lerp2.default)(yMin, yMax, randomFn());
      var radius = randomFn() * settings.maskCircleSize;
      context.arc(x, y, radius, 0, Math.PI * 2);
    }
    context.clip();
  }

  function drawPolygonWithMask(context, poly, color) {
    var polygonBounds = getPolygonExtent(poly);
    context.save();
    if (settings.mask) {
      setMask(context, polygonBounds);
    }
    drawPolygon(context, poly, color);
    context.restore();
  }
}

function getPolygonExtent(poly) {
  var xMin = Infinity;
  var xMax = -Infinity;
  var yMin = Infinity;
  var yMax = -Infinity;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = poly[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var point = _step.value;

      xMin = point[0] < xMin ? point[0] : xMin;
      xMax = point[0] > xMax ? point[0] : xMax;
      yMin = point[1] < yMin ? point[1] : yMin;
      yMax = point[1] > yMax ? point[1] : yMax;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return [[xMin, yMin], [xMax, yMax]];
}

function drawPolygon(context, points, color) {
  context.beginPath();
  context.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(function (pt) {
    return context.lineTo(pt[0], pt[1]);
  });
  context.lineTo(points[0][0], points[0][1]);
  context.fillStyle = color;
  context.fill();
}
});

var index$1 = unwrapExports(index);

return index$1;

})));
