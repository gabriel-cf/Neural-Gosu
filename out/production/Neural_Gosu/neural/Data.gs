package neural

/**
 * Created by Gabri on 05/07/2016.
 */
class Data {
  var _input : double[] as Input
  var _output : double[] as Output

  construct(x : double[], y : int, n : int){
    if(y < 0)
      throw new RuntimeException("output value must be greater than 0")
    _input = x
    _output = vectorize_output(y, n)
  }

  private function vectorize_output(y : int, n : int) : double[]{
    var output = new double[n]
    output[y] = 1.0

    return output
  }
}