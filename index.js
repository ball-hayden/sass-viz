var sassGraph = require('sass-graph');
var graphviz = require('graphviz');

var sassDir = process.argv[2];

var graph = graphviz.digraph("G");
var tree = sassGraph.parseDir(sassDir);
var index = tree['index'];

function cleanupFilename(filename) {
  return filename.replace(sassDir, '');
}

for (var file in index) {
  if (index.hasOwnProperty(file)) {
    graph.addNode(cleanupFilename(file));

    let imports = index[file]["imports"];

    imports.forEach(function(importItem) {
      graph.addEdge(cleanupFilename(file), cleanupFilename(importItem));
    });
  }
}

var fs = require('fs');
fs.writeFile('graph.dot', graph.to_dot(), function() {});

graph.output('png','graph.png');
