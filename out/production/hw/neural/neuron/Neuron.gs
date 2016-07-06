package neural.neuron

/**
 * Created by Gabri on 03/07/2016.
 */
abstract class Neuron {
  public class Weight{
    public var _weight : double as Weight;
    public var _neuron : Neuron as N;
    public var _delta : double as Delta;
    public var _deltaAcum : double as DeltaAcum;

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
      //print("_neuron.Activation: "+_neuron.Activation)
      //print("biasDelta: "+biasDelta)
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
  public class Bias{
    public var _value : double as Bias;
    public var _delta : double as Delta
    public var _deltaAcum : double as DeltaAcum;

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
      _delta = 0 //necessary?
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

  protected var _weights : Weight[] as readonly W;
  protected var _bias : Bias as readonly B;
  protected var _z : double as Z;
  protected var _activation : double as Activation;

  construct(){
    _weights = null
    _bias = new Bias(Math.random()*2.0 - 1.0)
    _activation = 0.0
    _z = 0.0
  }

  construct(inputNeurons : Neuron[]){
    this()
    _weights = new Weight[inputNeurons.length]
    setWeights(inputNeurons)

  }

  private function setWeights(inputNeurons : Neuron[]){
    for(neuron in inputNeurons index i){
      _weights[i] = new Weight(Math.random()*2.0 - 1.0, neuron) //Implement random gaussian weight initialization
    }
  }

  function resetDeltas(){
    for (w in _weights)
      w._delta = 0
    _bias._delta = 0
  }

  function resetDeltaAcum(){
    for (w in _weights)
      w._deltaAcum = 0
    _bias._deltaAcum = 0
  }

  function updateWeights(eta : double, training_set_size : int, n : int, lmbda : double){
    for (weight in _weights){
      weight.updateWeight(eta, training_set_size, n, lmbda);
    }
  }
  function updateBias(eta : double, n : int){
    _bias.updateBias(eta, n);
  }

  function updateDeltaBias(){
    _bias.updateDeltaBias(activation_function_prime(_z))
  }

  function addToDeltaBias(n : double){
    _bias.Delta += n
    //print(_bias.Delta)
  }

  function backUpdate(){
      for (w in _weights) {
        if(! w.N.isInFirstLayer()) {
          w.N.addToDeltaBias(w.Weight * _bias.Delta)
        }
        w.updateDelta(_bias.Delta)
    }
  }

  function isInFirstLayer() : boolean{
    return _weights == null
  }

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
  abstract function activation_function_prime() : double;


}