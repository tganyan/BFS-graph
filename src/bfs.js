'use strict';

const Queue = require('queue-fifo');

const bfs = module.exports = {};

bfs.traverse = (startVertex, goalVertex, graph) => {
  const queue = new Queue();
  const parentPath = new Map();
  const visitedVertices = new Set();

  queue.enqueue(startVertex);
  visitedVertices.add(startVertex);

  while (queue.size() > 0) {
    const currentVertex = queue.dequeue();

    if (currentVertex === goalVertex) {
      return parentPath;
    }

    const neighbors = graph.getNeighbors(currentVertex);

    for (const neighbor of neighbors) { // eslint-disable-line
      const neighborVertex = neighbor.vertex;
      if (visitedVertices.has(neighborVertex)) {
        continue; //eslint-disable-line
      } else {
        visitedVertices.add(neighborVertex);
      }
      parentPath.set(neighborVertex, currentVertex);
      queue.enqueue(neighborVertex);
    }
  }

  return null;
};
