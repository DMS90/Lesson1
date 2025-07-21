const express = require('express');
const path = require('path');
const fs = require('fs');

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

app.get(`${apiBaseUrl}/products`, (req, res, next) => {
    return res.json(products);
});

app.get(`${apiBaseUrl}/products/search`, (req, res, next) => {
    try {
        foundProducts = products.filter(product => product.name.indexOf(req.query.query) >= 0);
        return res.json(foundProducts ?? []);
    } catch (err) {
        return sendMessage(res, 500, 'Something went wrong');
    }
});

app.get(`${apiBaseUrl}/products/:id`, (req, res, next) => {
    try {
        foundProduct = products.find(product => product.id === Number(req.params.id ?? '-1'));
        return res.json(foundProduct ?? null);
    } catch (err) {
        return sendMessage(res, 500, 'Something went wrong');
    }
});

app.get(`${apiBaseUrl}/products/category/:id`, (req, res, next) => {
    try {
        foundProducts = products.filter(product => product.category.id === Number(req.params.id ?? '-1'));
        return res.json(foundProducts ?? []);
    } catch (err) {
        return sendMessage(res, 500, 'Something went wrong');
    }
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