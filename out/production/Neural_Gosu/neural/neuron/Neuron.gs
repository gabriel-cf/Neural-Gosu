package neural.neuron

/**
 * Created by Gabri on 03/07/2016.
 */
abstract class Neuron {
  private class Weight{
    private var _weight : double as Weight;
    private var _neuron : Neuron as N;
    private var _delta : double as Delta;
    private var _deltaAcum : double as DeltaAcum;

    construct(w : double, n : Neuron){
      _weight = w;
      _neuron = n;
      _delta = 0;
    }

    /**
     * Updates the weight setting it to its new value
     * @param eta learning rate
     * @param n length of the mini-batch
     */
    public function updateWeight(eta : double, training_set_size : int, batch_size : int, lmbda:double){
      _weight = (1-eta*(lmbda/training_set_size))*_weight - (eta/batch_size) * _deltaAcum
      _delta = 0
      _deltaAcum = 0
    }

    public function updateDelta(biasDelta : double){
      _delta = _neuron.Activation * biasDelta
      updateAcum()
    }

    private function updateAcum(){
      _deltaAcum += _delta
    }

    override function toString():String{
      return ""+_weight
    }
  }
  private class Bias{
    private var _value : double as Bias;
    private var _delta : double as Delta
    private var _deltaAcum : double as DeltaAcum;

    construct(v : double){
      _value = v;
      _delta = 0;
    }

    /**
     * Updates the bias setting it to its new value
     * @param eta learning rate
     * @param n length of the mini-batch
     */
    public function updateBias(eta : double, n : int){
      _value = _value - (eta/n) * _deltaAcum
      _delta = 0
      _deltaAcum = 0
    }

    public function updateDeltaBias(prime_z : double){
      _delta *= prime_z
      updateAcum()
    }

    private function updateAcum(){
      _deltaAcum += _delta
    }
  }

  protected var _weights : Weight[] as readonly W; //All Weights storing weight value, corresponding neuron and deltas
  protected var _bias : Bias as readonly B;
  protected var _z : double as Z; //Sum of the product of all weights with activation values and bias
  protected var _activation : double as Activation; //activation function return for _z

  /**
   * Instantiates a neuron from the first layer. Without weights
   */
  construct(){
    _weights = null
    _bias = new Bias(Math.random()*2.0 - 1.0) //Random value between -1.0 and 1.0
    _activation = 0.0
    _z = 0.0
  }

  /**
   * Instantiates a neuron from the nth layer creating the weights from a list of input neurons
   * @param inputNeurons list of neurons whose activations are linked to this
   */
  construct(inputNeurons : Neuron[]){
    this()
    setWeights(inputNeurons)
  }

  /**
   * Receives a list of input neurons and creates the Weights between them and this neuron
   * @param inputNeurons
   */
  private function setWeights(inputNeurons : Neuron[]){
    _weights = new Weight[inputNeurons.length]
    for(neuron in inputNeurons index i){
      _weights[i] = new Weight(Math.random()*2.0 - 1.0, neuron) //Random value between -1.0 and 1.0
    }
  }

  /**
   * Prepares deltas for a new feedforward with backpropagation
   */
  function resetDeltas(){
    for (w in _weights)
      w._delta = 0
    _bias._delta = 0
  }

  function setDelta(v : double){
    _bias.Delta = v
  }

  /**
   * Prepares the delta accumulators for a new mini-batch
   * [Note: already doing it when updating the weight and biases]
   */
  function resetDeltaAcum(){
    for (w in _weights)
      w._deltaAcum = 0
    _bias._deltaAcum = 0
  }

  /**
   * Updates the weights of the neuron to their new value considering the delta weight accumulated and the following parameters
   * @param eta learning rate
   * @param training_set_size size of the training set
   * @param n size of the mini-batch
   * @param lmbda weight regularization factor
   */
  function updateWeights(eta : double, training_set_size : int, n : int, lmbda : double){
    for (weight in _weights){
      weight.updateWeight(eta, training_set_size, n, lmbda);
    }
  }

  /**
   * Updates the bias to its new value considering the delta bias accumulated and the following parameters
   * @param eta learning rate
   * @param n size of the mini-batch
   */
  function updateBias(eta : double, n : int){
    _bias.updateBias(eta, n);
  }

  /**
   * This function should be called first during backpropagation for each layer.
   * Applies the prime activation function to the stored delta bias to update it with the final delta
   */
  function updateDeltaBias(){
    _bias.updateDeltaBias(activation_function_prime(_z))
  }

  /**
   * Receives a partial delta value from a next-layer neuron and adds it.
   * Once backpropagation gets to the layer containing this neuron, updates this value with updateDeltaBias()
   * @param n
   */
  function addToDeltaBias(n : double){
    _bias.Delta += n
  }

  /**
   * Takes the weights and biases and backpropagates the delta values to the neurons connected by weights
   * using the backpropagating equations
   */
  function backUpdate(){
      for (w in _weights) {
        if(! w.N.isInFirstLayer()) {
          w.N.addToDeltaBias(w.Weight * _bias.Delta)
        }
        w.updateDelta(_bias.Delta)
    }
  }

  /**
   * @return true if the neuron belongs to the first layer
   */
  function isInFirstLayer() : boolean{
    return _weights == null
  }

  /**
   * Calculates the Z value as the sum of products of weights and activations plus bias
   * @param inputs activations from the early layer linked to this neuron
   * @return updated Z value
   */
  function calculateZ(inputs : double[]) : double {
    _z = 0.0;
    for (x in inputs index j) {
      _z += x * _weights[j].Weight;
    }
    _z += _bias.Bias;

    return _z;
  }

  override function toString():String{
    var sb = new StringBuilder();
    sb.append("Bias: ").append(_bias.Bias).append("\nWeights: "+Arrays.toString(_weights)).append("\nBias_Delta: ").append(_bias._delta)
    return sb.toString()
  }

  abstract function activation_function() : double;
  abstract function activation_function(z : double) : double;
  abstract function activation_function_prime(z : double) : double;


}