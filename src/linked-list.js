const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }
    append(data) {

        var node = new Node(data);

        if (this.length === 0) {
            this._head = node;
            this._tail = node;
        } else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }

        this.length++;
        return this;
    }
    head() {
        return this._head.data;
    }
    tail() {
        return this._tail.data;
    }
    at(index) {
        return this.nodeAt(index).data;
    }

    nodeAt(index) {
        var currentNode = this._head;
        var length = this.length;
        var count = 0;
        var message = { failure: 'Failure: non-existent node in this list.' };

        if (length === 0 || index < 0 || index > length) {
            throw new Error(message.failure);
        }

        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode;
    }


    insertAt(index, data) {
        var node = new Node(data);
        var currentNode = this._head;
        var length = this.length;
        var count = 1;
        var message = { failure: 'Failure: non-existent node in this list.' };

        if (length === 0 || index < 0 || index > length) {
            throw new Error(message.failure);
        }
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }
        currentNode.next = node;
        node.prev = currentNode;
        node.next = this._tail;
        this._tail.prev = node;
        this.length++;
        return this;
    }
    isEmpty() {
        if (this.length == 0) {
            return true;
        } else {
            return false;
        }
    }
    clear() {
        this.length = 0;
        this._head.data = null;
        this._tail.data = null;
        return this;
    }
    deleteAt(index) {
        if (this.length === 0) {
            return;
        }
        if (index < 0 || index >= this.length) {
            var message = { failure: 'Failure: non-existent node in this list.' };
            throw new Error(message.failure);
        }
        if (this.length === 1) {
            this._head = null;
            this._tail = null;
        } else if (index === 0) {
            this.nodeAt(1).prev = null;
            this._head = this.nodeAt(1);
        } else if (index === this.length - 1) {
            this.nodeAt(index - 1).next = null;
            this._tail = this.nodeAt(index - 1);
        } else {
            this.nodeAt(index - 1).next = this.nodeAt(index + 1);
            this.nodeAt(index + 1).prev = this.nodeAt(index - 1);
            
        }
        this.length--;
        return this;
    }

    reverse() {
        var node_buf = {
            data: null,
            next: null,
            prev: null,
        }

        var node_head = this._head;
        var node_tail = this._tail;

        var i = 0;

        while (i < Math.floor(this.length / 2)) {
            node_buf.data = node_tail.data;
            node_tail.data = node_head.data;
            node_head.data = node_buf.data;
            node_head = node_head.next;
            node_tail = node_tail.prev;
            i++;
        }
        this.writeList();
        return this;
    }
    writeList(){
        var s = '';
        for(var j=0; j<this.length; j++){
            s = s + this.at(j) + ' ';
        }
        console.log(s + ' length = ' + this.length);
    }
    indexOf(data) {
        var currentNode = this._head;
        var length = this.length;
        var count = 0;
        var message = { failure: 'Failure: non-existent node in this list.' };

        if (length === 0 || data === null) {
            throw new Error(message.failure);
        }
        while (count < length) {

            if (currentNode.data === data) {
                return count;
            }
            currentNode = currentNode.next;
            count++;
        }
        return -1;
    }

}

module.exports = LinkedList;
