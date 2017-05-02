const Sketch = require('sketch-js')
const { GUI } = require('dat-gui')
const Alea = require('alea')
const watercolor = require('./')

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

let rand

ctx.setup = ctx.resize = function () {
  rand = new Alea(settings.randomSeed)
  ctx.clearRect(0, 0, ctx.width, ctx.height)

  const params = Object.assign({}, settings, {
    randomFn: rand,
    context: ctx
  })
  const draw = watercolor(params)
  draw()
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
gui.add(settings, 'maskCircles', 1, 500).step(1).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'maskCircleSize', 1, 500).onChange(ctx.setup.bind(ctx))
// gui.add(settings, 'fitToNeighbor', ['min', 'max']).onChange(ctx.setup.bind(ctx))
gui.add(settings, 'randomSeed', 0, 999).onChange(ctx.setup.bind(ctx))
