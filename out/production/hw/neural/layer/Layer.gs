package neural.layer

uses neural.neuron.Neuron

/**
 * Created by Gabri on 03/07/2016.
 */
abstract class Layer {
  protected var _neurons : Neuron[] as readonly Neurons
  protected var _last : boolean = false
  protected var _first : boolean = false

  protected function resetLayer(){
    for (neuron in _neurons)
      neuron.resetDeltaAcum()
  }

  public function setDeltaBias (deltas : double[]){
    for (neuron in _neurons index i){
      neuron.B.Delta = deltas[i]
      //neuron.updateDeltaBias()
    }
  }

  public function backPropagateDeltas(){
    for (neuron in _neurons){
      if(!_first){
        neuron.updateDeltaBias() //sets the delta for that neuron (it multiplies its value by the activation_prime)
        neuron.backUpdate()
      }
    }
  }

  public function updateWeightsAndBias(eta : double, training_set_size : int, n : int, lmbda : double){
    for (neuron in _neurons){
      neuron.updateBias(eta, n)
      neuron.updateWeights(eta, training_set_size, n, lmbda)
    }
  }

  /**
   * @param inputs double array of values to feed the layer
   * @return output array with activation values
   */
  function feedForward(inputs: double[]) : double[] {
    var outputs = new double[_neurons.length];
    for (neuron in _neurons index i) {
      neuron.resetDeltas() //might be better in a separate method
      if(_first) {
        neuron.Z = inputs[i]
        neuron.Activation = inputs[i]
        outputs[i] = inputs[i]
      }else {
        neuron.calculateZ(inputs) //loads _z attribute
        outputs[i] = neuron.activation_function() //loads _activation attribute
      }
      /*_zs[i] = neuron.calculateZ(inputs)
      outputs[i] = neuron.activation_function(_zs[i]);*/
    }
    return outputs;
  }

  function printStatus(){
    for (neuron in _neurons){
      System.out.println("---------\n"+neuron.toString())
    }
  }
}