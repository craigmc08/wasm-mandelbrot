# wasm Mandelbrot
Mandelbrot set written with WebAssembly.

### Run locally
1. Clone the repository
```sh
git clone https://github.com/craigmc08/wasm-mandelbrot
cd wasm-mandelbrot
```
2. Run the server (required node.js)
```sh
node server.js
```
3. Open http://localhost:8080/index.html in your browser

And that's it! You should see the fractal appear.

### Contribute
To make changes, you will emsdk. Head to http://webassembly.org/getting-started/developers-guide/ for instructions on setting this up (it can take a while).

To compile mandelbrot.c, run build.sh. Make sure there are no errors. The set is rendered in mandelbrot.js
