/**
 * Represents a graph.
 * @constructor
 * @param {boolean} directed - Directed graph if true.
 */
function AbstractGraph(directed) {
  if (typeof directed === 'undefined') {
    directed = false;
  }

  this.directed = directed;
  this.nodes = {};
  this.edges = {};
}

/**
 * Add a node to the graph. If node exists, update it.
 * @param {string} key - The name of the node.
 * @param {object} value - Arbitrary value of node.
 */
AbstractGraph.prototype.addNode = function(key, value) {
  this.nodes[key] = value;
  this.edges[key] = {};
};

/**
 * Add an edge to the graph with value.
 * @param {string} key1 - Node name (start node if directed).
 * @param {string} key2 - Node name (end node if directed).
 * @param {object} value - Arbitrary value of edge.
 */
AbstractGraph.prototype.addEdge = function(key1, key2, value) {
  if (!(key1 in this.nodes)) {
    //throw "Error: Node does not exist: " + key1;
    return;
  }
  if (!(key2 in this.nodes)) {
    //throw "Error: Node does not exist: " + key2;
    return;
  }

  this.edges[key1][key2] = value;

  // if undirected, add reversed edge
  if (!this.directed) {
    this.edges[key2][key1] = value;
  }
};

/**
 * Get the value of the given node
 * @param {string} key - The name of the node.
 */
AbstractGraph.prototype.nodeVal = function(key) {
  try {
    return this.nodes[key];
  }
  catch (err) {
    throw "Error: Node does not exist: " + key;
  }
};

/**
 * Get the value of the given edge.
 * @param {string} key1 - Node name (start node if directed).
 * @param {string} key2 - Node name (end node if directed).
 */
AbstractGraph.prototype.edgeVal = function(key1, key2) {
  try {
    return this.edges[key1][key2];
  }
  catch (err) {
    throw "Error: Edge does not exist: " +
      key1 + (this.directed ? ' -> ' : ' <-> ') + key2;
  }
};

/**
 * Determine whether the two nodes are connected.
 * @param {string} key1 - Node name (start node if directed).
 * @param {string} key2 - Node name (end node if directed).
 * @returns {boolean}
 */
AbstractGraph.prototype.nodesConnected = function(key1, key2) {
  return (key1 in this.edges) && (key2 in this.edges[key1]);
};

/**
 * Delete a node
 * @param {string} key - The name of the node.
 */
AbstractGraph.prototype.delNode = function(key) {
  delete this.nodes[key];
  delete this.edges[key];
  for (var x in this.edges) {
    delete this.edges[x][key];
  }
};

/**
 * Delete an edge
 * @param {string} key1 - Node name (start node if directed).
 * @param {string} key2 - Node name (end node if directed).
 */
AbstractGraph.prototype.delEdge = function(key1, key2) {
  try {
    delete this.edges[key1][key2];
  }
  catch (err) {
    throw "Error: Edge does not exist: " +
      key1 + ' -> ' + key2;
  }

  // if undirected, remove reverse edge
  if (!this.directed) {
    try {
      delete this.edges[key2][key1];
    }
    catch (err) {
      throw "Error: Edge does not exist: " +
        key1 + ' <- ' + key2;
    }
  }
};

/**
 * Get neighbours of a node.
 * @param {string} key - The name of the node.
 */
AbstractGraph.prototype.getNeighbors = function(key) {
  try {
    var neighbours = [];
    for (var neighbour in this.edges[key]) {
      neighbours.push(neighbour);
    }
    return neighbours;
  }
  catch (err) {
    throw "Error: Node does not exist: " + key;
  }
};

/**
 * Return true if graph is connected.
 * @returns {boolean}
 */
AbstractGraph.prototype.isConnectedGraph = function() {

  var n = 0;
  var visited = {};
  for (var key in this.nodes) {
    visited[key] = false;
    n++;
  }

  if (!n) {
    return false;
  }

  // traverse the graph depth-first
  var stack = [key];  // arbitrary starting point
  var seen = 0;

  while (stack.length) {
    var curr = stack.pop();
    visited[curr] = true;
    ++seen;
    var neighbours = this.getNeighbors(curr);
    for (var i = 0, L = neighbours.length; i < L; i++) {
      var neighbour = neighbours[i];
      if (!visited[neighbour]) {
        stack.push(neighbour);
      }
    }
  }

  return seen == n;
};
