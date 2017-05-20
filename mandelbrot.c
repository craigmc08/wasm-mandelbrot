#include <stdio.h>
#include <stdlib.h>
#include <math.h>

float checkMandelbrotPoint(float x0, float y0, int times) {
  float ESCAPE = 2*2;
  int MAX_ITERATION = times;

  float x = 0;
  float y = 0;
  float xsqr = 0;
  float ysqr = 0;
  int iteration = 0;
  while (xsqr + ysqr <= ESCAPE && iteration < MAX_ITERATION) {
    y = x * y;
    y += y;
    y += y0;
    x = xsqr - ysqr + x0;
    xsqr = pow(x, 2);
    ysqr = pow(y, 2);
    iteration++;
  }
  if (iteration == MAX_ITERATION) {
    return (float)1;
  } else {
    return (float)iteration / (float)MAX_ITERATION;
  }
}

float getColor(float x, float y, int times) {
  float a = checkMandelbrotPoint(x, y, times);
  return a * 255;
}
