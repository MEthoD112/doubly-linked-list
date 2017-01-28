const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }
    append(data) {

        var node = new Node(data);
            
        if (this.length == 0 ) {
            this._head = node;
            this._tail = node;
        } else{
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
       
        this.length++;
    }
    head() {
        return this._head.data;
    }
    tail() {
        return this._tail.data;
    }
    at(index) {
        var currentNode = this._head;
        var length = this.length;
        var count = 0;
        var message = {failure: 'Failure: non-existent node in this list.'};
 
        if (length === 0 || index < 0 || index > length) {
            throw new Error(message.failure);
        }
     
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode.data;
    }
    insertAt(index, data) {
        var node = new Node(data);
        var currentNode = this._head;
        var length = this.length;
        var count = 1;
        var message = {failure: 'Failure: non-existent node in this list.'};
 
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
    }
    isEmpty() {
        if (this.length == 0){
            return true;
        }else{
            return false;
        }
    }
    clear() {
        this.length = 0;
        this._head.data = null;
        this._tail.data = null;
    }
    deleteAt(index) {
        var currentNode = this._head,
        length = this.length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
        if (length === 0 || index < 1 || index > length) {
            throw new Error(message.failure);
        }
         
        if (index === 1) {
            this._head = currentNode.next;
        
        
            if (!this._head) {
                this._head.prev = null;
            
            } else {
                this._tail = null;
                   }
         
        } else if (index === this.length) {
            this._tail = this._tail.prev;
            this._tail.next = null;
       
        } else {
            while (count < index) {
                currentNode = currentNode.next;
                count++;
            }
            beforeNodeToDelete = currentNode.prev;
            nodeToDelete = currentNode;
            var afterNodeToDelete = currentNode.next;
     
            beforeNodeToDelete.next = afterNodeToDelete;
            afterNodeToDelete.prev = beforeNodeToDelete;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
        }
            this.length--;
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

        return this;
    }

    indexOf(data) {
        var currentNode = this._head;
        var length = this.length;
        var count = 0;
        var message = {failure: 'Failure: non-existent node in this list.'};
 
        if (length === 0 || data === null) {
            throw new Error(message.failure);
        }
        while (count < length) {

            if (currentNode.data === data){
                return count;
            }
            currentNode = currentNode.next;
            count++;
        }
        return -1;
    }

}

module.exports = LinkedList;
