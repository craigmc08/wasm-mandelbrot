let Mandelbrot = {}
// Default to prevent errors (incase calcMandelbrot is called before the wasm file is loaded)
Mandelbrot.getPoint = (x, y, r) => 255

document.addEventListener('DOMContentLoaded', async () => {
  Mandelbrot.canvas = document.querySelector('#mandelbrot')
  Mandelbrot.ctx = Mandelbrot.canvas.getContext('2d')
  const bounds = document.querySelector('body').getBoundingClientRect()
  Mandelbrot.canvas.width = bounds.width
  Mandelbrot.canvas.height = bounds.height

  Mandelbrot.zoom(1)
  await Mandelbrot.load()

  const steps = 80

  const beg = performance.now()
  const data = Mandelbrot.data = Mandelbrot.calculate(steps)
  const end1 = performance.now()

  // console.log(`Took ${end1 - beg}ms to calculate the set with ${steps} steps`)
  console.log(`${(Mandelbrot.canvas.width * Mandelbrot.canvas.height) / (end1 - beg) * 1000} pixels per second (calculation only)`)
  Mandelbrot.render(data)
  const end2 = performance.now()
  // console.log(`Took ${end2 - beg}ms to do everything with ${steps} steps`)
  console.log(`${(Mandelbrot.canvas.width * Mandelbrot.canvas.height) / (end2 - beg) * 1000} pixels per second (everything)`)
})

Mandelbrot.load = async () => {
  const instance = await loadWebAssembly('mandelbrot.wasm', {
    env: {
      _log: Math.log,
      _startPixels: Mandelbrot.startPixels(),
      _setPixel: Mandelbrot.setPixel(),
      _endPixels: Mandelbrot.endPixels(),
    },
  })
  const _color = instance.exports._point
  console.log(instance)
  const result = []

  Mandelbrot.getPoint = (x, y, r) => Math.floor(_color(x, y, r))
}
Mandelbrot.startPixels = () => {
  Mandelbrot.imageData = Mandelbrot.ctx.getImageData()
}
Mandelbrot.setPixel = (x, y, r, g=r, b=r, a=255) => {
  const i = (y * Mandelbrot.canvas.width + x) * 4
  const data = Mandelbrot.imageData.data
  data[i] = r
  data[i+1] = g
  data[i+2] = b
  data[i+3] = a
}
Mandelbrot.endPixels = () => {
  Mandelbrot.ctx.putImageData(Mandelbrot.imageData)
}
Mandelbrot.calculate = (steps) => {
  const {sx, ex, sy, ey} = Mandelbrot.bounds
  const data = []
  const {width, height} = Mandelbrot.canvas
  for (let x = 0; x < width; x++) {
    data[x] = []
    for (let y = 0; y < height; y++) {
      const v = Mandelbrot.getPoint(Math.map(x, 0, width, sx, ex), Math.map(y, 0, height, sy, ey), steps)
      data[x][y] = v
    }
  }
  return data
}
Mandelbrot.render = (mdata) => {
  const canvas = Mandelbrot.canvas
  const ctx = Mandelbrot.ctx
  const width = canvas.width
  const height = canvas.height
  const iData = ctx.getImageData(0, 0, width, height)
  const data = iData.data
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const v = mdata[x][y]
      const i = (y * width + x) * 4
      if (v === -1) {
        data[i] = 255
        data[i+1] = 255
        data[i+2] = 255
      } else {
        data[i] = v
        data[i+1] = 0
        data[i+2] = v
      }
      data[i+3] = 255
    }
  }
  ctx.putImageData(iData, 0, 0)
}
/* zoom rules:
 * 1, 1 = -2.5, 1 -> 1, -1
 * y is reversed to make the fractal appear the correct way (does it matter?)
 * for canvases with aspect ratio not = to 1.75 (3.5 / 2), scale will be based on y
 * oX and oY are from the center
 */
Mandelbrot.zoom = (sX, sY=sX, oX=0, oY=0) => {
  if (!Mandelbrot.canvas) return

  const {width, height} = Mandelbrot.canvas
  const caspect = width / height
  const maspectBase = 3.5 / 2
  const dy = 2 * sX
  if (!Mandelbrot.bounds) Mandelbrot.bounds = {}
  Mandelbrot.bounds.sy = oY + dy / 2
  Mandelbrot.bounds.ey = oY - dy / 2
  const dx = 3.5 * sX * (caspect / maspectBase)
  oX -= 0.75
  Mandelbrot.bounds.sx = oX - dx / 2
  Mandelbrot.bounds.ex = oX + dx / 2
}
