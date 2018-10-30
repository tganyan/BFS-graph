'use strict';

const bfs = require('../bfs');

class Vertex {
  constructor(value) {
    this.value = value;
  }
}

class Edge {
  constructor(vertex, weight) {
    this.vertex = vertex;
    this.weight = weight;
  }
}

class Graph {
  constructor() {
    this._adjacencyList = new Map();
  }

  addVertex(vertex) {
    this._adjacencyList.set(vertex, []);
  }

  addDirectedEdge(startVertex, endVertex, weight = 0) {
    if (!this._adjacencyList.has(startVertex) || !this._adjacencyList.has(endVertex)) {
      throw new Error('__ERROR__ Invalid vertices');
    }

    const adjacencies = this._adjacencyList.get(startVertex);
    adjacencies.push(new Edge(endVertex, weight));
  }

  getNeighbors(vertex) {
    if (!this._adjacencyList.has(vertex)) {
      throw new Error('__ERROR__ Invalid vertex');
    }

    return [...this._adjacencyList.get(vertex)];
  }
}

const graph = new Graph();

const one = new Vertex(1);
const two = new Vertex(2);
const three = new Vertex(3);
const four = new Vertex(4);
const five = new Vertex(5);
const six = new Vertex(6);

graph.addVertex(one);
graph.addVertex(two);
graph.addVertex(three);
graph.addVertex(four);
graph.addVertex(five);
graph.addVertex(six);

graph.addDirectedEdge(one, two);
graph.addDirectedEdge(one, three);
graph.addDirectedEdge(three, six);
graph.addDirectedEdge(two, four);
graph.addDirectedEdge(four, five);
graph.addDirectedEdge(four, three);
graph.addDirectedEdge(five, six);
graph.addDirectedEdge(five, two);

describe('#letter-count.js', () => {
  test('does it return the correct count for each letter', () => {
    const path = bfs.traverse(one, six, graph);
    expect(path.get(two)).toEqual({ 'value': 1 });
  });
});
