const MongoDb = require("@markab.io/orbital-api/MongoDb");
const config = require("config");
const fs = require("fs").promises;
const uuidv1 = require("uuid/v1");
const path = require("path");

module.exports.readFiles = async function readFiles(dirname, onFileContent, onError) {
  try {
    const filenames = await fs.readdir(path.join(__dirname, dirname));
    for (const filename of filenames) {
      try {
        const content = await fs.readFile(path.join(__dirname, dirname, filename), "utf-8");
        onFileContent(filename, content);
      } catch (err) {
        onError(err);
      }
    }
  } catch (err) {
    onError(err);
  }
};

module.exports.formatMindmap = function formatMindmap(node, path) {
  if (node) {
    Object.keys(node).forEach((key, index) => {
      let currentPath = path ? path + "." + `${index}` : "0";
      node[key].level = currentPath;
      node[key]._id = uuidv1();
      formatMindmap(node[key].ideas, currentPath);
    });
  }
};

module.exports.flattenMindmap = function flattenMindmap(node, parent, mindmapByKeys) {
  if (node) {
    let group = parent && parseInt(parent.level.split(".").join(""));
    let size = 20 / (parent && parent.level.split(".").length);
    Object.keys(node).forEach((key) => {
      let currentNode = node[key];
      const { title } = currentNode;
      mindmapByKeys[currentNode._id] = {
        title,
        id: currentNode._id,
        _id: currentNode._id,
        size,
        group: group,
        level: currentNode.level,
        attr: currentNode.attr && currentNode.attr.note && currentNode.attr.note.text,
        children: currentNode.ideas ? Object.keys(currentNode.ideas).map((k) => currentNode.ideas[k]._id) : [],
        parent: parent && parent._id,
        links: {
          title: parent && parent.title,
          target: currentNode._id,
          source: (parent && parent._id) || currentNode._id,
          group: group,
        },
      };
      flattenMindmap(currentNode.ideas, currentNode, mindmapByKeys);
    });
  }
};
