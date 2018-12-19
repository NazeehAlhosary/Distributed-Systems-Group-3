const deleteKey = require("object-delete-key")

var sample1 = {
    "name": "analytics",
      "children": [
       {
        "name": "cluster",
        "children": [
         {"name": "AgglomerativeCluster", "size": 3938},
         {"name": "CommunityStructure", "size": 3812},
         {"name": "HierarchicalCluster", "size": 6714},
         {"name": "MergeEdge", "size": 743}
        ]
}
      ]};
       //var res = JSON.parse(JSON.stringify(sample1));

       for (var key in sample1) {
        if (sample1.hasOwnProperty(key)) {
            console.log(key + " -> " + sample1[key]);
        }
    }


      //console.log(res);
      