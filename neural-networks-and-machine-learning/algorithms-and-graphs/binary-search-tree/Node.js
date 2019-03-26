class Node {
    constructor(n) {
        this.value = n;
        this.left = null;
        this.right = null;
        this.visited = false;
    }

    add(n) {
        if (n.value < this.value) {
            if (!this.left)
                this.left = n;
            else
                this.left.add(n)
        } else if (n.value > this.value) {
            if (!this.right)
                this.right = n;
            else
                this.right.add(n)
        }
    }

    search(val) {
        if (this.value == val) {
            return this;
        } else if (val < this.value && this.left != null) {
            return this.left.search(val)
        } else if (val > this.value && this.right != null) {
            return this.right.search(val)
        }
    }
    visit() {
        if (this.left != null) {
            this.left.visit();
        }

        console.log(this.value);
        this.visited = true;

        if (this.right != null) {
            this.right.visit();
        }
    }
}