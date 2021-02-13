const express = require('express')
const router = express.Router();
let matrizProductos = [{"id":1,"title":"iPhone 11 64 GB (Product)Red","price":159000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega10/main/img/img-001.jpg"},
{"id":3,"title":"iPhone 12 64 GB azul","price":200000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega10/main/img/img-002.jpg"},
{"id":4,"title":"iPhone XR 64 GB negro","price":139000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega10/main/img/img-003.jpg"},
{"id":5,"title":"iPhone XR 64 GB negro","price":139000,"thumbnail":"https://raw.githubusercontent.com/rubeneggel72/Entrega10/main/img/img-004.jpg"},
]

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
    let id = parseInt(req.params.id)
    let idx = getIndice(id)
    let producto = matrizProductos[idx]
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

router.put('/productos/:id', (req, res) => {
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

router.delete('/productos/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let idx = getIndice(id)
    let producto = matrizProductos[idx]
    
    if (producto != undefined) {
        matrizProductos.splice(idx, 1);
        res.send(producto);
        return
    }
    else {
        res.send({ error: 'Producto no encontrado' });
    }
})






function getIndice(id) {
    var indice = -1;
    matrizProductos.filter(function (producto, i) {
        if (producto.id === id) {
            indice = i;
        }
    });
    return indice;
}

module.exports = router