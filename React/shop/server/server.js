const express = require('express');
const path = require('path');
const fs = require('fs');
const lodash = require('lodash');
const app = express();
const port = 10800;
const apiBaseUrl = '/api';
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


const sendMessage = (res, code, message) => {
    return res.status(code).send({ error: message });
}

const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json')));

app.get(`${apiBaseUrl}/products/category`, (req, res, next) => {
    try {
        const categories = (products ?? []).map(product => {
            return product.category;
        });
        const groupedCategories = lodash.groupBy(categories, 'id');
        let result = [];
        for (const key in groupedCategories) {
            if (Object.prototype.hasOwnProperty.call(groupedCategories, key)) {
                const element = groupedCategories[key];
                result.push(element[0]);
            }
        }
        return res.json(result ?? []);
    } catch (err) {
        return sendMessage(res, 500, 'Something went wrong');
    }
});

app.get(`${apiBaseUrl}/products/search`, (req, res, next) => {
    try {
        let foundProducts = products.filter(product => {
            return product.name.toLowerCase().indexOf((req.query?.query ?? '').toLowerCase()) >= 0
        });
        return res.json(foundProducts ?? []);
    } catch (err) {
        return sendMessage(res, 500, 'Something went wrong');
    }
});

app.get(`${apiBaseUrl}/products/category/:id`, (req, res, next) => {
    try {
        let foundProducts = products.filter(product => product.category.id === Number(req.params.id ?? '-1'));
        if (req.query?.query) {
            foundProducts = products.filter(product => {
                return product.name.toLowerCase().indexOf((req.query?.query ?? '').toLowerCase()) >= 0
            });
        }
        return res.json(foundProducts ?? []);
    } catch (err) {
        return sendMessage(res, 500, 'Something went wrong');
    }
});
app.get(`${apiBaseUrl}/products/:id`, (req, res, next) => {
    try {
        let foundProduct = products.find(product => product.id === Number(req.params.id ?? '-1'));
        return res.json(foundProduct ?? null);
    } catch (err) {
        return sendMessage(res, 500, 'Something went wrong');
    }
});

app.get(`${apiBaseUrl}/products`, (req, res, next) => {
    return res.json(products);
});

app.use((req, res, next) => {
    return sendMessage(res, 404, 'Not found');
});

// app.post('/products', (req, res) => {
//     try {
//         const newTodo = { id: products.length + 1, task: req.body.task, completed: false };
//         todos.push(newTodo);
//         res.status(201).json(newTodo);
//     } catch (error) {
//         res.status(500).send();
//     }
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));