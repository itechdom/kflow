export function convertToNested(node) {
    const result = {};
    function traverse(currentNode, output) {
        if (currentNode.name) {
            output[currentNode.name] = {};
            if (currentNode.children && currentNode.children.length > 0) {
                currentNode.children.forEach(child => {
                    traverse(child, output[currentNode.name]);
                });
            }
        }
    }
    traverse(node, result);
    return result;
}

export function convertFromNested(nested) {
    function traverse(currentKey, currentObj) {
        const node = {
            name: currentKey,
            children: []
        };

        const keys = Object.keys(currentObj);
        if (keys.length > 0) {
            keys.forEach(key => {
                node.children.push(traverse(key, currentObj[key]));
            });
        }

        return node;
    }

    const rootKey = Object.keys(nested)[0]; // Assuming there's a single root in the nested object
    return traverse(rootKey, nested[rootKey]);
}