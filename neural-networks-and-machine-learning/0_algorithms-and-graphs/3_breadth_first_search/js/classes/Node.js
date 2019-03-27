class Node {
    constructor(value) {
        this.value = value;
        this.edges = [];
        this.visited = false;
        this.parent = null;        
    }

    addEdge(neighbor) {
        this.edges.push(neighbor);

        // both directions!
        neighbor.edges.push(this);
    }
}