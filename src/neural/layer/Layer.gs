package neural.layer

uses neural.neuron.Neuron

/**
 * Created by Gabri on 03/07/2016.
 */
abstract class Layer {
  protected var _neurons : Neuron[] as readonly Neurons
  protected var _last : boolean
  protected var _first : boolean

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
   * Activates neurons from this layer
   * @return activation values if it is the last layer, null otherwise
   */
  function feedForward() : double[]{
    var outputs : double[] = null
    if(_last)
      outputs = new double[_neurons.length];
    var x : double
    for (neuron in _neurons index i) {
      x = neuron.activate()
      if(_last)
        outputs[i] = x
    }
    return outputs
  }

  /**
   * Takes the input and sets it to feed the network.
   * Can only be used by the first layer.
   */
  function feedForward(inputs: double[]){
    for (neuron in _neurons index i) {
      if(! _first)
        throw new RuntimeException("Only first layer con have their inputs set")

      neuron.Z = inputs[i]
      neuron.Activation = inputs[i]
    }
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