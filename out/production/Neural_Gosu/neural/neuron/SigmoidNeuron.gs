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

  /**
   * The sigmoid function. Updates the activation value and returns it
   * @param z input value
   * @return activation value
   */
  override function activation_function(z : double): double {
    return 1.0/(1.0 + Math.exp(-z))
  }

  override function activation_function() : double{
    return activation_function(_z)
  }

  /**
   * Sigmoid prime function
   * @param z input value
   * @return prime activation value
   */
  override function activation_function_prime(z : double) : double{
    return  activation_function(z) * (1 - activation_function(z))
  }

}