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
  construct(n : int, prevLayer : Layer, first : boolean, last : boolean){
    _first = first
    _last = last
    _neurons = new Neuron[n]
    for(i in 0..|n){
      _neurons[i] = new SigmoidNeuron(prevLayer.Neurons) //should be generic
    }
  }

  /**
   * First layer
   * @param n number of neurons
   */
  construct(n : int, first : boolean, last : boolean){
    _first = first
    _last = last
    _neurons = new Neuron[n]
    for(i in 0..|n){
      _neurons[i] = new SigmoidNeuron() //should be generic
    }
  }
}