const Sketch = require('sketch-js')
const newArray = require('new-array')
const vec2 = require('gl-vec2')
const { GUI } = require('dat-gui')
const Alea = require('alea')
const lerp = require('lerp')
const normal = require('./normal')

const container = document.body.appendChild(document.createElement('div'))
document.body.style.margin = 0

const ctx = Sketch.create({
  container: container,
  autostart: false,
  autoclear: false
})

const settings = {
  colors: 3,
  shapePoints: 5,
  spread: 450,
  colorSize: 300,
  deformations: 2,
  layers: 55,
  randomSeed: 16,
  sigma: 2,
  blend: 'lighten',
  mask: true,
  maskCircles: 300,
  maskCircleSize: 50
}

let shapes
let rand

ctx.setup = ctx.resize = function () {
  ctx.globalCompositeOperation = settings.blend
  rand = new Alea(settings.randomSeed)
  ctx.clearRect(0, 0, ctx.width, ctx.height)

  const canvasCenter = [ctx.width / 2, ctx.height / 2]
  shapes = newArray(settings.colors).map(() => {
    // const rgb = colors[colors.length * rand() | 0]
    const rgb = [
      rand() * 256 | 0,
      rand() * 256 | 0,
      rand() * 256 | 0
    ]

    const rads = rand() * Math.PI * 2
    const dist = Math.pow(rand(), 0.5) * settings.spread
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
    drawPolygonWithMask(ctx, detailedDeform, color)
  }
}

const gui = new GUI()
gui.add(settings, 'colors', 1, 6).step(1).onChange(ctx.setup.bind(ctx))
// gui.add(settings, 'shapePoints', 3, 15).step(1).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'spread', 1, 1000).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'colorSize', 1, 1000).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'deformations', 0, 5).step(1).onChange(ctx.setup.bind(ctx))
// gui.add(settings, 'layers', 1, 200).step(1).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'sigma', 0.5, 3).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'blend', ['lighten', 'darken']).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'mask').onChange(ctx.setup.bind(ctx))
// gui.add(settings, 'fitToNeighbor', ['min', 'max']).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'randomSeed', 0, 999).onChange(ctx.setup.bind(ctx))

// need to figure this out
function deformPolygon (points) {
  let newPoints = []
  for (let i = 0; i < points.length; i++) {
    newPoints.push(points[i])
    const nextPoint = points[i + 1] || points[0]
    newPoints.push(vec2.lerp([], points[i], nextPoint, rand()))
  }
  newPoints = newPoints.map((pt, i) => {
    const lastPt = newPoints[i - 1] || newPoints[newPoints.length - 1]
    const nextPt = newPoints[i + 1] || newPoints[0]
    const distToClosestPt = (vec2.distance(pt, lastPt) + vec2.distance(pt, nextPt)) / 2
    const r = normal(0, distToClosestPt / settings.sigma, rand)
    return [
      r() + pt[0],
      r() + pt[1]
    ]
  })
  return newPoints
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

function setMask (ctx, bounds) {
  const [xMin, yMin] = bounds[0]
  const [xMax, yMax] = bounds[1]
  ctx.beginPath()
  let j = settings.maskCircles
  while (j--) {
    const x = lerp(xMin, xMax, rand())
    const y = lerp(yMin, yMax, rand())
    const radius = rand() * settings.maskCircleSize
    ctx.arc(x, y, radius, 0, Math.PI * 2)
  }
  ctx.clip()
}

function drawPolygonWithMask (ctx, poly, color) {
  const polygonBounds = getPolygonExtent(poly)
  ctx.save()
  if (settings.mask) {
    setMask(ctx, polygonBounds)
  }
  drawPolygon(ctx, poly, color)
  ctx.restore()
}

function drawPolygon (ctx, points, color) {
  ctx.beginPath()
  ctx.moveTo(points[0][0], points[0][1])
  points.slice(1).forEach(pt => ctx.lineTo(pt[0], pt[1]))
  ctx.lineTo(points[0][0], points[0][1])
  ctx.fillStyle = color
  ctx.fill()
}
