// Load the script
loadWebAssembly('mandelbrot.wasm').then((instance) => {
  const _getColor = instance.exports._getColor
  const result = []

  getColor = (x, y, r) => Math.floor(_getColor(x, y, r))
  const steps = 200

  const beg = performance.now()
  const data = calcMandelbrot(canvas.width, canvas.height, steps)
  const end1 = performance.now()

  console.log(`Took ${end1 - beg}ms to calculate the set with ${steps} steps`)
  renderMandelbrot(data)
  const end2 = performance.now()
  console.log(`Took ${end2 - beg}ms to do everything with ${steps} steps`)
})


const canvas = document.querySelector('#mandelbrot')

// Default to prevent errors (incase calcMandelbrot is called before the wasm file is loaded)
let getColor = (x, y, r) => 255

function calcMandelbrot(width, height, res, sx=-2.5, sy=1, ex=1, ey=-1) {
  const data = []
  for (let x = 0; x < width; x++) {
    data[x] = []
    for (let y = 0; y < height; y++) {
      const v = getColor(Math.map(x, 0, width, sx, ex), Math.map(y, 0, height, sy, ey), res)
      data[x][y] = v
    }
  }
  return data
}
function renderMandelbrot(mdata) {
  const canvas = document.getElementById('mandelbrot')
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  const iData = ctx.getImageData(0, 0, width, height)
  const data = iData.data
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const v = mdata[x][y]
      const i = (y * width + x) * 4
      if (v === 255) {
        data[i] = v
        data[i+1] = v
        data[i+2] = v
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
