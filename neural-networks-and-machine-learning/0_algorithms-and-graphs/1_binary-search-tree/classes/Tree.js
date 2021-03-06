class Tree {
    constructor() {
        this.root = null;
    }
    
    traverse() {
        this.root.visit();
    }

    search(val) {
    	let found = this.root.search(val);
        return found ? true : false;
    }
    
    add(val) {
        let n = new Node(val)

        if (this.root == null)
            this.root = n;
        else
            this.root.add(n);
    }
}