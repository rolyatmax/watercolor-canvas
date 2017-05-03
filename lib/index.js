'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = watercolor;

var _newArray = require('new-array');

var _newArray2 = _interopRequireDefault(_newArray);

var _glVec = require('gl-vec2');

var _glVec2 = _interopRequireDefault(_glVec);

var _lerp = require('lerp');

var _lerp2 = _interopRequireDefault(_lerp);

var _normal = require('./normal');

var _normal2 = _interopRequireDefault(_normal);

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