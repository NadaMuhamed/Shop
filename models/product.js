const products = [];
const path = require('path');
const rootDir = require('../utils/path');
const fs = require('fs');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const p = path.join(rootDir, 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err && fileContent.length > 0) {
                try {
                    products = JSON.parse(fileContent);
                } catch (e) {
                    products = [];
                }
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll() {
        const p = path.join(rootDir, 'data', 'products.json');
        try {
            const fileContent = fs.readFileSync(p);
            return JSON.parse(fileContent);
        } catch (err) {
            return [];
        }
    }
}