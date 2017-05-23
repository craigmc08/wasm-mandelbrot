#include <math.h>

// double logBase = 1.4426950408889634;
// double logHalfBase = -1;

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
    return (double)i / (double)MAX_ITERATION * 255.0;
  }
}
