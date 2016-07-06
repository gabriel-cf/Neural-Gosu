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
      var n_outputs = 2 // size of the output vector
      var net = new int[]{2,n_outputs}
      var epochs = 500
      var eta = 1.0
      var lmbda = 0.0
      var minbatch_len = 2
      var t_data = new Data[]{new Data({1.0,1.0}, 1, n_outputs), new Data({1.0,0.0}, 0, n_outputs), new Data({0.0,1.0}, 0, n_outputs), new Data({0.0,0.0}, 0, n_outputs)}
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
      var n_outputs = 2 // size of the output vector
      var net = new int[]{2,n_outputs}
      var epochs = 500
      var eta = 1.0
      var lmbda = 0.0
      var minbatch_len = 2
      var t_data = new Data[]{new Data({1.0,1.0}, 1, n_outputs), new Data({1.0,0.0}, 1, n_outputs), new Data({0.0,1.0}, 1, n_outputs), new Data({0.0,0.0}, 0, n_outputs)}
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
      var n_outputs = 2 // size of the output vector
      var net = new int[]{2,10,n_outputs}
      var epochs = 500
      var eta = 1.0
      var lmbda = 0.0
      var minbatch_len = 2
      var t_data = new Data[]{new Data({1.0,1.0}, 0, n_outputs), new Data({1.0,0.0}, 1, n_outputs), new Data({0.0,1.0}, 1, n_outputs), new Data({0.0,0.0}, 0, n_outputs)}
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
      var n_outputs = 2 // size of the output vector
      var net = new int[]{2,50,n_outputs}
      var epochs = 500
      var eta = 1.0
      var lmbda = 0.0
      var minbatch_len = 2
      var t_data = new Data[]{new Data({1.0,1.0}, 0, n_outputs), new Data({1.0,0.0}, 1, n_outputs), new Data({0.0,1.0}, 1, n_outputs), new Data({0.0,0.0}, 1, n_outputs)}
      var network = new Network(net, epochs, eta, lmbda, minbatch_len, t_data)

      network.SGD()

      print ("1 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 1.0})))) // => [1.0, 0.0]
      print ("1 0 => " +Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{1.0, 0.0})))) // => [0.0, 1.0]
      print ("0 1 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 1.0})))) // => [0.0, 1.0]
      print ("0 0 => "+Arrays.toString(network.normalizeOutput(network.feedforward(new double[]{0.0, 0.0})))) // => [0.0, 1.0]
    }
