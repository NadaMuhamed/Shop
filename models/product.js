const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Product {
  constructor(title, imageUrl, description, price, id = null) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id || Math.random().toString();
  }

  save() {
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
