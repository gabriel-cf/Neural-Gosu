uses neural.*
    print ("AND Gate: ")
    AND()
    print ("\nOR Gate: ")
    OR()
    print ("\nNAND Gate: ")
    NAND()
    print ("\nXOR Gate: ")
    XOR()

    /**
     * Logic Gate AND
     */
    function AND(){
      var m = 2 // size of the output vector
      var net = new int[]{2,m}
      var epochs = 500
      var eta = 1.0
      var lmbda = 0.0
      var minbatch_len = 2
      var t_data = new Data[]{new Data({1.0,1.0}, 1, m), new Data({1.0,0.0}, 0, m), new Data({0.0,1.0}, 0, m), new Data({0.0,0.0}, 0, m)}
      var network = new Network(net, epochs, eta, lmbda, minbatch_len, t_data)

      network.SGD()

      print ("1 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 1.0})))) // => [0.0, 1.0]
      print ("1 0 => " +Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 0.0})))) // => [1.0, 0.0]
      print ("0 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 1.0})))) // => [1.0, 0.0]
      print ("0 0 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 0.0})))) // => [1.0, 0.0]
    }

    /**
     * Logic Gate OR
     */
    function OR(){
      var m = 2 // size of the output vector
      var net = new int[]{2,m}
      var epochs = 500
      var eta = 1.0
      var lmbda = 0.0
      var minbatch_len = 2
      var t_data = new Data[]{new Data({1.0,1.0}, 1, m), new Data({1.0,0.0}, 1, m), new Data({0.0,1.0}, 1, m), new Data({0.0,0.0}, 0, m)}
      var network = new Network(net, epochs, eta, lmbda, minbatch_len, t_data)

      network.SGD()

      print ("1 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 1.0})))) // => [0.0, 1.0]
      print ("1 0 => " +Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 0.0})))) // => [0.0, 1.0]
      print ("0 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 1.0})))) // => [0.0, 1.0]
      print ("0 0 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 0.0})))) // => [1.0, 0.0]
    }

    /**
     * Logic Gate XOR
     */
    function XOR(){
      var m = 2 // size of the output vector
      var net = new int[]{2,10,m}
      var epochs = 500
      var eta = 1.0
      var lmbda = 0.0
      var minbatch_len = 2
      var t_data = new Data[]{new Data({1.0,1.0}, 0, m), new Data({1.0,0.0}, 1, m), new Data({0.0,1.0}, 1, m), new Data({0.0,0.0}, 0, m)}
      var network = new Network(net, epochs, eta, lmbda, minbatch_len, t_data)

      network.SGD()

      print ("1 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 1.0})))) // => [1.0, 0.0]
      print ("1 0 => " +Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 0.0})))) // => [0.0, 1.0]
      print ("0 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 1.0})))) // => [0.0, 1.0]
      print ("0 0 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 0.0})))) // => [1.0, 0.0]
    }

    /**
     * Logic Gate NAND
     */
    function NAND(){
      var m = 2 // size of the output vector
      var net = new int[]{2,50,m}
      var epochs = 500
      var eta = 1.0
      var lmbda = 0.0
      var minbatch_len = 2
      var t_data = new Data[]{new Data({1.0,1.0}, 0, m), new Data({1.0,0.0}, 1, m), new Data({0.0,1.0}, 1, m), new Data({0.0,0.0}, 1, m)}
      var network = new Network(net, epochs, eta, lmbda, minbatch_len, t_data)

      network.SGD()

      print ("1 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 1.0})))) // => [1.0, 0.0]
      print ("1 0 => " +Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 0.0})))) // => [0.0, 1.0]
      print ("0 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 1.0})))) // => [0.0, 1.0]
      print ("0 0 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 0.0})))) // => [0.0, 1.0]
    }
