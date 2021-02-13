const express = require('express')
const router = express.Router();
let matrizProductos = [{"id":1,"title":"iPhone 11 64 GB (Product)Red","price":159000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega09/main/img/img-001.jpg"},
{"id":3,"title":"iPhone 12 64 GB azul","price":200000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega09/main/img/img-002.jpg"},
{"id":4,"title":"iPhone XR 64 GB negro","price":139000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega09/main/img/img-003.jpg"},
{"id":5,"title":"iPhone XR 64 GB negro","price":139000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega09/main/img/img-004.jpg"},
{"title":"LG K50S 32 GB aurora black 3 GB RAM","price":22900,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega09/main/img/img-005.jpg"},
{"title":"Moto E6s (2020) Special Edition 64 GB gravity gradient 4 GB RAM","price":21000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega09/main/img/img-006.jpg"}]

router.get('/productos/vista', (req, res) => {
    console.log(matrizProductos)
    res.render('main', { layout: 'index', productos: matrizProductos, listExists: true });
});

router.get('/productos', (req, res) => {
    if (matrizProductos.length > 0) {
        res.send(matrizProductos);
    }
    else {
        res.send({ error: 'No hay productos cargados' });
    }
})

router.get('/productos/:id', (req, res) => {
    let producto = matrizProductos[parseInt(req.params.id) - 1]
    if (producto != undefined) {
        res.send(producto);
        return
    }
    else {
        res.send({ error: 'Producto no encontrado' });
    }
    res.send(JSON.stringify(producto));
})

router.post('/productos', (req, res) => {
    var id = 1
    if (matrizProductos.length > 0) {
        id = matrizProductos[matrizProductos.length - 1].id + 1
    }
    req.body.id = id
    matrizProductos.push(req.body)
    res.send(req.body);
})

router.put('/productos/actualizar/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let idx = getIndice(id)
    let producto = matrizProductos[idx]
    if (producto != undefined) {
        req.body.id = id
        matrizProductos[idx] = req.body
        res.send(req.body);
    }
    else {
        res.send({ error: 'Producto no encontrado' });
    }
})

router.delete('/productos/delete/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let idx = getIndice(id)
    let producto = matrizProductos[idx]
    matrizProductos.splice(getIndice(idx + 1), 1);
    if (producto != undefined) {
        res.send(producto);
        return
    }
    else {
        res.send({ error: 'Producto no encontrado' });
    }
})






function getIndice(id) {
    var Indice = -1;
    matrizProductos.filter(function (producto, i) {
        if (producto.id === id) {
            Indice = i;
        }
    });
    return Indice;
}

module.exports = router