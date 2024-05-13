// const originalFormat = {
//     title: "Use of attention",
//     id: "853241d1-aae5-11ee-a6e5-15a006ddba47",
//     _id: "853241d1-aae5-11ee-a6e5-15a006ddba47",
//     size: 5,
//     group: 1810,
//     level: "0.1.8.10.0",
//     children: [],
//     parent: "853241d0-aae5-11ee-a6e5-15a006ddba47",
//     links: {
//         title: "Transformers",
//         target: "853241d1-aae5-11ee-a6e5-15a006ddba47",
//         source: "853241d0-aae5-11ee-a6e5-15a006ddba47",
//         group: 1810
//     },
//     name: "Use of attention",
//     collapsed: true,
//     __rd3t: {
//         id: "49d275c6-011a-4973-b695-d5503171d560",
//         depth: 4,
//         collapsed: false
//     },
//     label: "Use of attention"
// };

//converted to
//{"Use of attention":{}}

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