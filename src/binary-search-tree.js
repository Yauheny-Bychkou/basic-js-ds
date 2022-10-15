const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(data) {
    if (this.node === null) this.node = new Node(data);
    else this.insertNode(this.node, new Node(data));
    return this;
  }

  insertNode(node, newNode) {
    if (newNode.data > node.data) {
      if (node.right !== null) this.insertNode(node.right, newNode);
      else node.right = newNode;
    } else {
      if (node.left !== null) this.insertNode(node.left, newNode);
      else node.left = newNode;
    }
  }

  has(data) {
    if (this.search(this.node, data) !== null) {
      return true;
    } else if (this.search(this.node, data) === null) return false;
  }

  search(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else return node;
  }

  find(data) {
    return this.search(this.node, data);
  }

  remove(data) {
    this.node = this.removeNode(this.node, data);
    return this;
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    } else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      let aux = this.findMinNode(node.right);
      node.data = aux.data;
      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left !== null) {
      return this.findMinNode(node.left);
    } else return node;
  }

  findMaxNode(node) {
    if (node.right !== null) {
      return this.findMaxNode(node.right);
    } else return node;
  }

  min() {
    if (!this.node) return null;
    return this.findMinNode(this.node).data;
  }

  max() {
    if (!this.node) return null;
    return this.findMaxNode(this.node).data;
  }
}

module.exports = {
  BinarySearchTree,
};
