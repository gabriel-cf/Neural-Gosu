uses neural.Data
uses neural.Network

    var net = new int[]{1,10}
    var epochs = 5000
    var eta = 1.0
    var lmbda = 0.0
    var minbatch_len = 10 //fail when >batch
    var t_data = new Data[]{new Data({0.0}, 0, 10), new Data({1.0}, 1, 10), new Data({2.0}, 2, 10), new Data({3.0}, 3, 10)
        , new Data({4.0}, 4, 10), new Data({5.0}, 5, 10), new Data({6.0}, 6, 10), new Data({7.0}, 7, 10), new Data({8.0}, 8, 10), new Data({9.0}, 9, 10),
        new Data({0.0}, 0, 10), new Data({1.0}, 1, 10), new Data({2.0}, 2, 10), new Data({3.0}, 3, 10)
        , new Data({4.0}, 4, 10), new Data({5.0}, 5, 10), new Data({6.0}, 6, 10), new Data({7.0}, 7, 10), new Data({8.0}, 8, 10), new Data({9.0}, 9, 10),
        new Data({0.0}, 0, 10), new Data({1.0}, 1, 10), new Data({2.0}, 2, 10), new Data({3.0}, 3, 10)
        , new Data({4.0}, 4, 10), new Data({5.0}, 5, 10), new Data({6.0}, 6, 10), new Data({7.0}, 7, 10), new Data({8.0}, 8, 10), new Data({9.0}, 9, 10),
        new Data({0.0}, 0, 10), new Data({1.0}, 1, 10), new Data({2.0}, 2, 10), new Data({3.0}, 3, 10)
        , new Data({4.0}, 4, 10), new Data({5.0}, 5, 10), new Data({6.0}, 6, 10), new Data({7.0}, 7, 10), new Data({8.0}, 8, 10), new Data({9.0}, 9, 10),
        new Data({0.0}, 0, 10), new Data({1.0}, 1, 10), new Data({2.0}, 2, 10), new Data({3.0}, 3, 10)
        , new Data({4.0}, 4, 10), new Data({5.0}, 5, 10), new Data({6.0}, 6, 10), new Data({7.0}, 7, 10), new Data({8.0}, 8, 10), new Data({9.0}, 9, 10)}/*, new Data({1.0}, 1, 2), new Data({1.0}, 1, 2),
      new Data({0.0}, 0, 2), new Data({0.0}, 0, 2), new Data({0.0}, 0, 2), new Data({0.0}, 0, 2)}*/
    var network = new Network(net, epochs, eta, lmbda, minbatch_len, t_data)

    network.SGD()

    print (network.feedforward(new double[]{0.0}))
    print (network.feedforward(new double[]{1.0}))
    print (network.feedforward(new double[]{2.0}))
    print (network.feedforward(new double[]{3.0}))
    print (network.feedforward(new double[]{4.0}))
    print (network.feedforward(new double[]{5.0}))
    print (network.feedforward(new double[]{6.0}))
    print (network.feedforward(new double[]{7.0}))
    print (network.feedforward(new double[]{8.0}))
    print (network.feedforward(new double[]{9.0}))