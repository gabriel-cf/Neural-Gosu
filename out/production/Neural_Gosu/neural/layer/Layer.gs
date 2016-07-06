package neural.layer

uses neural.neuron.Neuron

/**
 * Created by Gabri on 03/07/2016.
 */
abstract class Layer {
  protected var _neurons : Neuron[] as readonly Neurons
  protected var _last : boolean = false
  protected var _first : boolean = false

  /**
   * Used to initialize deltas from the last layer
   * @param deltas result of the cost function
   */
  public function setDeltaBias (deltas : double[]){
    if(!_last){
      throw new RuntimeException("Only last layer can have their deltas assigned")
    }
    for (neuron in _neurons index i){
      neuron.setDelta(deltas[i])
    }
  }

  /**
   * For each neuron updates the delta using the activation prime function and backpropagates
   * the delta to weights and biases
   */
  public function backPropagateDeltas(){
    for (neuron in _neurons){
      if(!_first){
        neuron.updateDeltaBias() //sets the delta for that neuron (it multiplies its value by the activation_prime)
        neuron.backUpdate()
      }
    }
  }

  /**
   * Updates weights and biases for each neuron of the layer
   * @param eta learning rate
   * @param training_set_size size of the training data set
   * @param n size of the mini-batch
   * @param lmbda regularization factor
   */
  public function updateWeightsAndBias(eta : double, training_set_size : int, n : int, lmbda : double){
    for (neuron in _neurons){
      neuron.updateBias(eta, n)
      neuron.updateWeights(eta, training_set_size, n, lmbda)
    }
  }

  /**
   * @param inputs array of activations used to feed the layer
   * @return output array with activation values
   */
  function feedForward(inputs: double[]) : double[] {
    var outputs = new double[_neurons.length];
    for (neuron in _neurons index i) {
      neuron.resetDeltas() //sets deltas to 0 for backpropagation
      if(_first) { //Neurons from the first layer, by convention, do not operate over the input
        neuron.Z = inputs[i]
        neuron.Activation = inputs[i]
        outputs[i] = inputs[i]
      }else {
        neuron.calculateZ(inputs) //loads _z attribute
        outputs[i] = neuron.activation_function() //loads _activation attribute and retrieves it
      }
    }
    return outputs;
  }

  /**
   * Prints the bias and weight values of the neurons in the layer
   */
  function printStatus(){
    for (neuron in _neurons){
      System.out.println("---------\n"+neuron.toString())
    }
  }
}