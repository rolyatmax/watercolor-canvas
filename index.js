const newArray = require('new-array')
const vec2 = require('gl-vec2')
const lerp = require('lerp')
const normal = require('./normal')

const defaultSettings = {
  colors: 3,
  shapePoints: 5,
  spread: 450,
  colorSize: 300,
  deformations: 2,
  layers: 55,
  sigma: 2,
  blend: 'lighten',
  mask: true,
  maskCircles: 300,
  maskCircleSize: 50,
  random: Math.random
}

module.exports = function watercolor (settings) {
  settings = Object.assign({}, defaultSettings, settings)
  const { context, randomFn } = settings
  const { width, height } = context.canvas

  context.globalCompositeOperation = settings.blend
  context.clearRect(0, 0, width, height)

  const canvasCenter = [width / 2, height / 2]
  const shapes = newArray(settings.colors).map(() => {
    const rgb = [
      randomFn() * 256 | 0,
      randomFn() * 256 | 0,
      randomFn() * 256 | 0
    ]

    const rads = randomFn() * Math.PI * 2
    const dist = Math.pow(randomFn(), 0.5) * settings.spread
    const shapeCenter = [
      Math.cos(rads) * dist + canvasCenter[0],
      Math.sin(rads) * dist + canvasCenter[1]
    ]
    let points = newArray(settings.shapePoints).map((_, i) => {
      const rads = Math.PI * 2 / settings.shapePoints * i
      return [
        Math.cos(rads) * settings.colorSize + shapeCenter[0],
        Math.sin(rads) * settings.colorSize + shapeCenter[1]
      ]
    })

    let j = settings.deformations + 2
    while (j--) {
      points = deformPolygon(points)
    }

    return { points, rgb }
  })

  return function draw () {
    let q = shapes.length * settings.layers
    while (q--) {
      const { points, rgb } = shapes[q % shapes.length]
      let detailedDeform = points.slice()
      let k = settings.deformations
      while (k--) {
        detailedDeform = deformPolygon(detailedDeform)
      }
      const opacity = 1 / (settings.layers + 4)
      const color = `rgba(${rgb.join(', ')}, ${opacity})`
      drawPolygonWithMask(context, detailedDeform, color)
    }
  }

  function deformPolygon (points) {
    let newPoints = []
    for (let i = 0; i < points.length; i++) {
      newPoints.push(points[i])
      const nextPoint = points[i + 1] || points[0]
      newPoints.push(vec2.lerp([], points[i], nextPoint, randomFn()))
    }
    newPoints = newPoints.map((pt, i) => {
      const lastPt = newPoints[i - 1] || newPoints[newPoints.length - 1]
      const nextPt = newPoints[i + 1] || newPoints[0]
      const distToClosestPt = (vec2.distance(pt, lastPt) + vec2.distance(pt, nextPt)) / 2
      const r = normal(0, distToClosestPt / settings.sigma, randomFn)
      return [
        r() + pt[0],
        r() + pt[1]
      ]
    })
    return newPoints
  }

  function setMask (context, bounds) {
    const [xMin, yMin] = bounds[0]
    const [xMax, yMax] = bounds[1]
    context.beginPath()
    let j = settings.maskCircles
    while (j--) {
      const x = lerp(xMin, xMax, randomFn())
      const y = lerp(yMin, yMax, randomFn())
      const radius = randomFn() * settings.maskCircleSize
      context.arc(x, y, radius, 0, Math.PI * 2)
    }
    context.clip()
  }

  function drawPolygonWithMask (context, poly, color) {
    const polygonBounds = getPolygonExtent(poly)
    context.save()
    if (settings.mask) {
      setMask(context, polygonBounds)
    }
    drawPolygon(context, poly, color)
    context.restore()
  }
}

function getPolygonExtent (poly) {
  let xMin = Infinity
  let xMax = -Infinity
  let yMin = Infinity
  let yMax = -Infinity
  for (let point of poly) {
    xMin = point[0] < xMin ? point[0] : xMin
    xMax = point[0] > xMax ? point[0] : xMax
    yMin = point[1] < yMin ? point[1] : yMin
    yMax = point[1] > yMax ? point[1] : yMax
  }
  return [
    [xMin, yMin],
    [xMax, yMax]
  ]
}

function drawPolygon (context, points, color) {
  context.beginPath()
  context.moveTo(points[0][0], points[0][1])
  points.slice(1).forEach(pt => context.lineTo(pt[0], pt[1]))
  context.lineTo(points[0][0], points[0][1])
  context.fillStyle = color
  context.fill()
}
