package neural

uses neural.neuron.Neuron
uses neural.layer.*

/**
 * Created by Gabri on 03/07/2016.
 */
class Network {
  var _layers : Layer[];
  var _nLayers : int;
  var _epochs : int;
  var _eta : double; //learning rate
  var _lmbda : double; //regularization
  var _minbatch_len : int; //mini-batch length
  var _training_data : Data[]
  var _testing_data : Data[]


  construct(net : int[], epochs : int, eta : double, lmbda : double, minbatch_len : int, t_data : Data[]){
    _nLayers = net.length
    _layers = new Layer[_nLayers]
    _layers[0] = new FullyConnectedLayer(net[0], true, net.length == 0)
    for(i in 1..|net.length){
      _layers[i] = new FullyConnectedLayer(net[i], _layers[i-1], false, i == net.length - 1)
    }
    _epochs = epochs
    _eta = eta
    _lmbda = lmbda
    _minbatch_len = minbatch_len
    _training_data = t_data
    _testing_data = null

    print("Neural Network Ready")
  }

  construct(net : int[], epochs : int, eta : double, lmbda : double, minbatch_len : int, t_data : Data[], tt_data : Data[]) {
    this(net,epochs,eta,lmbda,minbatch_len,t_data)
    _testing_data = tt_data
  }

  function SGD(){
    for (epoch in 0..|_epochs) {
      System.out.print("\rTraining epoch "+(epoch + 1) + " of " + _epochs)
      shuffleArray(_training_data)
      var i = 0
      var j = 0
      while (i < _training_data.length) {
        j++
        backprop(_training_data[i])
        if (j == _minbatch_len) {
          updateMiniBatch(_minbatch_len, _lmbda) //updates weights and biases according to the delta values stored during the minibatch. Prepare for next minibatch
          j = 0
        }
        i++
      }
      if (j > 0) {
        updateMiniBatch(j, _lmbda)
      }
    }
    System.out.print("\n")
    if(_testing_data != null){
      var n = 0
      for (data in _testing_data){
        n += normalizeOutput(feedforward(data.Input)).equals(data.Output)? 1 : 0
      }
      System.out.println("Hits: "+n+"/"+_testing_data.length)
    }

  }

  function feedforward(x : double[]) : double[]{
    for(i in 0..|_nLayers){
      x = _layers[i].feedForward(x) //propagate the input through the network and retrieve the final output
    }
    return x
  }

  /**
   *
   * @param x input
   * @param y expected output
   */
  function backprop(data : Data){
    var x = data.Input
    var y = data.Output
    x = feedforward(x)
    var cost = cost_derivative(x, y)
    _layers[_nLayers - 1].setDeltaBias(cost) //last layer gets its delta updated from the cost
    for(i in _nLayers|..0){
      _layers[i].backPropagateDeltas()
    }
  }

  private function updateMiniBatch(batch_len : int, lmbda : double){
    for(layer in _layers index i){
      layer.updateWeightsAndBias(_eta, _training_data.length, batch_len, lmbda)
      //layer.printStatus()
    }

  }

  private function cost_derivative(output : double[], expected_output: double[]) : double[]{
    var cost : double[] = new double[output.length]
    for (i in 0..|output.length){
      cost[i] = output[i] - expected_output[i]
    }
    return cost
  }

  function normalizeOutput(output : double[]): double[]{
    var maxValue = Double.MIN_VALUE
    var maxIndex = -1
    var normalized_output = new double[output.length]

    for(v in output index j){
      if(maxValue < v) {
        maxValue = v
        maxIndex = j
      }
    }
    normalized_output[maxIndex] = 1.0

    return normalized_output
  }

  private function shuffleArray(array : Object[]){
    var index : int
    var temp : Object
    var random = new Random();

    for (i in array.length|..|0) {
      index = random.nextInt(i + 1);
      temp = array[index];
      array[index] = array[i];
      array[i] = temp;
    }
  }

}