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



// testing
var g = new AbstractGraph(false);
var key1 = "aaa";
var key2 = "bbb";
var key3 = "ccc";
var key4 = "ddd";
var key5 = "eee";
var key6 = "fff";

var value1 = {"something" : "arbitrary"};
var value2 = ["Value", "Really", "Doesn't", "Matter"];
var value3 = "Another Value";




g.addNode(key1, value1);
g.addNode(key2, value2);
g.addNode(key3, null);
g.addNode(key4, 4);
g.addNode(key6);

g.addEdge(key1, key2, value3);
g.addEdge(key1, key4, 242);
g.addEdge(key6, key2);
g.addEdge(key5, key1);

console.log('Should print true ', g.nodesConnected(key1, key2));
console.log('Should print true ', g.nodesConnected(key2, key6));
console.log('Should print false ', g.nodesConnected(key1, key3));
console.log('Should print false ', g.nodesConnected(key3, key4));
console.log('Should print false ', g.nodesConnected(key3, key2));
console.log('Should print false ', g.nodesConnected(key1, key5));

console.log('Should print true ', g.nodesConnected(key1, key4));

console.log('Should print {"something" : "arbitrary"} ', g.nodeVal(key1));

console.log('Should print 4 ', g.nodeVal(key4));

console.log('Should print "Another Value" ', g.edgeVal(key1, key2));
console.log('Should print true ', !g.edgeVal(key2, key6));

console.log('Should print 242 ', g.edgeVal(key1, key4));

g.delNode(key2);
console.log('Should print false ', g.nodesConnected(key1, key2));
console.log('Should print false ', g.nodesConnected(key3, key2));
console.log('Should print false ', g.nodesConnected(key6, key2));


console.log('Should print ["ddd"]', g.getNeighbors(key1));
console.log('Should print []', g.getNeighbors(key3));

console.log('Should print false ', g.isConnectedGraph());

g.addNode(key2, value2);
g.addEdge(key1, key2);
g.addEdge(key6, key2);
g.addEdge(key3, key2);

console.log('Should print true ', g.isConnectedGraph());

g.delEdge(key1, key2);
console.log('Should now print false ', g.isConnectedGraph());