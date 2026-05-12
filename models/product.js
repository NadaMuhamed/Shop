const fs = require('fs');
const path = require('path');
const { error } = require('console');
const cart = require('./cart');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.isNewProduct = !id;
    this.id = id ? id : Math.random().toString();
  }

  save(callback) {
    if (this.isNewProduct) {
      fs.readFile(p, 'utf8', (err, fileContent) => {
        let products = [];
        if (!err && fileContent.length > 0) {
          products = JSON.parse(fileContent);
        }
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          if (err) {
            console.log(err);
          }
          callback();
        });
      });
    } else {
      fs.readFile(p, 'utf8', (err, fileContent) => {
        let products = [];
        if (!err && fileContent.length > 0) {
          products = JSON.parse(fileContent);
        }
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        if (existingProductIndex >= 0) {
          products[existingProductIndex] = this;
          fs.writeFile(p, JSON.stringify(products), err => {
            if (err) {
              console.log(err);
            }
            callback();
          });
        } else {
          callback();
        }
      });
    }
  }

  static deleteById(id) {
    fs.readFile(p, 'utf8', (err, fileContent) => {
      if (err) {
        console.log(err);
        return;
      }
      let products = [];
      if (fileContent.length > 0) {
        products = JSON.parse(fileContent);
      }
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (err) {
          console.log(err);
        }
        cart.deleteProduct(id);
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(p, 'utf8', (err, fileContent) => {
      if (err || fileContent.length === 0) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }

  static findById(id, cb) {
    fs.readFile(p, 'utf8', (err, fileContent) => {
      if (err || fileContent.length === 0) {
        cb(null);
      } else {
        const products = JSON.parse(fileContent); 
        const product = products.find(prod => prod.id === id);
        cb(product);
      }
    });
  }
};
