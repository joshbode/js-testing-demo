describe("AbstractGraph", function() {

  var key1 = 'aaa';
  var key2 = 'bbb';
  var key3 = 'ccc';
  var key4 = 'ddd';
  var key5 = 'eee';
  var key6 = 'fff';

  var value1 = {'something': 'arbitrary'};
  var value2 = ['Value', 'Really', 'Doesn\'t', 'Matter'];
  var value3 = 'Another Value';

  beforeEach(function() {
    // basic graph setup
    g = new AbstractGraph(false);
    g.addNode(key1, value1);
    g.addNode(key2, value2);
    g.addNode(key3, null);
    g.addNode(key4, 4);
    g.addNode(key6);

    g.addEdge(key1, key2, value3);
    g.addEdge(key1, key4, 242);
    g.addEdge(key6, key2);
    g.addEdge(key5, key1);
  });

  it("checks connectivity of nodes", function() {
    expect(g.nodesConnected(key1, key2)).toBe(true);
    expect(g.nodesConnected(key2, key6)).toBe(true);
    expect(g.nodesConnected(key1, key3)).toBe(false);
    expect(g.nodesConnected(key3, key4)).toBe(false);
    expect(g.nodesConnected(key3, key2)).toBe(false);
    expect(g.nodesConnected(key1, key5)).toBe(false);
    expect(g.nodesConnected(key1, key4)).toBe(true);
  });

  it("checks node values", function() {
    expect(g.nodeVal(key1)).toEqual({something: 'arbitrary'});
    expect(g.nodeVal(key4)).toBe(4);
  });

  it("checks edge values", function() {
    expect(g.edgeVal(key1, key2)).toBe('Another Value');
    expect(!g.edgeVal(key2, key6)).toBe(true);
    expect(g.edgeVal(key1, key4)).toBe(242);
  });

  it("checks deletion of nodes", function() {
    g.delNode(key2);
    expect(g.nodesConnected(key1, key2)).toBe(false);
    expect(g.nodesConnected(key3, key2)).toBe(false);
    expect(g.nodesConnected(key6, key2)).toBe(false);
  });

  it("checks neighbours", function() {
    g.delNode(key2);
    expect(g.getNeighbors(key1)).toEqual(['ddd']);
    expect(g.getNeighbors(key3)).toEqual([]);
  });

  it("checks connectivity of graph", function() {
    g.delNode(key2);
    expect(g.isConnectedGraph()).toBe(false);
  });

  it("checks connectivity of graph after manipulation", function() {
    g.delNode(key2);
    g.addNode(key2, value2);
    g.addEdge(key1, key2);
    g.addEdge(key6, key2);
    g.addEdge(key3, key2);

    expect(g.isConnectedGraph()).toBe(true);
  });

  it("checks connectivity of graph after further manipulation", function() {
    g.delNode(key2);
    g.addNode(key2, value2);
    g.addEdge(key1, key2);
    g.addEdge(key6, key2);
    g.addEdge(key3, key2);
    g.delEdge(key1, key2);

    expect(g.isConnectedGraph()).toBe(false);
  });

});


