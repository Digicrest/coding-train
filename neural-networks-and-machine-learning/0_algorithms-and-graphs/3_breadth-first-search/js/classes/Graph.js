class Graph {
    constructor() {
        this.nodes = [ ];
        this.graph = { };
        this.end = null;
        this.start = null;
    }

    addNode(node) {
        let title = node.value;
        this.graph[title] = node;

        this.nodes.push(node);
    }

    getNode(node) {
        return this.graph[node];
    }

    setStart(node) {
        this.start = this.graph[node]
        return this.start;
    }

    setEnd(node) {
        this.end = this.graph[node]
        return this.end;
    }

    reset() {
        this.nodes.forEach(node => {   
            node.visited = false;
            node.parent = null;
        })
    }
}