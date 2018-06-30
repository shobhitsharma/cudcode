'use strict';

class List {
  constructor() {
    this.memory = [];
    this.length = 0;
  }

  get(address) {
    return this.memory[address];
  }

  push(value) {
    this.memory[this.length] = value;
    this.length++;
  }

  pop() {
    if (this.length === 0) return;

    let lastAddress = this.length - 1;
    let value = this.memory[lastAddress];
    delete this.memory[lastAddress];
    this.length--;

    return value;
  }

  unshift(value) {
    let previous = value;

    for (let address = 0; address < this.length; address++) {
      let current = this.memory[address];
      this.memory[address] = previous;
      previous = current;
    }

    this.memory[this.length] = previous;
    this.length++;
  }

  shift() {
    if (this.length === 0) return;

    let value = this.memory[0];

    for (let address = 0; address < this.length - 1; address++) {
      this.memory[address] = this.memory[address + 1];
    }

    delete this.memory[this.length - 1];
    this.length--;

    return value;
  }
}

class HashTable {
  constructor() {
    this.memory = [];
  }

  hashKey(key) {
    let hash = 0;
    for (let index = 0; index < key.length; index++) {
      let code = key.charCodeAt(index);
      hash = ((hash << 5) - hash + code) | 0;
    }
    return hash;
  }

  get(key) {
    let address = this.hashKey(key);
    return this.memory[address];
  }

  set(key, value) {
    let address = this.hashKey(key);
    this.memory[address] = value;
  }

  remove(key) {
    let address = this.hashKey(key);
    if (this.memory[address]) {
      delete this.memory[address];
    }
  }
}

class Stack {
  constructor() {
    this.list = [];
    this.length = 0;
  }

  push(value) {
    this.length++;
    this.list.push(value);
  }

  pop() {
    if (this.length === 0) return;

    this.length--;
    return this.list.pop();
  }

  peek() {
    return this.list[this.length - 1];
  }
}

class Queue {
  constructor() {
    this.list = [];
    this.length = 0;
  }

  enqueue(value) {
    this.length++;
    this.list.push(value);
  }

  dequeue() {
    if (this.length === 0) return;

    this.length--;
    return this.list.shift();
  }

  peek() {
    return this.list[0];
  }
}

class Graph {
  constructor() {
    this.nodes = [];
  }

  addNode(value) {
    return this.nodes.push({
      value,
      lines: []
    });
  }

  find(value) {
    return this.nodes.find(node => {
      return node.value === value;
    });
  }

  addLine(startValue, endValue) {
    let startNode = this.find(startValue);
    let endNode = this.find(endValue);

    if (!startNode || !endNode) {
      throw new Error('Both nodes need to exist');
    }

    startNode.lines.push(endNode);
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  get(position) {
    if (position >= this.length) {
      throw new Error('Position outside of list range');
    }

    let current = this.head;

    for (let index = 0; index < position; index++) {
      current = current.next;
    }

    return current;
  }

  add(value, position) {
    let node = {
      value,
      next: null
    };

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let prev = this.get(position - 1);
      let current = prev.next;
      node.next = current;
      prev.next = node;
    }

    this.length++;
  }

  remove(position) {
    if (!this.head) {
      throw new Error('Removing from empty list');
    }
    if (position === 0) {
      this.head = this.head.next;
    } else {
      let prev = this.get(position - 1);
      prev.next = prev.next.next;
    }

    this.length--;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  traverse(callback) {
    function walk(node) {
      callback(node);
      node.children.forEach(walk);
    }

    walk(this.root);
  }

  add(value, parentValue) {
    let newNode = {
      value,
      children: []
    };

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.traverse(node => {
      if (node.value === parentValue) {
        node.children.push(newNode);
      }
    });
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  contains(value) {
    let current = this.root;

    while (current) {
      if (value > current.value) {
        current = current.right;
      } else if (value < current.value) {
        current = current.left;
      } else {
        return true;
      }
    }

    return false;
  }

  add(value) {
    let node = {
      value: value,
      left: null,
      right: null
    };

    if (this.root === null) {
      this.root = node;
      return;
    }

    let current = this.root;

    while (true) {
      if (value > current.value) {
        if (!current.right) {
          current.right = node;
          break;
        }

        current = current.right;
      } else if (value < current.value) {
        if (!current.left) {
          current.left = node;
          break;
        }

        current = current.left;
      } else {
        break;
      }
    }
  }
}

module.exports = {
  List,
  HashTable,
  Stack,
  Queue,
  Graph,
  LinkedList,
  Tree,
  BinarySearchTree
};
