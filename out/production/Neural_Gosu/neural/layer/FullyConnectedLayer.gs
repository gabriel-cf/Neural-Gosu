package neural.layer

uses neural.neuron.*;
/**
 * Created by Gabri on 03/07/2016.
 */
class FullyConnectedLayer extends Layer{

  /**
   * This is were the especial part of FullyConnectedLayer comes in
   * When it creates a new neuron, it sends ALL the neurons from the prev layer as inputs
   * @param n number of neurons
   * @param prevLayer previous layer
   */
  construct(n : int, prevLayer : Layer, last : boolean){
    _first = false
    _last = last
    _neurons = new Neuron[n]
    for(i in 0..|n){
      _neurons[i] = new SigmoidNeuron(prevLayer.Neurons) //sends all neurons from the previous layer as input
    }
  }

  /**
   * First layer
   * @param n number of neurons
   */
  construct(n : int){
    _first = true
    _last = false //There cannot be a network with only one layer
    _neurons = new Neuron[n]
    for(i in 0..|n){
      _neurons[i] = new SigmoidNeuron()
    }
  }
}