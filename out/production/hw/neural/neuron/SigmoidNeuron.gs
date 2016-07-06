package neural.neuron

/**
 * Created by Gabri on 03/07/2016.
 */
class SigmoidNeuron extends Neuron{

  /**
   * Sigmoid function
   * @param z input
   * @return activation value
   */

  construct(){
    super()
  }
  construct(inputNeurons : Neuron[]){
    super(inputNeurons)
  }

  override function activation_function(z : double): double {
    _activation = 1.0/(1.0 + Math.exp(-z))
    return _activation
  }

  override function activation_function() : double{

    return activation_function(_z)
  }

  override function activation_function_prime(z : double) : double{
    return  activation_function(z) * (1 - activation_function(z))  ///WAAAAARRRNIIIIIINGGG SETTING _activation again!!
  }

  override function activation_function_prime() : double{
    return activation_function_prime(_z)
  }
}