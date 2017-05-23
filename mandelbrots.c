#include <math.h>

double logBase = 1.4426950408889634;
double logHalfBase = -1;

double map(double v, double a, double b, double c, double d) {
  return (v - a) / (b - a) * (d - c) + c;
}

double point(double Cr, double Ci, int times) {
  double ESCAPE = 4;
  int MAX_ITERATION = times;

  double Zr = 0;
  double Zi = 0;
  double Tr = 0;
  double Ti = 0;
  int i = 0;
  while (Tr + Ti <= ESCAPE && i < MAX_ITERATION) {
    Zi = Zr * Zi;
    Zi += Zi;
    Zi += Ci;
    Zr = Tr - Ti + Cr;
    Tr = pow(Zr, 2);
    Ti = pow(Zi, 2);
    i++;
  }
  if (i == MAX_ITERATION) {
    return (double)-1;
  } else {
    double v = (double)5 + (double)i - logHalfBase - log(log(Tr + Ti)) * logBase;
    return v / MAX_ITERATION * 255;
  }
}

// void draw(int width, int height, int steps, double sx, double sy, double ex, double ey) {
//   startPixels();
//   for (int x = 0; x < width; x++) {
//     for (int y = 0; y < height; y++) {
//       double Cr = map((double)x, 0.0, (double)width, sx, ex);
//       double Ci = map((double)y, 0.0, (double)height, sy, ey);
//       double a = point(Cr, Ci, steps);
//       if (a == -1) {
//         setPixel(x, y, 255);
//       } else {
//         setPixel(x, y, a, 0, a);
//       }
//     }
//   }
//   endPixels();
// }
